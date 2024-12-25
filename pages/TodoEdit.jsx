import { todoService } from "../services/todo.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { changeTodo } from "../services/store-actions/todos.actions.js";
import { store } from "../lib/store.js";
import { loadTodos } from "../services/store-actions/todos.actions.js";

const { useSelector, useDispatch } = ReactRedux;
const { useState, useEffect } = React;
const { useNavigate, useParams } = ReactRouterDOM;

export function TodoEdit() {
  const navigate = useNavigate();
  const params = useParams();
  //const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo());
  const isLoading = useSelector((state) => state.todosModule.isLoading);
  const allTheTodos = useSelector((state) => state.todosModule.todos);
  const todo = useSelector((state) =>
    state.todosModule.todos.find((todo) => todo._id === params.todoId)
  );
  const [todoToEdit, setTodoToEdit] = useState(null);

  // Initialize the local state with the selected todo
  // local state will help me to edit the todo without changing the global state !!!
  useEffect(() => {
    if (todo) setTodoToEdit({ ...todo }); // Make a copy to avoid direct mutations
  }, [todo]);

  useEffect(() => {
    if (!allTheTodos || allTheTodos.length === 0) loadTodos();
  }, []);

  /*  function loadTodo() {
      todoService.get(params.todoId)
          .then(setTodoToEdit)
          .catch(err => console.log('err:', err))
    } */

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }

    setTodoToEdit((prevTodoToEdit) => ({ ...prevTodoToEdit, [field]: value }));
  }

  function onSaveTodo(ev) {
    ev.preventDefault();
    changeTodo(todoToEdit);
    /* todoService
      .save(todoToEdit)
      .then((savedTodo) => {
        navigate("/todo");
        showSuccessMsg(`Todo Saved (id: ${savedTodo._id})`);
      })
      .catch((err) => {
        showErrorMsg("Cannot save todo");
        console.log("err:", err);
      });*/
  }

  if (isLoading) return <div>Loading...</div>;
  if (!todoToEdit) return <div>Todo not found</div>;

  const { txt, importance, isDone } = todoToEdit;
  return (
    <section className="todo-edit">
      <form onSubmit={onSaveTodo}>
        <label htmlFor="txt">Text:</label>
        <input
          onChange={handleChange}
          value={txt}
          type="text"
          name="txt"
          id="txt"
        />

        <label htmlFor="importance">Importance:</label>
        <input
          onChange={handleChange}
          value={importance}
          type="number"
          name="importance"
          id="importance"
        />

        <label htmlFor="isDone">isDone:</label>
        <input
          onChange={handleChange}
          value={isDone}
          type="checkbox"
          name="isDone"
          id="isDone"
        />

        <button>Save</button>
      </form>
    </section>
  );
}
