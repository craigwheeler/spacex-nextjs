import styles from "../styles/Home.module.css";
import LoadingSpinner from "../components/LoadingSpinner";
import CountdownTimer from "../components/CountdownTimer";
import Image from "next/image";
import Link from "next/link";
import Rocket from "../components/Rocket";
import logo from "../assets/logo.png";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({ uri: process.env.BASE_URL });

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

export default function Home({ data: { launch } }: LaunchType): JSX.Element {
  // filter launches by upcoming launch windows
  const upcomingLaunches = launch.results.filter(
    ({ status, window_start }) =>
      status.abbrev === "Go" && new Date() < new Date(window_start)
  );

  // get the next launch
  const [nextLaunch] = upcomingLaunches;

  // get all launch results filtered by spacex
  const spacexLaunches = launch.results.filter(
    ({ launch_service_provider }) => launch_service_provider.id === 121
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
          <div className={styles.missionInfo}>
            <p className={styles.missionNameFooter}>{nextLaunch.name}</p>
            <p className={styles.missionFlight}>
              {nextLaunch.pad.location.name}
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
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "ignore",
      },
      query: {
        fetchPolicy: "network-only",
        errorPolicy: "all",
      },
      mutate: {
        errorPolicy: "all",
      },
    },
  });

  const { data } = await client.query({
    query: gql`
      query GetLaunchDetails {
        launch @rest(type: "Launch", path: "/2.2.0/launch/upcoming/") {
          results
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
