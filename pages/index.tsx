import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import CountdownTimer from "../components/CountdownTimer";
import Image from "next/image";
import Rocket from "../components/Rocket";
import logo from "../assets/spacex-logo.svg";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function Home({ loading, data: { launch } }) {
  return (
    <div className={styles.container}>
      <Image src={logo} alt="SpaceX Logo" height={20} />
      {!loading ? (
        <>
          {launch.upcoming ? (
            <CountdownTimer date={launch.date} />
          ) : (
            "No upcoming launches"
          )}
          <Rocket id={launch.rocket} />
          <div className={styles.view}>
            <div className={styles.rocket} id={launch.rocket} />
          </div>
          <div className={styles.missionInfo}>
            <p className={styles.missionName}>{launch.name}</p>
            <p className={styles.missionFlight}>
              Flight Number {launch.flightNumber}
            </p>
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });

  const { data, loading, error } = await client.query({
    query: gql`
      query Query {
        launch {
          upcoming
          rocket
          date
          name
          flightNumber
        }
      }
    `,
  });

  return {
    props: {
      loading,
      data,
    },
  };
}
