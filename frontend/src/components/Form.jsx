import { LoadingButton } from "@mui/lab";
import React, { useState, useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import InputField from "../customFields/inputField";
import DateField from "../customFields/dateField";
import { FastField, Form, Formik } from "formik";
import SaveIcon from "@mui/icons-material/Save";
import { useDispatch } from "react-redux";

import { bindActionCreators } from "@reduxjs/toolkit";
import { validationSchema } from "../utils/validation";

export default function From() {
  const dispatch = useDispatch;
  const [loading, setLoading] = useState(false);
  const initialValues = {
    task: "",
    deadline: "",
  };



  return (
    <Formik initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values, actions) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           actions.setSubmitting(false);
         }, 1000);
       }}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        console.log({ values, errors, touched });
        return (
          <Form>
            <Grid container>
              <Grid
                display="flex"
                md={6}
                item
                justifyContent="center"
                alignItems="center"
              >
                <FastField
                  name="task"
                  component={InputField}
                  label="Task"
                  placeholder="Task name"
                ></FastField>
              </Grid>
              <Grid
                display="flex"
                item
                alignItems="center"
                justifyContent="center"
                md={3}
              >
                <FastField
                  name="deadline"
                  component={DateField}
                  label="Deadline"
                  placeholder="Deadline"
                ></FastField>
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
          </Form>
        );
      }}
    </Formik>
  );
}
