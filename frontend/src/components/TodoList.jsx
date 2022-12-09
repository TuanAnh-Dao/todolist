import Form from "./Form";
import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import constants from "../utils/constant";
import DragDrop from "./DragDrop";
import ApiService from "../utils/ApiService";
import Configuration from "../Configuration";

function TodoList() {
  let api = ApiService(Configuration.TODOLIST_URL);
      
  const [state, setState] = useState([]);
  // const [state, setState] = useState([
  //   {
  //     groupName: constants.STATUS.PENDING,
  //     groupId: v4(),
  //     tasks: [
  //       {
  //         id: v4(),
  //         taskName: "Pending 1",
  //         status: constants.STATUS.PENDING,
  //         endDate: new Date(),
  //       },
  //       {
  //         id: v4(),
  //         taskName: "Pending 2",
  //         status: constants.STATUS.PENDING,
  //         endDate: new Date(),
  //       },
  //       {
  //         id: v4(),
  //         taskName: "Pending 3",
  //         status: constants.STATUS.PENDING,
  //         endDate: new Date(),
  //       },
  //     ],
  //   },
  //   {
  //     groupName: constants.STATUS.TO_DO,
  //     groupId: v4(),
  //     tasks: [
  //       {
  //         id: v4(),
  //         taskName: "To do 1",
  //         status: constants.STATUS.TO_DO,
  //         endDate: new Date(),
  //       },
  //       {
  //         id: v4(),
  //         taskName: "To do 2",
  //         status: constants.STATUS.TO_DO,
  //         endDate: new Date(),
  //       },
  //       {
  //         id: v4(),
  //         taskName: "To do 3",
  //         status: constants.STATUS.TO_DO,
  //         endDate: new Date(),
  //       },
  //     ],
  //   },
  //   {
  //     groupName: constants.STATUS.IN_PROGRESS,
  //     groupId: v4(),
  //     tasks: [
  //       {
  //         id: v4(),
  //         taskName: "In progress 1",
  //         status: constants.STATUS.IN_PROGRESS,
  //         endDate: new Date(),
  //       },
  //       {
  //         id: v4(),
  //         taskName: "In progress 2",
  //         status: constants.STATUS.IN_PROGRESS,
  //         endDate: new Date(),
  //       },
  //       {
  //         id: v4(),
  //         taskName: "In progress 3",
  //         status: constants.STATUS.IN_PROGRESS,
  //         endDate: new Date(),
  //       },
  //     ],
  //   },
  //   {
  //     groupName: constants.STATUS.DONE,
  //     groupId: v4(),
  //     tasks: [
  //       {
  //         id: v4(),
  //         taskName: "Done 1",
  //         status: constants.STATUS.DONE,
  //         endDate: new Date(),
  //       },
  //       {
  //         id: v4(),
  //         taskName: "Done 2",
  //         status: constants.STATUS.DONE,
  //         endDate: new Date(),
  //       },
  //       {
  //         id: v4(),
  //         taskName: "Done 3",
  //         status: constants.STATUS.DONE,
  //         endDate: new Date(),
  //       },
  //     ],
  //   },
  // ]);
  useEffect(() => {
    const getData = async()=>{
      const data = await api.getData();
      setState(data);
    }
    getData();
  },[]);
  return (
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 mb-4">
              <Form state={state} setState={setState} />
            </div>
          </div>

          <div className="row mt-3 ">
            <DragDrop state={state} setState={setState} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
