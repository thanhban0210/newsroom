import axios from "axios";

const baseUrl = "http://localhost:3000/user";

const api = {
  get: (endpoint: String) => axios.get(baseUrl + endpoint),
  create: <T>(endpoint: String, data: T) =>
    axios.post(baseUrl + endpoint, data),
  remove: (endpoint: String) => axios.delete(baseUrl + endpoint),
};

export default api;
