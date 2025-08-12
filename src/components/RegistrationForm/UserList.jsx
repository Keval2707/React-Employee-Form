import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useMemo, useState } from "react";
import { getAge, updateUserList } from "./helper";

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

  const handleDeleteUser = (id) => {
    const updatedList = userList.filter((user) => user.id !== id);
    setUserList(updatedList);
    updateUserList(updatedList);
  };

  const handleMultipleDelete = () => {
    const selectedIds = checkedItems.map((item) => item.id);
    const updatedList = userList.filter(
      (user) => !selectedIds.includes(user.id)
    );
    setUserList(updatedList);
    updateUserList(updatedList);
    setCheckedItems([]);
    setSelect(false);
  };

  const handleEdit = (userData) => {
    setUser(userData);
    setIsEditing(true);
  };

  const currentUserList = useMemo(() => {
    if (activeTab === "ActiveUsers") {
      return userList.filter((user) => user.active);
    } else if (activeTab === "InactiveUsers") {
      return userList.filter((user) => !user.active);
    }
    return userList;
  }, [activeTab, userList]);

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
          {currentUserList.map(
            ({
              id,
              dob,
              dod,
              name,
              email,
              active,
              gender,
              hobbies,
              password,
              programming,
              confirmPassword,
            }) => {
              return (
                <tr
                  key={id}
                  className={`${
                    !active && activeTab !== "InactiveUsers"
                      ? "line-through"
                      : ""
                  }`}
                >
                  {select ? (
                    <td>
                      <input
                        id={id}
                        name={id}
                        value={id}
                        checked={checkedItems.some((i) => i.id === id)}
                        type="checkbox"
                        onChange={(event) =>
                          handleMultipleSelectedUser(event, {
                            id: id,
                            dob,
                            name,
                            email,
                            gender,
                            hobbies,
                            password,
                            programming,
                            confirmPassword,
                          })
                        }
                      />
                    </td>
                  ) : null}

                  <td>{id}</td>

                  <td>
                    <div
                      className="flex justify-between cursor-pointer"
                      onClick={() => handleActiveUser(id)}
                    >
                      <span>{name}</span>
                    </div>
                  </td>

                  <td>
                    <div className="flex justify-between">
                      <span>{email}</span>
                    </div>
                  </td>

                  <td>
                    <div className="flex justify-between">
                      <span>{gender}</span>
                    </div>
                  </td>

                  <td>
                    <div className="flex justify-between">
                      <span>{dob}</span>
                    </div>
                  </td>

                  <td>
                    <div className="flex justify-center">
                      <span>{dod === "" ? "-----" : dod}</span>
                    </div>
                  </td>

                  <td>
                    <div className="flex justify-between">
                      <span>{getAge(dob, dod)}</span>
                    </div>
                  </td>

                  <td>
                    <div className="flex justify-between">
                      <span>{programming}</span>
                    </div>
                  </td>

                  <td>
                    <div className="flex justify-between">
                      <span>{password}</span>
                    </div>
                  </td>

                  <td>
                    <div className="flex justify-between">
                      <span>{hobbies}</span>
                    </div>
                  </td>

                  <td>
                    {isEditing || select ? (
                      <button
                        disabled
                        className="cursor-not-allowed text-gray-500"
                      >
                        <RiDeleteBin6Fill />
                      </button>
                    ) : (
                      <button
                        className="cursor-pointer"
                        onClick={() => handleDeleteUser(id)}
                      >
                        <RiDeleteBin6Fill />
                      </button>
                    )}
                  </td>

                  <td>
                    {isEditing || select ? (
                      <button
                        disabled
                        className="cursor-not-allowed text-gray-500"
                      >
                        <FiEdit3 />
                      </button>
                    ) : (
                      <button
                        className="cursor-pointer"
                        onClick={() =>
                          handleEdit({
                            id,
                            dob,
                            name,
                            email,
                            gender,
                            hobbies,
                            password,
                            programming,
                            confirmPassword,
                          })
                        }
                      >
                        <FiEdit3 />
                      </button>
                    )}
                  </td>
                </tr>
              );
            }
          )}
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
