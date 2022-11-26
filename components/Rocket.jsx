import React from "react";
import Image from "next/image";
import falcon9 from "../assets/falcon-9.png";
import falconHeavy from "../assets/falcon-heavy.png";
import starShip from "../assets/starship.png";

const Rocket = ({ id }) => {
  // TODO: verify the correct id's used for each rocket
  const starShipId = 100;
  const falconHeavyId = 200;

  switch (id) {
    case starShipId:
      return <Image src={starShip} height={350} alt="Starship" />;
    case falconHeavyId:
      return <Image src={falconHeavy} height={350} alt="Falcon Heavy" />;
    default:
      return <Image src={falcon9} height={350} alt="Falcon 9" />;
  }
};

export default Rocket;
