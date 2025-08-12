import "./Register.css";
import { useState } from "react";
import { UserList } from "./UserList";
import { UserRegistrationForm } from "./UserRegistrationForm";
import { getUserList, initialState } from "./helper";

export const RegistrationForm = () => {
  const [user, setUser] = useState(initialState);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("AllUsers");
  const [userList, setUserList] = useState(getUserList("users"));

  return (
    <>
      <div className="form-wrapper">
        <h2 className="form-title text-4xl">Create Account</h2>
        <UserRegistrationForm
          user={user}
          setUser={setUser}
          userList={userList}
          isEditing={isEditing}
          setUserList={setUserList}
          setIsEditing={setIsEditing}
        />
      </div>

      <section>
        <div className="mt-2">
          <h1 className="text-center text-3xl">User Details</h1>

          <div className="tabs">
            <button
              onClick={() => setActiveTab("ActiveUsers")}
              className={activeTab === "ActiveUsers" ? "active" : ""}
            >
              Active Users
            </button>

            <button
              onClick={() => setActiveTab("InactiveUsers")}
              className={activeTab === "InactiveUsers" ? "active" : ""}
            >
              Inactive Users
            </button>

            <button
              onClick={() => setActiveTab("AllUsers")}
              className={activeTab === "AllUsers" ? "active" : ""}
            >
              All Users
            </button>
          </div>

          <UserList
            user={user}
            setUser={setUser}
            userList={userList}
            activeTab={activeTab}
            isEditing={isEditing}
            setUserList={setUserList}
            setIsEditing={setIsEditing}
          />
        </div>
      </section>
    </>
  );
};
