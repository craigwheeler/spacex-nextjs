import styles from "../styles/Home.module.css";
import LoadingSpinner from "../components/LoadingSpinner";
import CountdownTimer from "../components/CountdownTimer";
import Image from "next/image";
import Link from "next/link";
import Rocket from "../components/Rocket";
import logo from "../assets/spacex-logo.svg";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({ uri: "https://lldev.thespacedevs.com" });

interface UpcomingLaunchType {
  launch_service_provider: { id: number };
  window_start: string;
  rocket: { id: number };
  name: string;
  pad: { location: { name: string } };
}

interface LaunchType {
  data: { launch: { results: UpcomingLaunchType[] } };
}

export default function Home({ data: { launch } }: LaunchType): JSX.Element {
  // filter launches by upcoming launch windows
  const upcomingLaunches = launch.results.filter(
    ({ status, window_start }) =>
      status.abbrev === "Go" && new Date() < new Date(window_start)
  );

  console.log("upcomingLaunches: ", upcomingLaunches);

  // get the next launch
  const [nextLaunch] = upcomingLaunches;

  return (
    <div className={styles.container}>
      {/* <Image src={logo} alt="SpaceX Logo" height={25} /> */}
      {nextLaunch ? (
        <>
          <CountdownTimer date={nextLaunch.window_start} />
          <Rocket id={nextLaunch.rocket.id} />
          <div className={styles.missionInfo}>
            <p className={styles.missionName}>{nextLaunch.name}</p>
            <p className={styles.missionFlight}>
              Location: {nextLaunch.pad.location.name}
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
