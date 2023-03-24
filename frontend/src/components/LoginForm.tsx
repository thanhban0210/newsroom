import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertType } from "../views/RegisterPage";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const schema = z.object({
  username: z.string().min(6),
  password: z.string().min(6),
});
type FormData = z.infer<typeof schema>;

export interface LoginFormData {
  username: String;
  password: String;
}

interface Props {
  onSubmit: (data: LoginFormData) => void;
  message: string;
}
const LoginForm = ({ onSubmit, message }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  return (
    <div className="container" style={{ marginTop: "6rem" }}>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-10 col-sm-12">
          <div className="card p-4">
            <div className="card-body">
              <div className="text-center">
                <h2 className="card-title ">Welcome back!</h2>
                <p className="text-muted">
                  Don't have an account?{" "}
                  <Link to="/register">Sign up for free</Link>
                </p>
              </div>
              <div className="line-divider">
                <hr />
              </div>

              <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className="mb-3 form-floating">
                  <input
                    {...register("username")}
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                  />
                  <label htmlFor="username">Username</label>
                </div>

                <div className="mb-5 form-floating">
                  <input
                    {...register("password")}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="row">
                  <button
                    type="submit"
                    className="btn btn-lg btn-outline-primary mb-3"
                  >
                    Sign In
                  </button>
                </div>
                {(errors.username || errors.password) && (
                  <p className="text-danger">
                    Username or password is incorrect
                  </p>
                )}
                {message && <p>{message}</p>}
              </form>
              <div className="line-divider">
                <hr />
                <span>or</span>
                <hr />
              </div>
              <div className="row">
                <button className="google-btn mb-4">
                  <FaGoogle />
                  <span className="mx-3">Sign in with Google</span>
                </button>
                <button className="facebook-btn">
                  <FaFacebook />
                  <span className="mx-3">Sign in with Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
