import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import api from "../services/api";
import { News } from "./HomePage";

const FavoritePage = () => {
  const [favoritesList, setFavoritesList] = useState<News[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.getWithAuth("/favorite");
        setFavoritesList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFavorites();
  });

  const handleClick = async (title: string) => {
    try {
      await api.deleteFavorite(`/favorite/${title}`);
      setFavoritesList(favoritesList.filter((news) => news.title !== title));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      <div className="h2 favorites category mb-5 ">Your favorite articles</div>
      <div className="d-flex justify-content-center">
        <div className="card text-bg-dark card-news p-3">
          <ul className="list-group list-group-flush">
            {favoritesList.map((news, index) => (
              <div
                key={news.title}
                className="card text-bg-dark card-news card-news-underlined "
              >
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={news.urlToImage}
                      className="img-fluid "
                      alt="..."
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body position-relative">
                      <h5
                        className="card-title"
                        onClick={() => {
                          window.open(news.url, "_blank");
                        }}
                      >
                        {news.title}
                      </h5>
                      <Logo website={news.source.name} size={30} />
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-outline-danger position-absolute bottom-1 end-0 m-3"
                  style={{ bottom: "20px", right: "20px" }}
                  onClick={() => handleClick(news.title)}
                >
                  Remove
                </button>
                {index !== favoritesList.length - 1 && <hr />}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FavoritePage;
