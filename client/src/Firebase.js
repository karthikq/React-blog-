/** @format */

import { initializeApp } from "firebase/app";

// Get a reference to the storage service, which is used to create references in your storage bucket
const firebaseApp = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDLik-kjtTRHg4v6jsgcYnhEfKV8KfmoWw",
    authDomain: "stoked-cosine-331604.firebaseapp.com",
    projectId: "stoked-cosine-331604",
    storageBucket: "stoked-cosine-331604.appspot.com",
    messagingSenderId: "126929670377",
    appId: "1:126929670377:web:1f546d6a3e675fe90c2078",
  };

  const app = initializeApp(firebaseConfig);
  return app;
};
export default firebaseApp;
