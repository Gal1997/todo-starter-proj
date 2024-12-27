const { useState, useEffect } = React;
const { Link, NavLink } = ReactRouterDOM;
const { useNavigate } = ReactRouter;
const { useSelector, useDispatch } = ReactRedux;

import { userService } from "../services/user.service.js";
import { UserMsg } from "./UserMsg.jsx";
import { LoginSignup } from "./LoginSignup.jsx";
import { showErrorMsg } from "../services/event-bus.service.js";
import { logout } from "../services/store-actions/user.actions.js";
import { loadTodos } from "../services/store-actions/todos.actions.js";

export function AppHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [user, setUser] = useState(userService.getLoggedinUser());
  const user = useSelector((storeState) => storeState.userModule.loggedInUser);
  console.log("Currently logged in user : ", user);

  const totalTodos = useSelector(
    (storeState) => storeState.todosModule.todos.length
  );

  const doneTodos = useSelector(
    (storeState) =>
      storeState.todosModule.todos.filter((todo) => todo.isDone).length
  );

  useEffect(() => {
    if (!totalTodos || totalTodos.length === 0) loadTodos();
  }, []);

  function onLogout() {
    logout().catch((err) => {
      showErrorMsg("OOPs try again");
    });
  }

  function ProgressBar({ current, total }) {
    // Calculate the percentage progress
    const progress = Math.min((current / total) * 100, 100); // Ensure it doesn't exceed 100%
    if (!progress && progress != 0) return <p>Loading...</p>;

    return (
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          <div className="progress-text">{progress.toFixed(1)}%</div>
        </div>
      </div>
    );
  }

  //   function onSetUser(user) {
  //     dispatch({ type: "SET_USER", user: user }); // TODO: change to action

  //   }
  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1 style={{ fontSize: "30px" }}>Gal's Todo App</h1>

        <div
          style={{
            width: "20%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "0.3rem",
          }}
        >
          {user && <h1>Progress Bar</h1>}
          {user && <ProgressBar current={doneTodos} total={totalTodos} />}
        </div>
        {user ? (
          <section>
            <div className="user-info">
              <div>
                <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                <button onClick={onLogout}>Logout</button>
              </div>
              <div>
                <p>Balance: {user.balance.toLocaleString()}$</p>
              </div>
            </div>
          </section>
        ) : (
          <section>
            <LoginSignup />
          </section>
        )}
        <nav className="app-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/todo">Todos</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>
      </section>
      <UserMsg />
    </header>
  );
}
