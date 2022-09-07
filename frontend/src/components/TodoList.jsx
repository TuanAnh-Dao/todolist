import Task from "./Task";
import React, { useEffect, useRef, useState } from "react";
import ApiService from "../utils/ApiService";
import From from "./Form";
import { nanoid } from "nanoid";

function TodoList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      taskName: "For what reason would it be advisable.",
      isDone: false,
      createAt: new Date(),
    },
    {
      id: 2,
      taskName: "For what reason would it be advisable.",
      isDone: true,
      createAt: new Date(),
    },
    {
      id: 3,
      taskName: "For what reason would it be advisable.",
      isDone: false,
      createAt: new Date(),
    },
  ]);

  const deleteTask = (id) => {
    // this.apiService.deleteItem(id);
    
     setTasks(tasks.filter((task) => task.id != id));
  };

  const addTask = (taskName) => {
    const newTask = {
      id: "todo-" + nanoid(),
      taskName: taskName,
      isDone: false,
      createAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const taskList = tasks.map((task) => (
    <Task key={task.id} task={task} deleteTask={deleteTask} />
  ));

  return (
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="container d-flex justify-content-center">
          <div className="col-md-12">
            <div className="card px-3">
              <div className="card-body">
                <h4 className="card-title">Awesome Todo list</h4>

                <From addTask={addTask} />

                <div className="list-wrapper">
                  <ul className="d-flex flex-column-reverse todo-list">
                    {taskList}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
