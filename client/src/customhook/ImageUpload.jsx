/** @format */

import React, { useState } from "react";
import firebaseApp from "../Firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

firebaseApp();
const storage = getStorage();

const ImageUpload = (file, progressbar, handleImage, toast, data) => {
  const storageRef = ref(storage);
  const imageRef = ref(storageRef, file.name);
  const uploadTask = uploadBytesResumable(imageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      progressbar.style.width = progress + "%";
    },
    (error) => {
      toast.error("Please refresh and submit again");
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        if (data) handleImage(downloadURL, data);
        if (!data) handleImage(downloadURL);
      });
    }
  );
};

export default ImageUpload;
