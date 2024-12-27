import { userService } from "../services/user.service.js";
const { createStore } = Redux;

const initialState = {
  loggedInUser: userService.getLoggedinUser(),
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, loggedInUser: action.user };
    case "INCREASE_BALANCE_BY":
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          balance: state.loggedInUser.balance + action.amount,
        },
      };
    case "LOG_ACTIVITY":
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          activities: [...state.loggedInUser.activities, action.activity],
        },
      };
    default:
      return state;
  }
}
