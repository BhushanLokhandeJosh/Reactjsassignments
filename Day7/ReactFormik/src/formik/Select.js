import { Field, ErrorMessage } from "formik";
import FormError from "./FormError";

const Select = (props) => {
  const { label, name, options, ...other } = props;
  return (
    <div className="mb-3 row">
      <label
        htmlFor={name}
        className="col-sm-2 col-form-label"
        style={{ fontSize: "25px", fontWeight: "bold" }}
      >
        {label}
      </label>
      <Field
        as="select"
        id={name}
        name={name}
        {...other}
        className="form-control"
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} errorComponent={FormError} />
    </div>
  );
};

export default Select;
