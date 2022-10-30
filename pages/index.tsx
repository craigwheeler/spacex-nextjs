import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import CountdownTimer from "../components/CountdownTimer";
import Image from "next/image";
import Rocket from "../components/Rocket";
import logo from "../assets/spacex-logo.svg";

export default function Home() {
  const [launch, setLaunch] = useState({
    rocket: "5e9d0d96eda699382d09d1ee",
    date_utc: "2022-11-01T16:00:00.000Z",
    name: "Crew-5",
    flight_number: "187",
  });

  return (
    <div className={styles.container}>
      <Image src={logo} alt="SpaceX Logo" height={20} />
      {launch.flight_number ? (
        <>
          {launch.rocket !== "" ? (
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
