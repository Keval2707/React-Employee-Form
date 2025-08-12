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

export const getHobbiesError = (value) => {
  return !value || value.trim().length === 0 ? "Select at least one hobby" : "";
};

export const updateUserList = (list) => {
  localStorage.setItem("users", JSON.stringify(list));
};

export const hobbiesList = [
  { id: 1, name: "Coding" },
  { id: 2, name: "Reading" },
  { id: 3, name: "Playing" },
  { id: 4, name: "Travelling" },
];

const rules = {
  dob: getDOBError,
  name: getNameError,
  email: getEmailError,
  hobbies: getHobbiesError,
  password: getPasswordError,
  programming: getLanguageError,
  confirmPassword: (value, user) =>
    getConfirmPasswordError(value, user.password),
};

export const validate = (user, setUserError) => {
  const errors = {};
  for (let key in rules) {
    errors[key] = rules[key](user[key], user);
  }
  setUserError(errors);
  return Object.values(errors).some((e) => e);
};

export const options = ["HTML", "CSS", "JavaScript", "React", "Redux"];

export const getAge = (birth, death) => {
  const birthDate = new Date(birth);
  const endDate = death ? new Date(death) : new Date();

  let days = endDate.getDate() - birthDate.getDate();
  let months = endDate.getMonth() - birthDate.getMonth();
  let years = endDate.getFullYear() - birthDate.getFullYear();

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

  if (months === 0) return `${years} years, ${days} days`;
  
  if (years === 0) return `${months} months, ${days} days`;
  
  if (days === 0) return `${years} years, ${months} months,`;

  return `${years} years, ${months} months, ${days} days`;
};

export const getFromStorage = (key, defaultValue = []) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

export const setToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const filterUsersByTab = (list, tab) => {
  if (tab === "ActiveUsers") return list.filter((u) => u.active);
  if (tab === "InactiveUsers") return list.filter((u) => !u.active);
  return list;
};
