import Form from "./Form";
import React, { useState, useEffect } from "react";
import DragDrop from "./DragDrop";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "../redux/features/groupSlice";
import LoadingOverlay from "react-loading-overlay";
import { HashLoader } from "react-spinners";

function TodoList() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.groups.current);
  const loading = useSelector((state) => state.groups.loading);
  console.log(state)
  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  return (
    <LoadingOverlay active={loading} fadeSpeed={1000} spinner={<HashLoader size={150} color={"#318d7a"}/>} >
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 mb-4">
                {state&& state.length >0 &&<Form />}
              </div>
            </div>
            <div className="row mt-3 ">
              <DragDrop state={state} />
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
}

export default TodoList;
