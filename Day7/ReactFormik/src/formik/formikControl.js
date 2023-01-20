import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import DatePicker from "./DatePicker";
import Select from "./Select";

const FormikControl = (props) => {
  const { control, ...other } = props;
  switch (control) {
    case "input":
      return <Input {...other} />;
    case "textarea":
      return <TextArea {...other} />;
    case "date":
      return <DatePicker {...other} />;
    case "select":
      return <Select {...other} />;

    default:
      return null;
  }
};

export default FormikControl;
