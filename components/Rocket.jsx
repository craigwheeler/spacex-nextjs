import React from "react";
import Image from "next/image";
import falcon9 from "../assets/falcon-9.png";
import falconHeavy from "../assets/falcon-heavy.png";
import starShip from "../assets/starship.png";
import PSLV from "../assets/pslv.png";
import longMarch from "../assets/cn_long_march.png";
import soyuz from "../assets/soyuz.png";

const Rocket = ({ id }) => {
  const ROCKET_IMG_SIZE = 400;
  const STARSHIP_ROCKET_ID = 100;
  const FALCON_HEAVY_ROCKET_ID = 200;
  const PSLV_ROCKET_ID = 2356;
  const LONG_MARCH_ROCKET_ID = 7704;
  const SOYUZ_ROCKET_ID = 7706;

  switch (id) {
    case STARSHIP_ROCKET_ID:
      return <Image src={starShip} height={ROCKET_IMG_SIZE} alt="rocket" />;
    case FALCON_HEAVY_ROCKET_ID:
      return <Image src={falconHeavy} height={ROCKET_IMG_SIZE} alt="rocket" />;
    case PSLV_ROCKET_ID:
      return <Image src={PSLV} height={ROCKET_IMG_SIZE} alt="rocket" />;
    case LONG_MARCH_ROCKET_ID:
      return <Image src={longMarch} height={ROCKET_IMG_SIZE} alt="rocket" />;
    case SOYUZ_ROCKET_ID:
      return <Image src={soyuz} height={ROCKET_IMG_SIZE} alt="rocket" />;
    default:
      return <Image src={falcon9} height={ROCKET_IMG_SIZE} alt="rocket" />;
  }
};

export default Rocket;
