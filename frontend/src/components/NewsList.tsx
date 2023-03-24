import React from "react";
import { News } from "../views/HomePage";
import Logo from "./Logo";
interface Props {
  newsList: News[];
}
const NewsList = ({ newsList }: Props) => {
  return (
    <div>
      <div className="card text-bg-dark card-news p-3">
        <div className="h2">Top stories</div>
        <hr />
        <ul className="list-group list-group-flush">
          {newsList.map((news) => (
            <div key={news.title} className="card text-bg-dark mb-3 card-news">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={news.urlToImage}
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{news.title.split("-")[0]}</h5>
                    {/* <p className="card-text">{news.source.name}</p> */}
                    <Logo website={news.source.name} />

                    <p className="card-text">
                      <small className="text-muted">
                        {news.publishedAt.slice(0, 10)}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsList;
