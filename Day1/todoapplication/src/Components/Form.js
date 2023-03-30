import { useEffect } from "react";

const Form = ({
  input,
  setInput,
  activity,
  setActivity,
  editToDo,
  setEditedToDo,
}) => {
  useEffect(() => {
    if (editToDo) {
      setInput(editToDo.title);
    } else {
      setInput("");
    }
  }, [setInput, editToDo]);

  const updateTodo = (title, id, status) => {
    let date = new Date();
    const newTodo = activity.map((activity) =>
      activity.id === id ? { id, title, status, date } : activity
    );
    setActivity(newTodo);
    setEditedToDo("");
  };

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onFormSubmit = () => {
    if (!editToDo) {
      setActivity([
        ...activity,
        {
          id: activity.length + 1,
          title: input,
          status: "Pending",
          date: new Date(),
        },
      ]);
      setInput("");
    } else {
      updateTodo(input, editToDo.id, editToDo.status);
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="Enter todo"
        className="task-input"
        value={input}
        required
        onChange={onInputChange}
      ></input>
      <button className="button-add" onClick={onFormSubmit}>
        {editToDo ? "EDIT" : "ADD"}
      </button>
    </>
  );
};

export default Form;
