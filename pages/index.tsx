import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import CountdownTimer from "../components/CountdownTimer";
import Image from "next/image";
import Rocket from "../components/Rocket";
import logo from "../assets/spacex-logo.svg";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({ uri: "https://api.spacexdata.com/v4/" });

export default function Home({ data: { launch } }) {
  return (
    <div className={styles.container}>
      <Image src={logo} alt="SpaceX Logo" height={20} />
      {launch?.date_utc ? (
        <>
          {launch.date_utc ? (
            <CountdownTimer date={launch.date_utc} />
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
              Flight Number {launch.flight_number}
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
    link: restLink,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query GetLaunchDetails {
        launch @rest(type: "Launches", path: "launches/next") {
          rocket
          date_utc
          name
          flight_number
        }
      }
    `,
  });

  return {
    props: {
      data,
    },
  };
}
