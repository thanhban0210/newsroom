import RegisterForm from "./components/RegisterForm";
import { RegistrationFormData } from "./components/RegisterForm";
import { AxiosError } from "axios";
import api from "./services/api";
import { useState } from "react";

enum AlertType {
  ERROR,
  SUCCESS,
}

function App() {
  const [alert, setAlert] = useState<{ type: AlertType; message: string }>({
    type: AlertType.ERROR,
    message: "",
  });
  const register = async (data: RegistrationFormData) => {
    try {
      const response = await api.create("/register", data);
      setAlert({ type: AlertType.SUCCESS, message: response?.data?.message });
    } catch (err) {
      if (err instanceof AxiosError) {
        setAlert({
          type: AlertType.ERROR,
          message: err?.response?.data?.message,
        });
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="container">
      <RegisterForm onSubmit={register} />
      {alert.type === AlertType.ERROR && (
        <p className="text-danger">{alert.message}</p>
      )}
      {alert.type === AlertType.SUCCESS && (
        <p className="text-success">{alert.message}</p>
      )}
    </div>
  );
}

export default App;
