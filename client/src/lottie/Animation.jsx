/** @format */

import React, { useEffect } from "react";
import Lottie from "react-lottie-wrapper";

import createAn from "./social.json";
import createAn2 from "./75241-map-reveal.json";
import createAn3 from "./77631-bee-lounging.json";
import createAn4 from "./80019-uploading-file.json";
import createAn5 from "./80578-scary-cat.json";

import loginAn from "./image.json";

const Animation = ({ h, w, name }) => {
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: createAn,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions3 = {
    loop: true,
    autoplay: true,
    animationData: createAn2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions4 = {
    loop: true,
    autoplay: true,
    animationData: createAn3,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions5 = {
    loop: true,
    autoplay: true,
    animationData: createAn4,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: loginAn,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const value = () => {
    const random = Math.floor(Math.random() * 6);
    if (random === 1) {
      return defaultOptions1;
    } else if (random === 2) {
      return defaultOptions5;
    } else if (random === 3) {
      return defaultOptions4;
    } else if (random === 4) {
      return defaultOptions5;
    } else if (random === 5) {
      return defaultOptions3;
    } else {
      return defaultOptions1;
    }
  };
  return (
    <div>
      <Lottie
        options={name === "loginAn" ? defaultOptions2 : defaultOptions1}
        height={h}
        width={w}
      />
    </div>
  );
};

export default Animation;
