import Form from "./Form";
import React, { useState, useEffect } from "react";
import DragDrop from "./DragDrop";


function TodoList() {
  return (<div className="page-content page-container" id="page-content">
    <div className="padding">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 mb-4">
            <Form />
          </div>
        </div>

        <div className="row mt-3 ">
          <DragDrop />
        </div>
      </div>
    </div>
  </div>);

}


export default TodoList;
