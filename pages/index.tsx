import styles from "../styles/Home.module.css";
import LoadingSpinner from "../components/LoadingSpinner";
import CountdownTimer from "../components/CountdownTimer";
import Image from "next/image";
import Link from "next/link";
import Rocket from "../components/Rocket";
import logo from "../assets/logo.png";
import { useQuery } from "react-query";
import axios from "axios";

interface UpcomingLaunchType {
  launch_service_provider: { id: number };
  window_start: string;
  rocket: { id: number; configuration: { family: string } };
  name: string;
  pad: { location: { name: string } };
  status: { abbrev: string };
  vidURLs: {
    title: string;
    type: string;
    description: string;
    priority: { url: string };
  };
}

interface LaunchType {
  data: { launch: { results: UpcomingLaunchType[] } };
}

const MissionDetails = ({ launch }: any) => {
  const { mission, launch_service_provider } = launch;

  return (
    <div className={styles.webcast}>
      <div className={styles.missionName}>{mission?.name}</div>
      <div className={styles.missionDescription}>{mission?.description}</div>
      <div className={styles.missionDetails}>
        <div>{launch_service_provider?.name}</div>
        <div>{mission?.type}</div>
        <div>{mission?.orbit?.name}</div>
      </div>

      <div className={styles.missionInfo}>
        <p className={styles.missionNameFooter}>{launch.name}</p>
        <p className={styles.missionFlight}>{launch.pad.location.name}</p>
      </div>
    </div>
  );
};

const Webcast = ({ launch }: any) => {
  const { vidURLs } = launch;

  return (
    <div className={styles.webcast}>
      <h4 className={styles.missionName}>{vidURLs?.title}</h4>
      <h5>{vidURLs?.type}</h5>
      <p className={styles.missionDescription}>{vidURLs?.description}</p>
      <p>
        Watch the launch live on <a href={vidURLs?.priority?.url}>YouTube</a>
      </p>
    </div>
  );
};

async function fetchLaunchData() {
  const { data } = await axios.get(
    `${process.env.BASE_URL}/2.2.0/launch/upcoming/`
  );

  return data;
}

export default function Home(): JSX.Element {
  const {
    data: launch,
    error,
    isError,
    isLoading,
  } = useQuery("launch", fetchLaunchData);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // filter launches by upcoming launch windows
  const upcomingLaunches = launch.results.filter(
    ({ status, window_start }: any) =>
      status.abbrev === "Go" && new Date() < new Date(window_start)
  );

  // get the next launch
  const [nextLaunch] = upcomingLaunches;

  // get all launch results filtered by spacex
  const spacexLaunches = launch.results.filter(
    ({ launch_service_provider }: any) => launch_service_provider.id === 121
  );

  return (
    <div className={styles.container}>
      {/* <Image src={logo} alt="logo" height={50} /> */}
      {nextLaunch ? (
        <>
          <CountdownTimer date={nextLaunch.window_start} />
          <div className={styles.rocketContainer}>
            <Rocket id={nextLaunch.rocket.configuration.family} />
            {nextLaunch?.vidURLs ? (
              <Webcast launch={nextLaunch} />
            ) : (
              <MissionDetails launch={nextLaunch} />
            )}
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}
