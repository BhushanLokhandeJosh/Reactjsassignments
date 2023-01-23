import { Form, Formik, validateYupSchema } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import FormikControl from "../formik/formikControl";
import "../Styles/createForm.css";
import { postTodo } from "../services/todos.services";
import { useMutation, useQueryClient } from "react-query";

const CreateTodoFormik = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: postTodoMutate } = useMutation(postTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const initialValues = {
    title: "",
    DueDate: "",
    details: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title Required..."),
    details: Yup.string().required("Description Required..."),
    DueDate: Yup.date().required("Date Required...").nullable(),
  });

  const getDateInFormat = (value) => {
    const today = value;
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = yyyy + "-" + mm + "-" + dd;
    return formattedToday;
  };

  const onSubmit = (values) => {
    const DateInFormat = getDateInFormat(values.DueDate);
    const newTodo = {
      title: values.title,
      status: "Pending",
      DueDate: DateInFormat,
      details: values.details,
    };
    console.log(newTodo);
    postTodoMutate(newTodo);
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
                  label="Title"
                  name="title"
                />
              </div>

              <div className="form-group">
                <FormikControl
                  control="textarea"
                  label="Description"
                  name="details"
                />
              </div>

              <div className="form-group">
                <FormikControl control="date" label="Date" name="DueDate" />
              </div>
              <div className="button-submit">
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={!formikProps.isValid || formikProps.isSubmitting}
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

export default CreateTodoFormik;
