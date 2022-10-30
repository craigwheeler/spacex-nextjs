import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import CountdownTimer from "../components/CountdownTimer";
import Image from "next/image";
import Rocket from "../components/Rocket";
import logo from "../assets/spacex-logo.svg";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function Home({ launch }) {
  return (
    <div className={styles.container}>
      <Image src={logo} alt="SpaceX Logo" height={20} />
      {launch?.launch_date_utc ? (
        <>
          {launch.rocket !== "" ? (
            <CountdownTimer date={launch.launch_date_utc} />
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
    uri: "https://api.spacex.land/graphql/",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query getNextLaunch {
        launchNext {
          launch_date_utc
          mission_name
          rocket {
            rocket_name
          }
        }
      }
    `,
  });

  return {
    props: {
      launch: data.launchNext,
    },
  };
}
