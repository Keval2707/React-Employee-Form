import { getAge } from "../RegistrationForm/helper";
import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";

// UserRow.jsx
export const UserRow = ({
  user,
  select,
  checkedItems,
  handleSelect,
  handleEdit,
  handleDelete,
  isEditing,
  activeTab,
  handleActiveUser,
}) => {
  const {
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
    // confirmPassword,
  } = user;

  return (
    <tr
      className={`${
        !active && activeTab !== "InactiveUsers" ? "line-through" : ""
      }`}
    >
      {select && (
        <td>
          <input
            id={id}
            type="checkbox"
            checked={checkedItems.some((i) => i.id === id)}
            onChange={(event) => handleSelect(event, user)}
          />
        </td>
      )}
      <td>{id}</td>
      <td onClick={() => handleActiveUser(id)}>{name}</td>
      <td>{email}</td>
      <td>{gender}</td>
      <td>{dob}</td>
      <td>{dod || "-----"}</td>
      <td>{getAge(dob, dod)}</td>
      <td>{programming}</td>
      <td>{password}</td>
      <td>{hobbies}</td>
      <td>
        <button
          disabled={isEditing || select}
          onClick={() => !isEditing && !select && handleDelete(id)}
        >
          <RiDeleteBin6Fill />
        </button>
      </td>
      <td>
        <button
          disabled={isEditing || select}
          onClick={() => !isEditing && !select && handleEdit(user)}
        >
          <FiEdit3 />
        </button>
      </td>
    </tr>
  );
};
