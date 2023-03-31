import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../services/authContext";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";
import { UserData } from "../views/ProfilePage";

interface Props {
  user?: UserData;
}

const Nav = ({ user }: Props) => {
  const { signedIn, setSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div>
          <Link className="navbar-brand" to="/">
            <span className="h1"> News</span>
          </Link>
        </div>
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control input-search"
                placeholder="Search news..."
                aria-label="search news"
                aria-describedby="button-addon2"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-search"
                type="submit"
                id="button-addon2"
              >
                <AiOutlineSearch />
              </button>
            </div>
          </form>
        </div>

        <div className="d-flex align-items-center ms-auto">
          {signedIn ? (
            <>
              <div>{user?.username}</div>
              <ul className="navbar-nav d-flex ms-3">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <RxAvatar className="fs-1 top-stories" />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <div className="mx-3">
                        {user?.firstName} {user?.lastName}
                        <p className="text-muted">@{user?.username}</p>
                      </div>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <div className="mx-3">
                        <Link className="nav-link" to="/profile">
                          Profile
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="mx-3">
                        <Link className="nav-link" to="/saved">
                          Read later
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="mx-3">
                        <Link className="nav-link" to="/favorite">
                          Favorites
                        </Link>
                      </div>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <div
                        className="mx-3 nav-link text-danger"
                        onClick={() => {
                          localStorage.removeItem("token");
                          setSignedIn(false);
                          navigate("/");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        Log out
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          ) : (
            <>
              <Link className="btn btn-success mx-3 rounded-pill" to="/login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
