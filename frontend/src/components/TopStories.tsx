import { useContext } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { AuthContext } from "../services/authContext";
import { News } from "../views/HomePage";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

interface Props {
  newsList: News[];
  handleFavorite: (news: News) => void;
  favoritesList: News[];
}

const TopStories = ({ newsList, handleFavorite, favoritesList }: Props) => {
  const { signedIn, setSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleAddToFavorites = (news: News) => {
    if (signedIn) {
      // alert("Added to favorites!");
      handleFavorite(news);
    } else {
      alert("Please sign in  first!");
      navigate("/login");
    }
  };
  return (
    <div>
      <div className="card text-bg-dark card-news p-3 ">
        <div className="h4 top-stories category ">
          Top stories <AiOutlineRight />
        </div>
        <hr />
        <ul className="list-group list-group-flush">
          {newsList.map((news, index) => (
            <div
              key={news.title}
              className="card text-bg-dark card-news card-news-underlined "
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={news.urlToImage} className="img-fluid" alt="..." />
                </div>
                <div className="col-md-8">
                  <div className="card-body position-relative p-3">
                    <h5
                      className="card-title"
                      onClick={() => {
                        window.open(news.url, "_blank");
                      }}
                    >
                      {news.title.split("-")[0]}
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
                        <i className="fas fa-ellipsis-v"></i>
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
                          <a className="dropdown-item" href="#">
                            Save for later
                          </a>
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

export default TopStories;
