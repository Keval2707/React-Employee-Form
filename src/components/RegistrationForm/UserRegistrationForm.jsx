import { IoEye, IoEyeOff } from "react-icons/io5";
import { MdOutlineSaveAs } from "react-icons/md";
import { useEffect, useState } from "react";
import {
  options,
  validate,
  getDOBError,
  hobbiesList,
  initialState,
  getNameError,
  getEmailError,
  updateUserList,
  getHobbiesError,
  getLanguageError,
  getPasswordError,
  getConfirmPasswordError,
} from "./helper";

export function UserRegistrationForm({
  user,
  setUser,
  userList,
  isEditing,
  setUserList,
  setIsEditing,
}) {
  const [userError, setUserError] = useState(initialState);
  const [isChecked, setIsChecked] = useState(
    new Array(hobbiesList.length).fill(false)
  );

  const [showPass, setShowPass] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleCheckboxChange = (e, index) => {
    const updatedChange = { ...isChecked };
    updatedChange[index] = e.target.checked;
    setIsChecked(updatedChange);

    const selectedHobbies = hobbiesList
      .filter((_, idx) => updatedChange[idx])
      .map((hob) => hob.name);

    const hobbiesString = selectedHobbies.join(", ");
    setUser((prev) => ({ ...prev, hobbies: hobbiesString }));

    const error = getHobbiesError(hobbiesString);
    setUserError((prev) => ({ ...prev, hobbies: error }));
  };

  const handleDropdownChange = (e) => {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    const languageString = selectedOptions.join(", ");
    setUser((prev) => ({ ...prev, programming: languageString }));

    const error = getLanguageError(languageString);
    setUserError((prev) => ({ ...prev, programming: error }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const hasErrors = validate(user, setUserError);

    if (!hasErrors) {
      if (isEditing) {
        const updatedList = userList.map((u) => (u.id === user.id ? user : u));
        setIsEditing(false);
        setUserList(updatedList);
        updateUserList(updatedList);
      } else {
        const updatedUser = [
          ...userList,
          { ...user, id: Math.random().toString().substring(2, 6) },
        ];
        setUserList(updatedUser);
        updateUserList(updatedUser);
      }
      setUser(initialState);
      setUserError(initialState);
      setIsChecked(new Array(hobbiesList.length).fill(false));
    }
  };

  const getErrorMsg = (fieldName) => {
    return userError[fieldName] ? (
      <p className="error">{userError[fieldName]}</p>
    ) : (
      ""
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));

    let error = "";

    if (name === "name") {
      error = getNameError(value);
    } else if (name === "email") {
      error = getEmailError(value);
    } else if (name === "programming") {
      error = getLanguageError(value);
    } else if (name === "dob") {
      error = getDOBError(value);
    } else if (name === "password") {
      error = getPasswordError(value);
    } else if (name === "confirmPassword") {
      error = getConfirmPasswordError(value, user.password);
    } else if (name === "hobbies") {
      error = getHobbiesError(value);
    }

    setUserError((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  useEffect(() => {
    if (isEditing && user.hobbies) {
      const userHobbiesArray = user.hobbies.split(", ").filter((h) => h.trim());
      const newChecked = hobbiesList.map((hobby) =>
        userHobbiesArray.includes(hobby.name)
      );
      setIsChecked(newChecked);
    } else if (!isEditing && user.hobbies === "") {
      setIsChecked(new Array(hobbiesList.length).fill(false));
    }
  }, [isEditing, user.hobbies]);

  const onClickVisible = (type) => {
    setShowPass((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  console.log("userList", userList);

  return (
    <form className="form-body" onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label htmlFor="name">Username: </label>

        <input
          id="name"
          type="text"
          name="name"
          value={user.name}
          autoComplete="off"
          onChange={handleChange}
          placeholder="Enter your username"
        />

        {getErrorMsg("name")}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email: </label>

        <input
          id="email"
          type="email"
          name="email"
          autoComplete="off"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        {getErrorMsg("email")}
      </div>

      <div className="radio-group pb-5">
        <p>Select your Gender</p>

        <div className="flex gap-4 items-center pt-3">
          {["Male", "Female", "Others"].map((gender) => (
            <div key={gender} className="flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value={gender}
                onChange={handleChange}
                id={gender.toLowerCase()}
                checked={user.gender === gender}
              />
              <label htmlFor={gender.toLowerCase()} className="text-sm">
                {gender}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="dob">Date of Birth: </label>

        <input
          id="dob"
          name="dob"
          type="date"
          max={user.dod}
          value={user.dob}
          autoComplete="off"
          onChange={handleChange}
          className="text-white"
        />

        {getErrorMsg("dob")}
      </div>

      <div className="form-group">
        <label htmlFor="dod">Date of Death: </label>

        <input
          id="dod"
          name="dod"
          type="date"
          min={user.dob}
          value={user.dod}
          autoComplete="off"
          onChange={handleChange}
          className="text-white"
        />

        {getErrorMsg("dod")}
      </div>

      <div className="form-group">
        <label htmlFor="programming">
          Select your favorite programming language:
        </label>

        <select
          id="programming"
          name="programming"
          className="dropdown"
          value={user.programming}
          onChange={handleDropdownChange}
        >
          <option>Please choose one option</option>
          {options.map((option, index) => {
            return (
              <option className="dropdown" key={index}>
                {option}
              </option>
            );
          })}
        </select>

        {getErrorMsg("programming")}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password: </label>

        <div className="flex gap-3">
          <input
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your password"
            type={showPass.password ? "text" : "password"}
          />

          <button
            type="button"
            onClick={() => onClickVisible("password")}
            className="cursor-pointer"
          >
            {showPass.password ? <IoEye /> : <IoEyeOff />}
          </button>
        </div>

        {getErrorMsg("password")}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password: </label>

        <div className="flex gap-3">
          <input
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
            value={user.confirmPassword}
            placeholder="confirm password"
            type={showPass.confirmPassword ? "text" : "password"}
          />

          <button
            type="button"
            onClick={() => onClickVisible("confirmPassword")}
            className="cursor-pointer"
          >
            {showPass.confirmPassword ? <IoEye /> : <IoEyeOff />}
          </button>
        </div>

        {getErrorMsg("confirmPassword")}
      </div>

      <div className="form-group pb-5">
        <p>Hobbies</p>

        <div className="flex pt-3 ml-4">
          <ul>
            {hobbiesList.map(({ name, id }, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  name={name}
                  value={name}
                  type="checkbox"
                  id={`hobby-${id}`}
                  checked={isChecked[index]}
                  className="cursor-pointer"
                  onChange={(e) => handleCheckboxChange(e, index)}
                />
                <label htmlFor={`hobby-${id}`}>{name}</label>
              </div>
            ))}
          </ul>
        </div>

        {getErrorMsg("hobbies")}
      </div>

      <button
        type="submit"
        className="btn btn-primary flex justify-center gap-2 items-center"
      >
        {isEditing ? <MdOutlineSaveAs className="" /> : ""}
        {isEditing ? "Save Changes" : "Create Account"}
      </button>
    </form>
  );
}
