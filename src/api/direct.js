import axios from "axios";

const port = process.env.REACT_APP_PORT || 4000;
let BASE_URL = "https://meplanificobackend.herokuapp.com";
// eslint-disable-next-line
console.log("En..:", port);

if (parseInt(port) === 4000) {
  BASE_URL = "http://localhost:4000";
}

console.log("En..:", process.env.REACT_APP_PORT, "....:", BASE_URL);
export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
