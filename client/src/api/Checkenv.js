/** @format */

function Checkenv() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:4000";
  } else {
    return "https://shrouded-brook-23038.herokuapp.com";
  }
}
export default Checkenv;
