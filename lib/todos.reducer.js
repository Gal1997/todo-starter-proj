const { createStore } = Redux;

const initialState = {
  todos: [],
  isLoading: false,
  filterBy: [],
};

export function todosReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.todos };
    case "REMOVE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.todoId),
      };
    case "CHANGE_TODO": {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === action.todo._id) return action.todo;
          return todo;
        }),
      };
    }
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "SET_FILTER_BY":
      return { ...state, filterBy: action.filterBy };
    default:
      return state;
  }
}
