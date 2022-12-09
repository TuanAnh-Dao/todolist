import { getGroupByName } from "../utils/ListAction";
import { LoadingButton } from "@mui/lab";
import constants from "../utils/constant";
import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { TextField, Button } from "@mui/material";
import * as Yup from "yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { v4 } from "uuid";
import { useFormik } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import SaveIcon from "@mui/icons-material/Save";
export default function From({ state, setState }) {
  const [loading, setLoading] = useState(false);
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
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
      addTask(values);
    },
  });

  const taskInput = useRef();

  async function addTask(data) {
    
    let { index, group } = getGroupByName(state, constants.STATUS.TO_DO);
    let newTask = {
      id: v4(),
      taskName: data.task,
      status: constants.STATUS.TO_DO,
      endDate: data.deadline?.$d,
    };
    let newState = [...state];
    group.tasks.unshift(newTask);
    newState[index] = group;
    await sleep(2000);
    setState(newState);
    setLoading(false);
    formik.resetForm(initialValues);
    taskInput.current.focus();
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
          <TextField
            id="task"
            name="task"
            sx={{ width: "80%" }}
            value={formik.values.task}
            onChange={formik.handleChange}
            error={formik.touched.task && Boolean(formik.errors.task)}
            helperText={(formik.touched.task && formik.errors.task) || " "}
            label="Task"
            required
            inputRef={taskInput}
            variant="standard"
            fullWidth
          />
        </Grid>
        <Grid
          display="flex"
          item
          alignItems="center"
          justifyContent="center"
          md={3}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={formik.values.deadline}
              onChange={(value) => {
                formik.setFieldValue("deadline", value, true);
              }}
              label="Deadline"
              inputFormat="DD-MM-YYYY"
              openTo="day"
              views={["year", "month", "day"]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{ width: "80%" }}
                  error={
                    formik.touched.deadline && Boolean(formik.errors.deadline)
                  }
                  required
                  helperText={
                    (formik.touched.deadline && formik.errors.deadline) || " "
                  }
                  fullWidth
                  name="deadline"
                  variant="standard"
                />
              )}
            />
          </LocalizationProvider>
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
