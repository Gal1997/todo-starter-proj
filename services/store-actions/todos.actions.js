import { todoService } from "../../services/todo.service.js";
import { userService } from "../../services/user.service.js";
import { store } from "../../lib/store.js";
import {
  showErrorMsg,
  showSuccessMsg,
} from "../../services/event-bus.service.js";

export function loadTodos() {
  const filterBy = store.getState().todosModule.filterBy;
  store.dispatch({ type: "SET_LOADING", isLoading: true });
  todoService
    .query(filterBy)
    .then((todos) => {
      store.dispatch({ type: "SET_TODOS", todos });
      console.log(todos, "todos from local storage");
    })
    .catch((err) => {
      console.error("err:", err);
      showErrorMsg("Cannot load todos");
      throw err;
    })
    .finally(() => {
      store.dispatch({ type: "SET_LOADING", isLoading: false });
    });
}

export function removeTodo(todoId) {
  const isConfirmed = window.confirm(
    "Are you sure you want to remove this todo?"
  );
  if (!isConfirmed) return;
  store.dispatch({ type: "REMOVE_TODO", todoId });
  todoService.get(todoId).then((todo) => {
    store.dispatch({
      type: "LOG_ACTIVITY",
      activity: `Removed todo '${
        todo.txt
      }' at ${new Date().toLocaleTimeString()}`,
    });

    userService.updateUser(store.getState().userModule.loggedInUser);
  });

  todoService
    .remove(todoId)
    .then(() => {
      showSuccessMsg(`Todo removed`);
    })
    .catch((err) => {
      console.log("err:", err);
      showErrorMsg("Cannot remove todo " + todoId);
    });
}

export function changeTodo(todo) {
  store.dispatch({ type: "CHANGE_TODO", todo: todo });

  todoService
    .get(todo._id)
    .then((todo) => {
      store.dispatch({
        type: "LOG_ACTIVITY",
        activity: `Changed todo '${
          todo.txt
        }' at ${new Date().toLocaleTimeString()}`,
      });

      userService.updateUser(store.getState().userModule.loggedInUser);
    })
    .catch((err) => {
      store.dispatch({
        type: "LOG_ACTIVITY",
        activity: `Created new todo '${
          todo.txt
        }' at ${new Date().toLocaleTimeString()}`,
      });

      userService.updateUser(store.getState().userModule.loggedInUser);
    });

  todoService
    .save(todo)
    .then((savedTodo) => {
      showSuccessMsg(`${todo.txt} changed successfully 😃`);
    })
    .catch((err) => {
      console.log("err:", err);
      showErrorMsg("Cannot toggle todo " + todoId);
    });
}
