import { ToggleButton } from "../cmps/ToggleButton.jsx";

const { useSelector, useDispatch } = ReactRedux;
const { useState } = React;

export function Home() {
  const [isOn, setIsOn] = useState(false);
  return (
    <section className="home">
      <h1>Todo's R Us!</h1>
      <ToggleButton val={isOn} setVal={setIsOn} />
      {isOn && <img src="../assets/img/todo.png" alt="" />}
    </section>
  );
}
