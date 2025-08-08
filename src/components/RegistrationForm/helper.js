export const initialState = {
  dob: "",
  dod: "",
  name: "",
  email: "",
  gender: "Male",
  hobbies: "",
  password: "",
  programming: "",
  confirmPassword: "",
};

export const getUserList = (key) => {
  if (!key) return;

  const userList = localStorage.getItem(key);

  if (userList?.length) {
    return JSON.parse(userList);
  }

  return [];
};

export const getNameError = (value) => {
  return !value.trim() ? "Name is required" : "";
};

export const getLanguageError = (value) => {
  return !value ? "Select at least one language" : "";
};

// export const getGenderError = (value) => {
//   return !value ? "Gender is required" : "";
// };

export const getEmailError = (value) => { 
  if (!value) {
    return "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    return "Invalid email address";
  }
  return "";
};

export const getPasswordError = (value) => {
  if (!value.trim()) {
    return "Password is required";
  } else if (value.length < 8) {
    return "Password must be at least 8 characters long";
  }
  return "";
};

export const getConfirmPasswordError = (confirmPassword, password) => {
  if (!confirmPassword) {
    return "Confirm password is required";
  } else if (confirmPassword !== password) {
    return "Confirm passwords do not match";
  }
  return "";
};

export const getDOBError = (value) => {
  return !value ? "Date of birth is required" : "";
};

export const getDODError = (dob, dod) => {
  return dod < dob ? "Invalid Date of death" : "";
};

export const getHobbiesError = (value) => {
  return !value || value.trim().length === 0 ? "Select at least one hobby" : "";
};

export const updateUserList = (list) => {
  localStorage.setItem("users", JSON.stringify(list));
};

export const hobbiesList = [
  { id: 1, name: "Reading" },
  { id: 2, name: "Travelling" },
  { id: 3, name: "Coding" },
  { id: 4, name: "Playing" },
];

export const validate = (user, setUserError) => {
  const errors = {
    name: getNameError(user.name),
    email: getEmailError(user.email),
    // gender: getGenderError(user.gender),
    dob: getDOBError(user.dob),
    dod: getDODError(user.dod),
    programming: getLanguageError(user.programming),
    password: getPasswordError(user.password),
    confirmPassword: getConfirmPasswordError(
      user.confirmPassword,
      user.password
    ),
    hobbies: getHobbiesError(user.hobbies),
  };

  setUserError(errors);

  return Object.values(errors).some((error) => error !== "");
};

export const options = ["HTML", "CSS", "JavaScript", "React", "Redux"];

export const getAge = (birth, death) => {
  const birthDate = new Date(birth);
  const endDate = death ? new Date(death) : new Date();

  let years = endDate.getFullYear() - birthDate.getFullYear();
  let months = endDate.getMonth() - birthDate.getMonth();
  let days = endDate.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const lastDayOfPrevMonth = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      0
    ).getDate();
    days += lastDayOfPrevMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (days === 0) return `${years} years, ${months} months,`;

  if (months === 0) return `${years} years, ${days} days`;

  if (years === 0) return `${months} months, ${days} days`;

  return `${years} years, ${months} months, ${days} days`;
};
