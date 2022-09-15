import { getGroupByName } from "../utils/ListAction";
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import constants from "../utils/constant";

export default function From({ state, taskInputRef, setState }) {
  const [task, setTask] = useState("");

  function handleChange(e) {
    setTask(e.target.value);
  }
  function addTask(e) {
    e.preventDefault();
    let { index, group } = getGroupByName(state, constants.STATUS.TO_DO);
    let newTask = {
      id: v4(),
      taskName: task,
      status: constants.STATUS.TO_DO,
      endDate: new Date(),
    };
    let newState = [...state];
    group.tasks.unshift(newTask);
    newState[index] = group;
    setState(newState);
    setTask("");
    taskInputRef.current.focus();
  }
  useEffect(() => {
    taskInputRef.current.focus();
  },[]);
  console.log("Form");
  return (
    <form
      className="input-group"
      onSubmit={addTask}
      style={{ width: "80%", margin: "0 auto" }}
    >
      <input
        id="addTask"
        ref={taskInputRef}
        type="text"
        className="form-control inputCustom"
        placeholder="Add some tasks..."
        aria-label="Add some tasks..."
        aria-describedby="button-addon2"
        autoComplete="off"
        onChange={handleChange}
        value={task}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary buttonCustom"
          type="submit"
          id="button-addon2"
        >
          Add
        </button>
      </div>
    </form>
  );
}
