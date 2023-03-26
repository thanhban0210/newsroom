import React, { useEffect, useState } from "react";
import TopStories from "../components/TopStories";
import LocalNews from "../components/LocalNews";
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
  content: string;
  url: string;
}

const HomePage = () => {
  const [topStories, setTopStories] = useState<News[]>([]);
  const [localNews, setLocalNews] = useState<News[]>([]);
  const [favoritesList, setFavoritesList] = useState<News[]>([]);

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const response = await api.get("/news/top");
        setTopStories(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchLocalNews = async () => {
      try {
        const response = await api.get("/news/local");
        setLocalNews(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchFavorites = async () => {
      try {
        const response = await api.getWithAuth("/favorite");
        setFavoritesList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTopStories();
    fetchLocalNews();
    fetchFavorites();
  }, []);

  const handleFavortire = async (news: News) => {
    try {
      const response = await api.addFavorite("/favorite", news);
      setFavoritesList([...favoritesList, news]);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="row">
        <div className="col-md-8 mb-5">
          <TopStories
            newsList={topStories}
            handleFavorite={handleFavortire}
            favoritesList={favoritesList}
          />
        </div>
        <div className="col-md-4 mb-5">
          <LocalNews newsList={localNews} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
