/** @format */

import React, { useEffect } from "react";
import useUploads from "../customhook/ImageUpload";

const Progress = ({ file, setFile }) => {
  const { url, progress, err } = useUploads(file);
  if (url) {
    console.log(url);
  }
  console.log(progress);
  //   useEffect(() => {
  //     if (url) {
  //       console.log("S");
  //       setFile();
  //     }
  //   }, [url, setFile]);

  return (
    <div className="image-progress-upload">
      <span className="progress" style={{ width: progress + "%" }}></span>
    </div>
  );
};

export default Progress;
