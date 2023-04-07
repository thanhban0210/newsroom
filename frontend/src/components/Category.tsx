import { useContext } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { AuthContext } from "../services/authContext";
import { News } from "../views/HomePage";
import { Link, useNavigate } from "react-router-dom";
import { GoKebabVertical } from "react-icons/go";
import Logo from "./Logo";

interface Props {
  newsList: News[];
  handleFavorite: (news: News) => void;
  favoritesList: News[];
  savedList: News[];
  handleSaved: (news: News) => void;
  category: string;
}

const Category = ({
  category,
  newsList,
  handleFavorite,
  handleSaved,
  favoritesList,
  savedList,
}: Props) => {
  const { signedIn, setSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAddToFavorites = (news: News) => {
    if (signedIn) {
      handleFavorite(news);
    } else {
      alert("Please sign in  first!");
      navigate("/login");
    }
  };
  const handleAddToSaved = (news: News) => {
    if (signedIn) {
      handleSaved(news);
    } else {
      alert("Please sign in  first!");
      navigate("/login");
    }
  };
  function capitalizeFirstLetter(str: string): string {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
  }
  return (
    <div>
      <div className="card card-news p-3">
        <Link
          to={`/category/${category}`}
          className="h4 categories category"
          style={{ textDecoration: "none", color: "#009688" }}
        >
          {capitalizeFirstLetter(category)} <AiOutlineRight />
        </Link>
        <hr />
        <ul className="list-group list-group-flush">
          {newsList.map((news, index) => (
            <div
              key={news.title}
              className="card card-news card-news-underlined"
            >
              <div className="row g-0">
                <div className="col-xl-4">
                  {news.urlToImage ? (
                    <img
                      src={news.urlToImage}
                      className="img-fluid"
                      alt="..."
                    />
                  ) : null}
                </div>

                <div className="col-xl-8">
                  <div className="card-body position-relative p-3">
                    <div
                      className="card-title"
                      onClick={() => {
                        window.open(news.url, "_blank");
                      }}
                    >
                      {news.title}
                    </div>
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
                            onClick={() => handleAddToFavorites(news)}
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
                            onClick={() => handleAddToSaved(news)}
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

              {index !== newsList.length - 1 && <hr />}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
