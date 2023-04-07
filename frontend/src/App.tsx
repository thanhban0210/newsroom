import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import ProfilePage, { UserData } from "./views/ProfilePage";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthContext } from "./services/authContext";
import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import HomePage from "./views/HomePage";
import FavoritePage from "./views/FavoritePage";
import SavedPage from "./views/SavedPage";
import api from "./services/api";
import SearchPage from "./views/SearchPage";
import CategoryPage from "./views/CategoryPage";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    // Check if token exists in storage
    const token = localStorage.getItem("token");
    if (token) {
      setSignedIn(true);
    }
  }, []);
  const [user, setUser] = useState<UserData>();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.getWithAuth("/user/me");
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (signedIn) {
      fetchProfile();
    }
  }, [signedIn]);

  return (
    <AuthContext.Provider value={{ signedIn, setSignedIn }}>
      <Nav user={user} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
