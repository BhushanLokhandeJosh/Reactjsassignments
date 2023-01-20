import { ErrorMessage, Field } from "formik";
import DateView from "react-datepicker";

import FormError from "./FormError";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = (props) => {
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
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              id={name}
              {...field}
              {...other}
              selected={value}
              dateFormat="yyyy/MM/dd"
              onChange={(value) => setFieldValue(name, value)}
              className="form-control"
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} ErrorMessage={<FormError />} />
    </div>
  );
};

export default DatePicker;
