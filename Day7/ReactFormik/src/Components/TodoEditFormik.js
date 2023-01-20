import React, { useEffect, useState } from "react";
import { Formik, validateYupSchema, Form } from "formik";
import { useParams, Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { getTodoById } from "../services/todos.services";
import { patchTodo } from "../services/todos.services";

import FormikControl from "../formik/formikControl";

const TodoEditFormik = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  console.log(id);

  const { data } = useQuery("todo-edit", () => getTodoById(id));

  console.log("edit", data);

  const { mutate: patchTodoMutate } = useMutation(patchTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const dropDownMenu = [
    { key: "Status", value: "" },
    { key: "pending", value: "Pending" },
    { key: "completed", value: "Completed" },
  ];

  const initialValues = {
    id: data?.id,
    title: data?.title,
    status: data?.status,
    // DueDate: data?.DueDate,
    details: data?.details,
  };

  const validationSchema = {
    title: Yup.string().required("Title Required..."),
    details: Yup.string().required("Description Required..."),
    status: Yup.string().notRequired(""),
  };

  const onSubmit = (values, submitProps) => {
    console.log("In submit Handler...");
    console.log("Submit", values);
    patchTodoMutate({ id, body: values });
    submitProps.setSubmitting(false);

    navigate("/");
  };

  return (
    <div className="create-form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formikProps) => {
          console.log(formikProps.values);
          return (
            <Form>
              <div className="form-group">
                <FormikControl
                  control="input"
                  type="text"
                  label="Id"
                  name="id"
                />
              </div>

              <div className="form-group">
                <FormikControl
                  control="input"
                  type="text"
                  label="Title"
                  name="title"
                />
              </div>

              {/* <div className="form-group">
                <FormikControl control="date" label="Date" name="DueDate" />
              </div> */}

              <div className="form-group">
                <FormikControl
                  control="select"
                  label="Status"
                  name="status"
                  options={dropDownMenu}
                />
              </div>

              <div className="form-group">
                <FormikControl
                  control="textarea"
                  label="Description"
                  name="details"
                />
              </div>

              <div className="button-submit">
                <button
                  type="submit"
                  className="btn btn-danger"
                  // disabled={!formikProps.isValid}
                >
                  Submit
                </button>
              </div>
              <div className="button-submit">
                <Link to="/">Return to Home page</Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default TodoEditFormik;
