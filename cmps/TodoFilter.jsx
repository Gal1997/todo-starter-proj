const { useState, useEffect } = React;

export function TodoFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    // Notify parent
    onSetFilterBy(filterByToEdit);
  }, [filterByToEdit]);

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
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  function handleSelectChange(event) {
    const value = event.target.value;
    const isDone = value === "done" ? true : value === "undone" ? false : "";
    setSelectedOption(value);
    if (isDone !== "")
      setFilterByToEdit((prevFilter) => ({
        ...prevFilter,
        ["isDone"]: isDone,
      }));
    else {
      const { isDone, ...newFilter } = { ...filterByToEdit };
      setFilterByToEdit(newFilter);
    }
  }

  // Optional support for LAZY Filtering with a button
  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilterBy(filterByToEdit);
  }

  const { txt, importance } = filterByToEdit;
  return (
    <section className="todo-filter">
      <h2>Filter Todos</h2>
      <form onSubmit={onSubmitFilter}>
        <input
          value={txt}
          onChange={handleChange}
          type="search"
          placeholder="By Txt"
          id="txt"
          name="txt"
        />
        <div>
          <label htmlFor="importance">Importance: </label>
          <input
            value={importance}
            onChange={handleChange}
            type="number"
            placeholder="By Importance"
            id="importance"
            name="importance"
          />
        </div>
        <label htmlFor="mySelect">Display:</label>
        <select
          id="mySelect"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="all">Show all</option>
          <option value="done">Show done</option>
          <option value="undone">Show undone</option>
        </select>
        <button hidden>Set Filter</button>
      </form>
    </section>
  );
}
