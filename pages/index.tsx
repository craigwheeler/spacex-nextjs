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

type LaunchType = {
  data: {
    launch: {
      results: any;
    };
  };
};

export default function Home({ data: { launch } }: LaunchType): JSX.Element {
  // SpaceX launch service provider id
  const spacexId = 121;

  // filter out launches where launch_service_provider is SpaceX
  const filteredLaunches = launch.results.filter(
    ({ launch_service_provider }) => launch_service_provider.id === spacexId
  );

  // get the next launch
  const [upcomingLaunch] = filteredLaunches;

  // get launch start date
  const launchDate = new Date(upcomingLaunch.window_start);

  return (
    <div className={styles.container}>
      <Image src={logo} alt="SpaceX Logo" height={20} />
      {upcomingLaunch ? (
        <>
          <CountdownTimer date={upcomingLaunch.window_start} />
          <Rocket id={upcomingLaunch.rocket.id} />
          <div className={styles.missionInfo}>
            <p className={styles.missionName}>{upcomingLaunch.name}</p>
            <p className={styles.missionFlight}>
              Location: {upcomingLaunch.pad.location.name}
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
