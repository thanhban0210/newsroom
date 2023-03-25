import { News } from "../views/HomePage";
import Logo from "./Logo";
import { AiOutlineRight } from "react-icons/ai";

interface Props {
  newsList: News[];
}

const LocalNews = ({ newsList }: Props) => {
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
              {/* <img
                src={news.urlToImage}
                className="img-fluid rounded"
                alt="..."
              /> */}

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
