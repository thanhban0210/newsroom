import { AiOutlineRight } from "react-icons/ai";
import { News } from "../views/HomePage";
import Logo from "./Logo";

interface Props {
  newsList: News[];
}

const TopStories = ({ newsList }: Props) => {
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
                  <img
                    src={news.urlToImage}
                    className="img-fluid rounded"
                    alt="..."
                  />
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
                          <a className="dropdown-item" href="#">
                            Add to favorites
                          </a>
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
