import React, { useEffect, useState } from "react";
import TopStories from "../components/TopStories";
import LocalNews from "../components/LocalNews";
import Category from "../components/Category";
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
  const [savedList, setSavedList] = useState<News[]>([]);
  const [categories, setCategories] = useState<{
    [category: string]: News[];
  }>({
    business: [],
    entertainment: [],
    health: [],
    science: [],
    sports: [],
    technology: [],
  });

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

    const fetchSaved = async () => {
      try {
        const response = await api.getWithAuth("/saved");
        setSavedList(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchNewsData = async (category: string) => {
      try {
        const data = await api.get(`/news/category/${category}`);
        setCategories((prevCategories) => ({
          ...prevCategories,
          [category]: data.data.articles,
        }));
      } catch (err) {
        console.log(err);
      }
    };

    for (const category in categories) {
      fetchNewsData(category);
    }
    fetchSaved();
    fetchTopStories();
    fetchLocalNews();
    fetchFavorites();
  }, []);

  const handleFavortire = async (news: News) => {
    try {
      const response = await api.addWithAuth("/favorite", news);
      setFavoritesList([...favoritesList, news]);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaved = async (news: News) => {
    try {
      const response = await api.addWithAuth("/saved", news);
      setSavedList([...savedList, news]);
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
            handleSaved={handleSaved}
            favoritesList={favoritesList}
            savedList={savedList}
          />
        </div>
        <div className="col-md-4 mb-5">
          <LocalNews
            newsList={localNews}
            handleFavorite={handleFavortire}
            handleSaved={handleSaved}
            favoritesList={favoritesList}
            savedList={savedList}
          />
        </div>
      </div>
      <div className="row">
        {Object.keys(categories).map((category, index) => {
          if (index % 3 === 0) {
            // Start a new row
            return (
              <div key={category} className="row mb-3">
                {Object.keys(categories)
                  .slice(index, index + 3)
                  .map((category, index) => (
                    <div key={category} className="col-md-4 mb-3">
                      <Category
                        category={category}
                        newsList={categories[category]}
                        handleFavorite={handleFavortire}
                        handleSaved={handleSaved}
                        favoritesList={favoritesList}
                        savedList={savedList}
                      />
                    </div>
                  ))}
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default HomePage;
