import axios from "axios";

const port = process.env.PORT || "4000";
let BASE_URL = "https://meplanificobackend.herokuapp.com";
// eslint-disable-next-line
if (port == 4000) {
  BASE_URL = "http://localhost:4000";
}

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
