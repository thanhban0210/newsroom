import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertType } from "../App";
import { FaGoogle, FaFacebook } from "react-icons/fa";

const schema = z.object({
  firstName: z.string().nonempty("Please enter your first name"),
  lastName: z.string().nonempty("Please enter your last name"),
  username: z.string().min(6, "Username must be at least 6 characters long"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type FormData = z.infer<typeof schema>;

export interface RegistrationFormData {
  firstName: String;
  lastName: String;
  email: String;
  username: String;
  password: String;
}

interface Props {
  onSubmit: (data: RegistrationFormData) => void;
  alert: { type: AlertType; message: string };
}

const Form = ({ onSubmit, alert }: Props) => {
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
                <h2 className="card-title ">Create Your Account</h2>
                <p className="text-muted">
                  Already have an account? <a href="sign-in.html">Sign in</a>
                </p>
              </div>
              <div className="line-divider">
                <hr />
              </div>

              <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className="row">
                  <div className="col-sm-6 mb-3 form-floating">
                    <input
                      {...register("firstName")}
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="First name"
                    />
                    <label htmlFor="firstName" className="mx-3">
                      First Name
                    </label>

                    {errors.firstName && (
                      <p className="text-danger">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div className="col-sm-6 mb-3 form-floating">
                    <input
                      {...register("lastName")}
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Last name"
                    />
                    <label htmlFor="lastName" className="mx-3">
                      Last Name
                    </label>
                    {errors.lastName && (
                      <p className="text-danger">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="mb-3 form-floating">
                  <input
                    {...register("username")}
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                  />
                  <label htmlFor="username">Username</label>
                  {errors.username && (
                    <p className="text-danger">{errors.username.message}</p>
                  )}
                </div>

                <div className="mb-3 form-floating">
                  <input
                    {...register("email")}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email address"
                  />
                  <label htmlFor="email">Email address</label>
                  {errors.email && (
                    <p className="text-danger">{errors.email.message}</p>
                  )}
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
                  {errors.password && (
                    <p className="text-danger">{errors.password.message}</p>
                  )}
                </div>
                <div className="row">
                  <button
                    type="submit"
                    className="btn btn-lg btn-outline-primary mb-3"
                  >
                    Create
                  </button>
                </div>

                {alert.type === AlertType.ERROR && (
                  <p className="text-danger">{alert.message}</p>
                )}
                {alert.type === AlertType.SUCCESS && (
                  <p className="text-success">{alert.message}</p>
                )}
              </form>
              <div className="line-divider">
                <hr />
                <span>or</span>
                <hr />
              </div>
              <div className="row">
                <button className="google-btn mb-4">
                  <FaGoogle />
                  <span className="mx-3">Sign up with Google</span>
                </button>
                <button className="facebook-btn">
                  <FaFacebook />
                  <span className="mx-3">Sign up with Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
