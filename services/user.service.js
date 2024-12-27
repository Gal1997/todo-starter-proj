import { storageService } from "./async-storage.service.js";

export const userService = {
  getLoggedinUser,
  login,
  logout,
  signup,
  getById,
  query,
  getEmptyCredentials,
  updateUser,
};
const STORAGE_KEY_LOGGEDIN = "user";
const STORAGE_KEY = "userDB";

function query() {
  return storageService.query(STORAGE_KEY);
}

function getById(userId) {
  return storageService.get(STORAGE_KEY, userId);
}

function login({ username, password }) {
  return storageService.query(STORAGE_KEY).then((users) => {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      _setLoggedinUser(user);
      return user;
    } else return Promise.reject("Invalid login");
  });
}

function signup({ username, password, fullname }) {
  const user = { username, password, fullname };
  user.createdAt = user.updatedAt = Date.now();
  user.balance = 10000;
  user.activities = [];
  return storageService.post(STORAGE_KEY, user).then((savedUser) => {
    _setLoggedinUser(savedUser);
    return savedUser;
  });
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN);
  return Promise.resolve();
}

function updateUser(user) {
  return storageService.put(STORAGE_KEY, user);
}

function getLoggedinUser() {
  let loggedInUserID;
  try {
    loggedInUserID = JSON.parse(
      sessionStorage.getItem(STORAGE_KEY_LOGGEDIN)
    )._id;
  } catch (err) {
    return null;
  }

  if (!loggedInUserID) return null;

  const allUsers = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return allUsers.find((user) => user._id === loggedInUserID);
}

function _setLoggedinUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
  };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave));

  return userToSave;
}

function getEmptyCredentials() {
  return {
    fullname: "",
    username: "",
    password: "",
    balance: 0,
  };
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }
