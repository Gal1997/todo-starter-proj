import { todosReducer } from "./todos.reducer.js";
import { userReducer } from "./user.reducer.js";

const { createStore, combineReducers } = Redux;

const rootReducer = combineReducers({
  todosModule: todosReducer,
  userModule: userReducer,
});

export const store = createStore(rootReducer);
