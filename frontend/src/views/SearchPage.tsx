import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Logo from "../components/Logo";
import api from "../services/api";
import { News } from "./HomePage";
const SearchPage = () => {
  const { query } = useParams<{ query: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<News[]>([]);
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  useEffect(() => {
    const pageSize = 20;
    const fetchData = async (searchTerm: string, page: number) => {
      try {
        const data = await api.get(`/news/search?q=${searchTerm}`);
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setData(data.data.articles.slice(startIndex, endIndex));
      } catch (err) {
        console.log(err);
      }
    };
    if (query) {
      fetchData(query, page);
    }
  }, [query, page]);

  const totalPages = 5;

  return (
    <div className="container" style={{ marginTop: "6rem" }}>
      <div className="h5 mb-3">
        <span className="text-muted">Results for</span>{" "}
        <span className="h1">{query}</span>
      </div>

      <div className="d-flex justify-content-center">
        {data.length === 0 ? (
          <p>
            Looks like your favorite list is feeling a little empty. Let's fill
            it up with some amazing articles!{" "}
          </p>
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
        <nav>
          <ul className="pagination">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className="page-item">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/search/${query}?page=${index + 1}`)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default SearchPage;
