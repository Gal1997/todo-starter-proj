import { userService } from "../services/user.service.js";
const { createStore } = Redux;

const initialState = {
  loggedInUser: userService.getLoggedinUser(),
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, loggedInUser: action.user };
    default:
      return state;
  }
}
