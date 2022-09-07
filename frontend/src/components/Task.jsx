
export default function Task(props) {
  
    return (
      <li className={props.task.isDone ? "completed" : ""}>
        <div className="form-check">
          <label className="form-check-label">
            <input className="checkbox" type="checkbox" checked={props.task.isDone ? "checked" : ""} />{" "}
            {props.task.taskName}
            <i className="input-helper"></i>
          </label>
        </div>
        <i onClick={()=>props.deleteTask(props.task.id)} className="remove mdi mdi-close-circle-outline"></i>
      </li>
    );
  
}
