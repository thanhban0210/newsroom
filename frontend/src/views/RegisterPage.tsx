import RegisterForm from "../components/RegisterForm";
import { RegistrationFormData } from "../components/RegisterForm";
import { AxiosError } from "axios";
import api from "../services/api";
import { useState } from "react";

export enum AlertType {
  ERROR,
  SUCCESS,
}

const RegisterPage = () => {
  const [alert, setAlert] = useState<{ type: AlertType; message: string }>({
    type: AlertType.ERROR,
    message: "",
  });
  const register = async (data: RegistrationFormData) => {
    try {
      const response = await api.create("/user/register", data);
      setAlert({ type: AlertType.SUCCESS, message: response.data });

      // Extract token from response headers
      const token = response.headers["authorization"];

      // Store token in local storage
      localStorage.setItem("token", token);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
        setAlert({
          type: AlertType.ERROR,
          message: err?.response?.data,
        });
      } else {
        console.log(err);
      }
    }
  };
  return (
    <div className="container" style={{ marginTop: "6rem" }}>
      <RegisterForm onSubmit={register} alert={alert} />
    </div>
  );
};

export default RegisterPage;
