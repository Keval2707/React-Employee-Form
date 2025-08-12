import { useMemo, useState } from "react";
import { filterUsersByTab, updateUserList } from "./helper";
import { UserRow } from "../hooks/UserRow";

export const UserList = ({
  setUser,
  userList,
  activeTab,
  isEditing,
  setUserList,
  setIsEditing,
}) => {
  const [select, setSelect] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleActiveUser = (id) => {
    const updatedList = userList.map((user) => {
      if (user.id === id) {
        return { ...user, active: !user.active };
      }
      return user;
    });
    setUserList(updatedList);
    updateUserList(updatedList);
  };

  const handleMultipleSelectedUser = (event, item) => {
    if (event.target.checked) {
      setCheckedItems([...checkedItems, item]);
    } else {
      setCheckedItems(checkedItems.filter((i) => i.id !== item.id));
    }
  };

  const deleteUsers = (ids) => {
    const updatedList = userList.filter((user) => !ids.includes(user.id));
    setUserList(updatedList);
    updateUserList(updatedList);
  };

  const handleDeleteUser = (id) => deleteUsers([id]);

  const handleMultipleDelete = () => {
    deleteUsers(checkedItems.map((item) => item.id));
    setCheckedItems([]);
    setSelect(false);
  };

  const handleEdit = (userData) => {
    setUser(userData);
    setIsEditing(true);
  };

  const currentUserList = useMemo(
    () => filterUsersByTab(userList, activeTab),
    [activeTab, userList]
  );

  console.log("userList", userList);

  return (
    <>
      <table>
        <thead>
          <tr>
            {select ? <th></th> : null}
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Date of Death</th>
            <th>Age</th>
            <th>Programming Language</th>
            <th>Password</th>
            <th>Hobbies</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {currentUserList.map((user) => (
            <UserRow
              user={user}
              key={user.id}
              select={select}
              activeTab={activeTab}
              isEditing={isEditing}
              handleEdit={handleEdit}
              checkedItems={checkedItems}
              handleDelete={handleDeleteUser}
              handleActiveUser={handleActiveUser}
              handleSelect={handleMultipleSelectedUser}
            />
          ))}
        </tbody>
      </table>

      <div className="flex justify-center">
        <button
          className="btn btn-primary mb-8 items-center"
          onClick={select ? handleMultipleDelete : () => setSelect(true)}
        >
          {select ? "Delete" : "Select"}
        </button>
      </div>
    </>
  );
};
