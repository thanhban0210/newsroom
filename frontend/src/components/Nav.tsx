import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../services/authContext";

const Nav = () => {
  const { signedIn, setSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div>
          <Link className="navbar-brand" to="/">
            <span className="h1"> News</span>
          </Link>
        </div>

        <div className="d-flex align-items-center ms-auto">
          {signedIn ? (
            <>
              <div className="mx-3">
                <Link className="nav-link" to="/favorite">
                  Favorite
                </Link>
              </div>
              <div className="mx-3">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </div>

              <button
                className="btn btn-danger"
                onClick={() => {
                  localStorage.removeItem("token");
                  setSignedIn(false);
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-primary mx-3" to="/login">
                Login
              </Link>

              <Link className="btn btn-secondary mx-3" to="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
