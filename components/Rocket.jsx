import React from "react";
import Image from "next/image";
import falcon9 from "../assets/falcon-9.png";
import falconHeavy from "../assets/falcon-heavy.png";
import starShip from "../assets/starship.png";
import PSLV from "../assets/pslv.png";
import longMarch from "../assets/cn_long_march.png";
import soyuz from "../assets/soyuz.png";
import terran from "../assets/terran-01.png";
import launcherOne from "../assets/launcher-one.png";
import zhuque from "../assets/zhuque-2.png";
import electron from "../assets/electron.png";

const Rocket = ({ id }) => {
  const imgHeight = 450;

  switch (true) {
    case id.toLowerCase().includes("starship"):
      return <Image src={starShip} height={imgHeight} alt="rocket" />;
    case id.toLowerCase().includes("falcon heavy"):
      return <Image src={falconHeavy} height={imgHeight} alt="rocket" />;
    case id.toLowerCase().includes("pslv"):
      return <Image src={PSLV} height={imgHeight} alt="rocket" />;
    case id.toLowerCase().includes("long march"):
      return <Image src={longMarch} height={imgHeight} alt="rocket" />;
    case id.toLowerCase().includes("terran"):
      return <Image src={terran} height={imgHeight} alt="rocket" />;
    case id.toLowerCase().includes("launcher one"):
      return <Image src={launcherOne} height={imgHeight} alt="rocket" />;
    case id.toLowerCase().includes("zhuque"):
      return <Image src={zhuque} height={imgHeight} alt="rocket" />;
    case id.toLowerCase().includes("electron"):
      return <Image src={electron} height={imgHeight} alt="rocket" />;
    case id.toLowerCase().includes("soyuz"):
      return <Image src={soyuz} height={imgHeight} alt="rocket" />;
    default:
      return <Image src={falcon9} height={imgHeight} alt="rocket" />;
  }
};

export default Rocket;
