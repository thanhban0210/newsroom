import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Logo from "../components/Logo";
import api from "../services/api";
import { News } from "./HomePage";
import { GoKebabVertical } from "react-icons/go";
const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [dataFull, setDataFull] = useState<News[]>([]);
  const [data, setData] = useState<News[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams] = useSearchParams();
  const [favoritesList, setFavoritesList] = useState<News[]>([]);
  const [savedList, setSavedList] = useState<News[]>([]);
  const page = parseInt(searchParams.get("page") || "1");
  useEffect(() => {
    const pageSize = 20;
    const fetchData = async (category: string) => {
      try {
        let data;
        if (category === "top") {
          data = await api.get(`/news/top-full`);
        } else if (category === "local") {
          data = await api.get(`/news/local-full`);
        } else {
          data = await api.get(`/news/category-full/${category}`);
        }
        setTotalPages(Math.ceil(data.data.articles.length / pageSize));
        setDataFull(data.data.articles);
        setData(data.data.articles.slice(0, 20));
      } catch (err) {
        console.log(err);
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
    if (category) {
      fetchData(category);
      fetchFavorites();
      fetchSaved();
    }
  }, [category]);

  useEffect(() => {
    if (dataFull.length > 0) {
      setData(dataFull.slice((page - 1) * 20, page * 20));
    }
    window.scrollTo(0, 0);
  }, [page]);
  function capitalizeFirstLetter(str: string | undefined): string {
    return str ? str.slice(0, 1).toUpperCase() + str.slice(1) : "";
  }

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
    <div className="container" style={{ marginTop: "6rem" }}>
      <div className="h5 mb-3">
        <span className="categories h1">{capitalizeFirstLetter(category)}</span>
      </div>

      <div className="d-flex justify-content-center">
        {data.length === 0 ? (
          <p>We're sorry, there are no results to display. </p>
        ) : (
          <div className="card text-bg-dark card-news p-3">
            <ul className="list-group list-group-flush">
              {data.map((news, index) => (
                <div
                  key={news.title}
                  className="card text-bg-dark card-news card-news-underlined "
                >
                  <div className="row g-0">
                    <div className="col-md-4">
                      {news.urlToImage === null ? (
                        <p>No images</p>
                      ) : (
                        <img
                          src={news.urlToImage}
                          className="img-fluid "
                          alt="..."
                        />
                      )}
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
                        <div className="dropdown position-absolute top-0 end-0">
                          <a
                            className="dropdown-toggle text-secondary"
                            href="#"
                            role="button"
                            id={`dropdownMenuLink${index}`}
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <GoKebabVertical style={{ height: "20px" }} />
                          </a>

                          <ul
                            className="dropdown-menu"
                            aria-labelledby={`dropdownMenuLink${index}`}
                          >
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleFavortire(news)}
                                disabled={favoritesList.some(
                                  (favorite) => favorite.title === news.title
                                )}
                              >
                                {favoritesList.some(
                                  (favorite) => favorite.title === news.title
                                )
                                  ? "Added to favorites"
                                  : "Add to favorites"}
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => handleSaved(news)}
                                disabled={savedList.some(
                                  (saved) => saved.title === news.title
                                )}
                              >
                                {savedList.some(
                                  (saved) => saved.title === news.title
                                )
                                  ? "Saved"
                                  : "Save for later"}
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index !== data.length - 1 && <hr />}
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className="page-item mx-3">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/category/${category}?page=${index + 1}`)
                  }
                  disabled={index + 1 === page}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
