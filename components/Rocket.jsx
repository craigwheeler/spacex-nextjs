import React from "react";
import Image from "next/image";
import falcon9 from "../assets/falcon-9.png";
import falconHeavy from "../assets/falcon-heavy.png";
import starShip from "../assets/starship.png";

const Rocket = ({ id }) => {
  // TODO: verify the correct id's used for each rocket
  const STARSHIP_ROCKET_ID = 100;
  const FALCON_HEAVY_ROCKET_ID = 200;
  const ROCKET_IMG_SIZE = 400;

  switch (id) {
    case STARSHIP_ROCKET_ID:
      return <Image src={starShip} height={ROCKET_IMG_SIZE} alt="Starship" />;
    case FALCON_HEAVY_ROCKET_ID:
      return (
        <Image src={falconHeavy} height={ROCKET_IMG_SIZE} alt="Falcon Heavy" />
      );
    default:
      return <Image src={falcon9} height={ROCKET_IMG_SIZE} alt="Falcon 9" />;
  }
};

export default Rocket;
