import axios from "axios/index";
import { AUTH_URL } from "../../app.json";
const authClient = (baseUrl) => (
  axios.create({
    baseURL: AUTH_URL,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
  })
);

const clients = {
  default: {
    client: authClient(AUTH_URL),
  },
};

export default clients;
