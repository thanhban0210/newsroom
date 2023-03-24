import axios from "axios";

const baseUrl = "http://localhost:3000";

const api = {
  get: (endpoint: String) => axios.get(baseUrl + endpoint),
  create: <T>(endpoint: String, data: T) =>
    axios.post(baseUrl + endpoint, data),
  remove: (endpoint: String) => axios.delete(baseUrl + endpoint),
  getProfile: (endpoint: String) =>
    axios.get(baseUrl + endpoint, {
      headers: {
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    }),
  update: <T>(endpoint: String, data: T) =>
    axios.put(baseUrl + endpoint, data, {
      headers: {
        "x-auth-token": `${localStorage.getItem("token")}`,
      },
    }),
};

export default api;
