import axios from "axios"

export default axios.create({
  baseURL: "https://github.com/login/oauth/access_token",
  responseType: "json",
});
