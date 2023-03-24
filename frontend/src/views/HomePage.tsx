import React, { useEffect, useState } from "react";
import NewsList from "../components/NewsList";
import api from "../services/api";

export interface News {
  title: string;
  author: string;
  urlToImage: string;
  description: string;
  source: {
    name: string;
  };
  publishedAt: string;
}

const HomePage = () => {
  const [news, setNews] = useState<News[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/news/list");
        setNews(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="container" style={{ marginTop: "150px" }}>
      <NewsList newsList={news} />
    </div>
  );
};

export default HomePage;
