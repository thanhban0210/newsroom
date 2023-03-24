import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { UserData } from "../views/ProfilePage";
const schema = z.object({
  firstName: z.string().nonempty("Please enter your first name"),
  lastName: z.string().nonempty("Please enter your last name"),
  email: z.string().email("Please enter a valid email address"),
  darkMode: z.boolean(),
  fontSize: z.string(),
});

export type FormData = z.infer<typeof schema>;

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  darkMode: boolean;
  fontSize: string;
}

interface Props {
  userData: UserData;
  onSubmit: (data: ProfileFormData) => void;
}

const UserInfoUpdate = ({ userData, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  return (
    <div className="container">
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className="mb-3">
          <div className="row">
            <div className="col-3 d-flex align-items-center">
              <label htmlFor="firstName" className="form-label">
                First name:
              </label>
            </div>
            <div className="col-8">
              <input
                {...register("firstName")}
                type="text"
                className="form-control"
                id="firstName"
                defaultValue={userData.firstName.toString()}
              />
            </div>
          </div>

          {errors.firstName && (
            <p className="text-danger">{errors.firstName.message}</p>
          )}
        </div>
        <div className="mb-3">
          <div className="row">
            <div className="col-3 d-flex align-items-center">
              <label htmlFor="lastName" className="form-label">
                Last name:
              </label>
            </div>
            <div className="col-8">
              <input
                {...register("lastName")}
                type="text"
                className="form-control"
                id="lastName"
                defaultValue={userData.lastName.toString()}
              />
            </div>
          </div>

          {errors.lastName && (
            <p className="text-danger">{errors.lastName.message}</p>
          )}
        </div>

        <div className="mb-3">
          <div className="row">
            <div className="col-3 d-flex align-items-center">
              <label htmlFor="email" className="form-label">
                Email address:
              </label>
            </div>
            <div className="col-8">
              <input
                {...register("email")}
                type="email"
                className="form-control"
                id="email"
                defaultValue={userData.email.toString()}
              />
            </div>
          </div>
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <h2 className="mt-5">Setting</h2>
        <hr />
        <div className="row mb-2">
          <div className="col-3">
            <p>Dark mode:</p>
          </div>
          <div className="col-6">
            <div className="form-check form-switch">
              <input
                {...register("darkMode")}
                className="form-check-input"
                type="checkbox"
                id="darkMode"
                defaultChecked={userData.preferences.darkMode}
              />
            </div>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-3">
            <p>Font size:</p>
          </div>
          <div className="col-6">
            <select
              {...register("fontSize")}
              className="form-select"
              id="fontSize"
              defaultValue={userData?.preferences?.fontSize}
            >
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
            </select>
            {errors.fontSize && (
              <p className="text-danger">{errors.fontSize.message}</p>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Save changes
        </button>
      </form>
    </div>
  );
};

export default UserInfoUpdate;
