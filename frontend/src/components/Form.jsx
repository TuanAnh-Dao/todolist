import React, { useEffect, useRef, useState } from "react";

export default function From(props) {
  const [taskName, setTaskName] = useState("");

  function handleChange(e) {
    setTaskName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!taskName.trim()) {
      return;
    }
    props.addTask(taskName);
    setTaskName("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="add-items d-flex">
        <input
          id="newTask"
          type="text"
          className="form-control todo-list-input"
          placeholder="What do you need to do today?"
          onChange={handleChange}
          value={taskName}
        />
        <button
          type="submit"
          className="add btn btn-primary font-weight-bold todo-list-add-btn"
        >
          Add
        </button>
      </div>
    </form>
  );
}
