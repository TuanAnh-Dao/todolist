import Form from "./Form";
import React, { useState, useEffect } from "react";
import DragDrop from "./DragDrop";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGroups,
  addNewTask,
  resetList,
  saveDB,
  setModified,
} from "../redux/features/groupSlice";
import LoadingOverlay from "react-loading-overlay";
import { HashLoader } from "react-spinners";
import constants from "../utils/constant";
import { v4 } from "uuid";
import { compare } from "../utils/ListAction";
import Button from "@mui/material/Button";
import { CloudUploadOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { ResetTvSharp } from "@mui/icons-material";
import { Transition } from "react-transition-group";
const transitions = {
  entering: {
    display: "block",
  },
  entered: {
    opacity: 1,
    display: "block",
  },
  exiting: {
    opacity: 0,
    display: "block",
  },
  exited: {
    opacity: "0",
    display: "none",
  },
};
function TodoList() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.groups.current);
  const defaultState = useSelector((state) => state.groups.default);
  const loading = useSelector((state) => state.groups.loading);
  const isChanged = useSelector((state) => state.groups.isChanged);

  const handleSubmit = (values, actions) => {
    const defaultStatus = { status: constants.STATUS.TO_DO };
    const data = { ...values, ...defaultStatus, id: v4() };
    dispatch(addNewTask(data));
    actions.resetForm();
  };

  useEffect(() => {
    dispatch(fetchGroups());
  }, []);
  useEffect(() => {
    dispatch(setModified(compare(state, defaultState)));
  }, [state]);

  const handleSaveDB = () => {
    dispatch(saveDB(state));
  };
  const handleReset = () => {
    dispatch(resetList());
  };

  return (
    <LoadingOverlay
      active={loading}
      fadeSpeed={1000}
      spinner={<HashLoader size={150} color={"#318d7a"} />}
    >
      <div className="wrapper">
        <Grid
          container
          alignItems="center"
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          
        >
          <Grid item  xs={12}>
            {state && state.length > 0 && (
              <Form onSubmit={handleSubmit} isChanged={isChanged} />
            )}
          </Grid>
          <Grid item className="defaultHeight" alignItems="center" display="flex" xs={12}>
            <Transition in={isChanged} timeout={200}>
              {(state) => (
                <Grid
                  container
                  style={{
                    transition: `opacity 200ms ease-in-out`,
                    opacity: 0,
                    display: "none",
                    ...transitions[state],
                  }}
                >
                  
                  <Grid
                    item
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                    xs={12}
                  >
                    <Button
                      className="m-2"
                      color="secondary"
                      variant="contained"
                      onClick={handleSaveDB}
                      startIcon={<CloudUploadOutlined />}
                    >
                      Save DB
                    </Button>
                    <Button
                      className="m-2"
                      color="error"
                      variant="outlined"
                      onClick={handleReset}
                      startIcon={<ResetTvSharp />}
                    >
                      Reset
                    </Button>
                  </Grid>
                 
                </Grid>
              )}
            </Transition>
          </Grid>

          <DragDrop />
        </Grid>
      </div>
    </LoadingOverlay>
  );
}

export default TodoList;
