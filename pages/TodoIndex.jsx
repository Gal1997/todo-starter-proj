import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { TodoList } from "../cmps/TodoList.jsx";
import { DataTable } from "../cmps/data-table/DataTable.jsx";
import { todoService } from "../services/todo.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { loadTodos } from "../services/store-actions/todos.actions.js";
import { removeTodo } from "../services/store-actions/todos.actions.js";
import { changeTodo } from "../services/store-actions/todos.actions.js";

const { useState, useEffect } = React;
const { Link, useSearchParams } = ReactRouterDOM;
const { useSelector, useDispatch } = ReactRedux;

export function TodoIndex() {
  // const [todos, setTodos] = useState(null);
  const todos = useSelector((state) => state.todosModule.todos);
  const dispatch = useDispatch();

  // Special hook for accessing search-params:
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultFilter = todoService.getFilterFromSearchParams(searchParams);

  const [filterBy, setFilterBy] = useState(defaultFilter);

  useEffect(() => {
    setSearchParams(getNonEmptyValues(filterBy));

    dispatch({ type: "SET_FILTER_BY", filterBy });
    loadTodos();
    /*     todoService
      .query(filterBy)
      .then((todos) => setTodos(todos))
      .catch((err) => {
        console.eror("err:", err);
        showErrorMsg("Cannot load todos");
      }); */
  }, [filterBy]);

  function getNonEmptyValues(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([key, value]) => value !== "")
    );
  }

  function onRemoveTodo(todoId) {
    removeTodo(todoId); // TODO: Make optimistic
    /*     todoService
      .remove(todoId)
      .then(() => {
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo._id !== todoId)
        );
        showSuccessMsg(`Todo removed`);
      })
      .catch((err) => {
        console.log("err:", err);
        showErrorMsg("Cannot remove todo " + todoId);
      }); */
  }

  function onToggleTodo(todo) {
    const newTodo = { ...todo, isDone: !todo.isDone };
    changeTodo(newTodo);
  }

  if (!todos) return <div>Loading...</div>;
  return (
    <section className="todo-index">
      <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
      <div>
        <Link to="/todo/edit" className="btn">
          Add Todo
        </Link>
      </div>
      <h2>Todos List</h2>
      <TodoList
        todos={todos}
        onRemoveTodo={onRemoveTodo}
        onToggleTodo={onToggleTodo}
      />
      <hr />
      <h2>Todos Table</h2>
      <div style={{ width: "60%", margin: "auto" }}>
        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
      </div>
    </section>
  );
}
