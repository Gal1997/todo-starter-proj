import { userService } from "../../services/user.service.js";
import { store } from "../../lib/store.js";

export function login(credentials) {
  return userService
    .login(credentials)
    .then((user) => {
      store.dispatch({ type: "SET_USER", user });

      document.body.style.backgroundColor = user.prefs.bgColor || "white";
      document.body.style.color = user.prefs.color || "black";
    })
    .catch((err) => {
      console.log("user actions -> Cannot login", err);
      throw err;
    });
}

export function signup(credentials) {
  return userService
    .signup(credentials)
    .then((user) => {
      store.dispatch({ type: "SET_USER", user });
    })
    .catch((err) => {
      console.log("user actions -> Cannot signup", err);
      throw err;
    });
}
export function logout() {
  return userService
    .logout()
    .then(() => {
      store.dispatch({ type: "SET_USER", user: null });
    })
    .catch((err) => {
      console.log("user actions -> Cannot logout", err);
      throw err;
    });
}

export function increaseBalanceBy(amount) {
  store.dispatch({ type: "INCREASE_BALANCE_BY", amount });
  const user = store.getState().userModule.loggedInUser;
  return userService.updateUser(user);
}

export function updateUser(user) {
  console.log("user in user service", user);
  store.dispatch({ type: "SET_USER", user });

  document.body.style.backgroundColor = user.prefs.bgColor || "white";
  document.body.style.color = user.prefs.color || "black";

  return userService.updateUser(user);
}
