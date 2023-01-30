import { Field, ErrorMessage } from "formik";
import FormError from "./FormError";

const Input = (props) => {
  const { label, name, ...other } = props;
  return (
    <div className="mb-3 row">
      <label
        htmlFor={name}
        className="col-sm-2 col-form-label"
        style={{ fontSize: "25px", fontWeight: "bold" }}
      >
        {label}
      </label>
      <Field id={name} name={name} {...other} className="form-control" />
      <ErrorMessage
        name={name}
        errorComponent={<FormError />}
        className="error-msg"
      />
    </div>
  );
};

export default Input;
