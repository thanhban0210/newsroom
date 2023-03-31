import { AxiosError } from "axios";
import api from "../services/api";
import { useContext, useState } from "react";
import LoginForm, { LoginFormData } from "../components/LoginForm";
import { AuthContext } from "../services/authContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { signedIn, setSignedIn } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const login = async (data: LoginFormData) => {
    try {
      const response = await api.create("/user/auth", data);
      const token = response.data.token;
      setSignedIn(true);
      localStorage.setItem("token", token);
      setMessage("Signed in successfully.");
      navigate("/");
    } catch (err) {
      console.log(err);
      setMessage("Username or password is incorrect.");
    }
  };

  return (
    <div className="container" style={{ marginTop: "6rem" }}>
      <LoginForm onSubmit={login} message={message} />
    </div>
  );
};

export default LoginPage;
