const axios = require("axios");
require("dotenv").config();
const api_key = process.env.NEWS_APIKEY;
const api = {
  getTopStories: (country) =>
    axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country: country,
        apiKey: api_key,
        pageSize: 3,
        page: 1,
      },
    }),

  getLocalNews: (query) =>
    axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: query,
        apiKey: api_key,
        pageSize: 3,
        page: 1,
      },
    }),

  getSearchNews: (query) =>
    axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: query,
        apiKey: api_key,
        excludeDomains: "consent.google.com",
      },
    }),
};
module.exports = api;
