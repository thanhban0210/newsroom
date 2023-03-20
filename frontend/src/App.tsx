import Form from "./components/Form";
import { RegistrationFormData } from "./components/Form";
import { AxiosError } from "axios";
import api from "./services/api";
import { useState } from "react";

function App() {
  const [error, setError] = useState("");
  const register = async (data: RegistrationFormData) => {
    try {
      const response = await api.create("/register", data);
      console.log(response);
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Form onSubmit={register} />
      {error && <p className="text-danger">{error}</p>}
    </>
  );
}

export default App;
