const axios = require("axios");
require("dotenv").config();
const api_key = process.env.NEWS_APIKEY;

const api = {
  getNewsList: (country) =>
    axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country: country,
        apiKey: api_key,
        pageSize: 3,
        page: 1,
      },
    }),
};
module.exports = api;
