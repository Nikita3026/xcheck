import axios from "axios"

export default axios.create({
  baseURL: "https://xcheck-heroku-server.herokuapp.com/",
  responseType: "json",
});
