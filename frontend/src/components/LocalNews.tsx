import { News } from "../views/HomePage";
import Logo from "./Logo";
import { AiOutlineRight } from "react-icons/ai";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/authContext";
import { GoKebabVertical } from "react-icons/go";

interface Props {
  newsList: News[];
  handleFavorite: (news: News) => void;
  favoritesList: News[];
  savedList: News[];
  handleSaved: (news: News) => void;
}

const LocalNews = ({
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
  return (
    <div>
      <div className="card  text-bg-dark card-news p-3">
        <div className="h4 local-news category">
          Local News <AiOutlineRight />
        </div>
        <hr />
        <ul className="list-group list-group-flush">
          {newsList.map((news, index) => (
            <div
              key={news.title}
              className="card text-bg-dark card-news card-news-underlined"
            >
              <div className="card-body">
                <p
                  className="card-title"
                  onClick={() => {
                    window.open(news.url, "_blank");
                  }}
                >
                  {news.title.split("-")[0]}
                </p>
                {/* <p className="card-text">{news.source.name}</p> */}
                <Logo website={news.source.name} size={14} />
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
                        {savedList.some((saved) => saved.title === news.title)
                          ? "Saved"
                          : "Save for later"}
                      </button>
                    </li>
                  </ul>
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

export default LocalNews;
