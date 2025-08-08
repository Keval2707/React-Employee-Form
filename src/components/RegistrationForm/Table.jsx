import { updateUserList } from "./helper";

export const Table = ({
  id,
  dob,
  name,
  email,
  gender,
  hobbies,
  setUser,
  password,
  userList,
  isEditing,
  setUserList,
  programming,
  setIsEditing,
  confirmPassword,
}) => {
  const handleEdit = (userData) => {
    setUser(userData);
    setIsEditing(true);
  };

  const handleActiveUser = (id) => {
    const ActiveUser = userList.find((user) => user.id === id);
    console.log(ActiveUser);
    const updatedList = userList.map((user) => {
      if (user.id === id) {
        return { ...user, active: !user.active };
      }
      return user;
    });
    setUserList(updatedList);
    updateUserList(updatedList);
  };

  const handleDeleteUser = (id) => {
    const updatedList = userList.filter((user) => user.id !== id);
    setUserList(updatedList);
    updateUserList(updatedList);
  };

  return (
    <>
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
        {isEditing ? (
          <button disabled className="cursor-not-allowed text-gray-500">
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
        {isEditing ? (
          <button disabled className="cursor-not-allowed text-gray-500">
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
    </>
  );
};
