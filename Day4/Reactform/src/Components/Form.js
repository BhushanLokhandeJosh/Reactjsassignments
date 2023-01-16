import { useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

import useFetch from "./useFetch";

import { TODOURL } from "../Constants/todoUrl";

const Form = ({ activity, setActivity }) => {
  const [input, setInput] = useState(""); //for input todo..
  const [desc, setDesciption] = useState("");
  const [date, setDate] = useState();
  const navigate = useNavigate();

  const onFormSubmit = (e) => {
    const data = {
      title: input,
      status: "Pending",
      DueDate: date,
      details: desc,
    };
    console.log(data);

    fetch("http://localhost:8000/todo", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    });

    setInput("");
    navigate("/");
  };
  return (
    <div className="create-form">
      <div className="row g-2 align-items-center">
        <h3 style={{ textAlign: "center" }}>Add Todo Details</h3>

        <label for="title">Todo Title</label>
        <input
          type="text"
          placeholder="Enter todo"
          className="col-form-label"
          value={input}
          size="40%"
          required
          onChange={(event) => setInput(event.target.value)}
        ></input>

        <label for="date">Due Date</label>
        <input
          type="date"
          className="col-form-label"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        ></input>

        <label for="desc">Blog Description</label>
        <textarea
          required
          className="col-form-label"
          value={desc}
          onChange={(event) => setDesciption(event.target.value)}
        ></textarea>

        <button className="btn btn-primary" onClick={onFormSubmit}>
          Add Todo
        </button>
        <br></br>
        <br></br>

        <div>
          <Link to="/" className="btn btn-link">
            Back To Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Form;
