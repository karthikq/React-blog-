/** @format */

import axios from "axios";
import Checkenv from "./Checkenv";
const url = Checkenv();

export default axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});
