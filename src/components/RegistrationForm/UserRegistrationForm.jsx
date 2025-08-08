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
  // getGenderError,
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
          type="text"
          id="name"
          name="name"
          placeholder="Enter your username"
          autoComplete="off"
          value={user.name}
          onChange={handleChange}
        />

        {getErrorMsg("name")}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email: </label>

        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          autoComplete="off"
          value={user.email}
          onChange={handleChange}
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
                id={gender.toLowerCase()}
                value={gender}
                checked={user.gender === gender}
                onChange={handleChange}
              />
              <label htmlFor={gender.toLowerCase()} className="text-sm">
                {gender}
              </label>
            </div>
          ))}
        </div>

        {/* {getErrorMsg("gender")} */}
      </div>

      <div className="form-group">
        <label htmlFor="dob">Date of Birth: </label>

        <input
          type="date"
          id="dob"
          name="dob"
          autoComplete="off"
          className="text-white"
          value={user.dob}
          max={user.dod}
          onChange={handleChange}
        />

        {getErrorMsg("dob")}
      </div>

      <div className="form-group">
        <label htmlFor="dod">Date of Death: </label>

        <input
          type="date"
          id="dod"
          name="dod"
          autoComplete="off"
          className="text-white"
          value={user.dod}
          min={user.dob}
          onChange={handleChange}
        />

        {getErrorMsg("dod")}
      </div>

      <div className="form-group">
        <label htmlFor="programming">
          Select your favorite programming language:
        </label>

        <select
          name="programming"
          id="programming"
          className="dropdown"
          value={user.programming}
          onChange={handleDropdownChange}
          // multiple={true}
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
            type={showPass.password ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
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
            type={showPass.confirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="confirm password"
            value={user.confirmPassword}
            onChange={handleChange}
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
                  type="checkbox"
                  name={name}
                  id={`hobby-${id}`}
                  value={name}
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
