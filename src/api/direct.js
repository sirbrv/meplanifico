import axios from "axios";
//const port = process.env.REACT_APP_PORT || 4000;
let BASE_URL = "https://meplanificobackend.herokuapp.com";
// eslint-disable-next-line
if (process.env.NODE_ENV === "development") {
  BASE_URL = "http://localhost:4000";
}
console.log(
  "En..:",
  process.env.REACT_APP_PORT,
  "....:",
  process.env.NODE_ENV,
  ".....:",
  BASE_URL
);
export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
