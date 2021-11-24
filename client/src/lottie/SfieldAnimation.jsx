/** @format */

import React, { useEffect } from "react";
import Lottie from "react-lottie-wrapper";

import createAn from "./social.json";
import noitem from "./71229-not-found.json";
import noitem2 from "./82693-document-search.json";
import noitem3 from "./78347-no-search-result.json";
import noitem4 from "./84315-document.json";

import loginAn from "./image.json";

const SfieldAnimation = ({ h, w, name }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: noitem,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: noitem2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: noitem3,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const defaultOptions3 = {
    loop: true,
    autoplay: true,
    animationData: noitem4,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const value = () => {
    const random = Math.floor(Math.random() * 5);
    if (random === 1) {
      return defaultOptions;
    } else if (random === 2) {
      return defaultOptions1;
    } else if (random === 3) {
      return defaultOptions2;
    } else if (random === 4) {
      return defaultOptions3;
    } else {
      return defaultOptions;
    }
  };
  return (
    <div>
      <Lottie options={value()} height={h} width={w} />
    </div>
  );
};

export default SfieldAnimation;
