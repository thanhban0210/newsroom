import { useEffect, useState } from "react";
import UserInfoUpdate, { ProfileFormData } from "../components/UserInfoUpdate";
import UserInfoList from "../components/UserInfoList";
import api from "../services/api";
export interface UserData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  region: string;
  createdAt: Date;
  preferences: {
    darkMode: boolean;
    fontSize: number;
  };
}

const ProfilePage = () => {
  const [isEditMode, setIsEditMode] = useState(false);
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
    fetchProfile();
  }, [isEditMode]);
  const handleModify = async (data: ProfileFormData) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      preferences: {
        darkMode: data.darkMode,
        fontSize: parseInt(data.fontSize),
      },
    };
    try {
      const response = await api.update("/user/modify", updatedUser);
      setUser(response.data);
      setIsEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {user ? (
        <>
          <h1 className="my-5">Welcome back, {user.username}</h1>
          <div className="d-flex justify-content-between">
            <h2>Profile</h2>
            <button
              className="btn btn-primary"
              onClick={() => setIsEditMode(true)}
              disabled={isEditMode}
            >
              Edit
            </button>
          </div>

          <hr />

          {isEditMode ? (
            // <UserInfo userData={user} />
            <UserInfoUpdate userData={user} onSubmit={handleModify} />
          ) : (
            <UserInfoList userData={user} />
          )}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default ProfilePage;
