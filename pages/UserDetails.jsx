const { useSelector, useDispatch } = ReactRedux;
const { useState } = React;
import { updateUser } from "../services/store-actions/user.actions.js";

export function UserDetails() {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");

  const handleSave = (e) => {
    e.preventDefault();
    const newUser = {
      ...user,
      fullname: name,
      prefs: { color: color, bgColor: bgColor },
    };
    updateUser(newUser);
  };

  return (
    <div>
      <h1>User Details</h1>
      {!user && <h2>Please login to see more details</h2>}
      {user && (
        <form style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
          <label>
            Name:
            <input
              placeholder={user.fullname}
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ margin: "0 10px", padding: "5px" }}
            />
          </label>

          <label>
            Color:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ margin: "0 10px", padding: "2px", width: "50px" }}
            />
          </label>

          <label>
            BG Color:
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              style={{ margin: "0 10px", padding: "2px", width: "50px" }}
            />
          </label>

          <button
            onClick={handleSave}
            style={{
              marginLeft: "10px",
              padding: "5px 15px",
              backgroundColor: "#d4f0d4",
              border: "1px solid #ccc",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </form>
      )}

      {user &&
        user.activities.map((activity, index) => <p key={index}>{activity}</p>)}
    </div>
  );
}
