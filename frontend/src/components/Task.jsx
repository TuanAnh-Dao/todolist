import constants from "../utils/constant";
import Moment from "moment";
import {memo} from "react";

 function Task({ handleDelete, task, group }) {
  const getTaskColor = (task) => {
    let defaultClass = "card rounded shadow-sm mt-3 ";
    switch (task.status) {
      case constants.STATUS.DONE:
        return `${defaultClass} border-light text-secondary`;
      case constants.STATUS.TO_DO:
        return `${defaultClass} border-success text-secondary`;
      case constants.STATUS.IN_PROGRESS:
        return `${defaultClass} border-info text-secondary`;
      case constants.STATUS.PENDING:
        return `${defaultClass} border-warning text-secondary`;
    }
  };
  console.log("task");
  return (
    <div className={getTaskColor(task)}>
      <div className="card-body">
        <p className="card-text">{task.taskName}</p>
      </div>
      <div className="card-footer bg-transparent ">
        <i className="fa fa-calendar ml-1" aria-hidden="true">
          <span style={{ fontSize: "12px" }} className="ml-1 font-italic">
            {Moment(task.endDate).format("DD-MM-YYYY")}
          </span>
        </i>
        <i
          className="fa fa-trash-o deleteButton"
          aria-hidden="true"
          onClick={() => {
            handleDelete(task.id, group.groupId);
          }}
        ></i>
      </div>
    </div>
  );
}
export default memo(Task);