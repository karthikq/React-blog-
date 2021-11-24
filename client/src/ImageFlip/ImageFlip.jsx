/** @format */

import React from "react";
import { FiDownloadCloud } from "react-icons/fi";
import "./flip.styles.scss";

const ImageFlip = ({ imageLink, imageClass }) => {
  return (
    <div className="field-left-flip">
      <div className="field-left-flip-inner">
        <div className="field-left-flip-front">
          <img src={imageLink} className={imageClass} alt="postimage" />
        </div>
        <div className="field-left-flip-back">
          <p>Download image</p>
          <a
            download={imageLink}
            href={imageLink}
            target="_blank"
            rel="noreferrer">
            <FiDownloadCloud className="field-download-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageFlip;
