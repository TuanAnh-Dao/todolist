import { getGroupByName } from "../utils/ListAction";
import { LoadingButton } from "@mui/lab";
import constants from "../utils/constant";
import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { useFormik } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";
import { stateActions } from "../redux/actions";
import { bindActionCreators } from "@reduxjs/toolkit";

export default function From() {
  const dispatch = useDispatch;
  const [loading, setLoading] = useState(false);
  const initialValues = {
    task: "",
    deadline: null,
  };
  const validationSchema = Yup.object({
    task: Yup.string()
      .required("Task is required!")
      .min(5, "Task must be at least 6 characters")
      .max(120, "Task must not exceed 20 characters"),
    deadline: Yup.date()
      .transform(parseDateString)
      .nullable()
      .typeError("Invalid date")
      .min(
        dayjs().startOf("D").add(1, "day"),
        "Task must not be less than today!"
      )
      .required("Deadline is required!"),
  });
  const addState = bindActionCreators(stateActions.addState, dispatch);
  function parseDateString(value, originalValue) {
    const parsedDate = dayjs.isDayjs(originalValue)
      ? originalValue
      : dayjs(originalValue, "DD-MM-YYYY");

    return parsedDate?.$d;
  }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      addState(values);
    },
  },(From));

  const taskInput = useRef();
  const handleSubmit = values => {
    dispatch(stateActions.addState(values)).then(()=>{
      setLoading(false);
      formik.resetForm(initialValues);
      taskInput.current.focus();
    })
  }
  
  useEffect(() => {
    taskInput.current.focus();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
      <Grid container>
        <Grid
          display="flex"
          md={6}
          item
          justifyContent="center"
          alignItems="center"
        >
          
        </Grid>
        <Grid
          display="flex"
          item
          alignItems="center"
          justifyContent="center"
          md={3}
        >
         
        </Grid>
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="center"
          md={3}
        >
          <LoadingButton
            loading={loading}
            startIcon={<SaveIcon />}
            type="submit"
            variant="contained"
          >
            Add Task
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
}
