import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import ProfilePage from "./views/ProfilePage";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthContext } from "./services/authContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./views/HomePage";
import { News } from "./views/HomePage";
import FavoritePage from "./views/FavoritePage";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    // Check if token exists in storage
    const token = localStorage.getItem("token");
    if (token) {
      setSignedIn(true);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ signedIn, setSignedIn }}>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
