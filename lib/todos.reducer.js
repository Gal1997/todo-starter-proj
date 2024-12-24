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
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "SET_FILTER_BY":
      return { ...state, filterBy: action.filterBy };
    default:
      return state;
  }
}
