import React from "react";
import Image from "next/image";
import falcon9 from "../assets/falcon-9.png";
import falconHeavy from "../assets/falcon-heavy.png";
import starShip from "../assets/starship.png";

const Rocket = ({ id }) => {
  switch (id) {
    case "5e9d0d96eda699382d09d1ee":
      return <Image src={starShip} height={350} alt="Starship" />;
    case "5e9d0d95eda69974db09d1ed":
      return <Image src={falconHeavy} height={350} alt="Falcon Heavy" />;
    default:
      return <Image src={falcon9} height={350} alt="Falcon 9" />;
  }
};

export default Rocket;
