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

const ImageUpload = (file, progressbar, handleImage) => {
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
      // Handle unsuccessful uploads
      return error;
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        handleImage(downloadURL);
        return downloadURL;
      });
    }
  );
};

export default ImageUpload;
