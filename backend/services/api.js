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
  getTopStoriesFull: (country) =>
    axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country: country,
        apiKey: api_key,
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

  getLocalNewsFull: (query) =>
    axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: query,
        apiKey: api_key,
        pageSize: 100,
      },
    }),

  getSearchNews: (query) =>
    axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: query,
        apiKey: api_key,
        excludeDomains: "consent.google.com,news.google.com",
        language: "en",
      },
    }),
  getCategory: (category) =>
    axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        category: category,
        apiKey: api_key,
        pageSize: 3,
        page: 1,
        language: "en",
      },
    }),
  getCategoryFull: (category) =>
    axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        category: category,
        apiKey: api_key,
        language: "en",
        pageSize: 100,
      },
    }),
};
module.exports = api;
