const { useState } = React;
const { Link, NavLink } = ReactRouterDOM;
const { useNavigate } = ReactRouter;
const { useSelector, useDispatch } = ReactRedux;

import { userService } from "../services/user.service.js";
import { UserMsg } from "./UserMsg.jsx";
import { LoginSignup } from "./LoginSignup.jsx";
import { showErrorMsg } from "../services/event-bus.service.js";
import { logout } from "../services/store-actions/user.actions.js";

export function AppHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [user, setUser] = useState(userService.getLoggedinUser());
  const user = useSelector((storeState) => storeState.userModule.loggedInUser);
  console.log("user", user);

  const totalTodos = useSelector(
    (storeState) => storeState.todosModule.todos.length
  );

  const doneTodos = useSelector(
    (storeState) =>
      storeState.todosModule.todos.filter((todo) => todo.isDone).length
  );

  function onLogout() {
    logout().catch((err) => {
      showErrorMsg("OOPs try again");
    });
  }

  function ProgressBar({ current, total }) {
    // Calculate the percentage progress
    const progress = Math.min((current / total) * 100, 100); // Ensure it doesn't exceed 100%

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
        <h1>React Todo App</h1>

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
          <h1>Progress Bar</h1>
          <ProgressBar current={doneTodos} total={totalTodos} />
        </div>
        {user ? (
          <section>
            <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
            <button onClick={onLogout}>Logout</button>
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
