import React from "react";
import { UserData } from "../views/ProfilePage";
interface Props {
  userData: UserData;
}
const UserInfoList = ({ userData }: Props) => {
  return (
    <div>
      <div className="row mb-2">
        <div className="col-3">
          <p>First name:</p>
        </div>
        <div className="col-6">{userData.firstName}</div>
      </div>
      <div className="row mb-2">
        <div className="col-3">
          <p>Last name:</p>
        </div>
        <div className="col-6">{userData.lastName}</div>
      </div>
      <div className="row mb-2">
        <div className="col-3">
          <p>Email address:</p>
        </div>
        <div className="col-6">{userData.email}</div>
      </div>

      <h2 className="mt-5">Setting</h2>
      <hr />
      <div className="row mb-2">
        <div className="col-3">
          <p>Dark mode:</p>
        </div>
        <div className="col-6">
          <p>{userData?.preferences?.darkMode ? "Enabled" : "Disabled"}</p>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-3">
          <p>Font size:</p>
        </div>
        <div className="col-6">
          <p>{userData?.preferences?.fontSize}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoList;
