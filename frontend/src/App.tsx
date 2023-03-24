import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";
import ProfilePage from "./views/ProfilePage";
import { Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "./services/authContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./components/Nav";
import HomePage from "./views/HomePage";

function App() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ signedIn, setSignedIn }}>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
