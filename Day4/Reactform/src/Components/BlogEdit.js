import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

import useFetch from "./useFetch";

const BlogDetails = () => {
  const { id, status, DueDate } = useParams();
  const navigate = useNavigate();

  const [Editedtitle, setEditedTitle] = useState(null);
  const [Status, setStatus] = useState(null);
  const [desc, setDescription] = useState("");
  const [date, setDate] = useState(DueDate);

  let result = useFetch("http://localhost:8000/todo/" + id);

  useEffect(() => {
    setEditedTitle(result.activity.title);
    setStatus(result.activity.status);
    setDescription(result.activity.details);
    setDate(result.activity.DueDate);
  }, [result.activity]);

  const onTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const onStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const onEditBlog = (event) => {
    const editedBlog = {
      title: Editedtitle,
      status: Status,
      DueDate: date,
      details: desc,
    };

    fetch(`http://localhost:8000/todo/${result.activity.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedBlog),
      headers: { "content-type": "application/json" },
    });

    navigate("/");
  };

  return (
    <div>
      {result.pending ? (
        <SyncLoader color="#958255" />
      ) : (
        <div className="create-form">
          <h3>
            <b>Todo Details</b>
          </h3>

          <hr />
          <br />

          <div className="row g-3">
            <div className="col-md-6">
              <label for="id" className="form-label">
                <b>Id</b>
              </label>
              <input
                type="text"
                id="Id"
                value={result.activity.id}
                className="form-control"
                readOnly
              />
            </div>

            <div className="col-md-6">
              <label for="title" className="form-label">
                <b>Title</b>
              </label>
              <input
                className="form-control"
                type="text"
                id="title"
                placeholder="Enter Todo"
                value={Editedtitle}
                onChange={onTitleChange}
              />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label for="date" className="form-label">
                <b>Due Date</b>
              </label>
              <input
                className="form-control"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              ></input>
            </div>

            <div className="col-md-6">
              <label for="status" className="form-label">
                <b>Status</b>
              </label>
              <select
                className="form-select form-select-sm m-0"
                id="status"
                name="status"
                defaultValue={status}
                onChange={onStatusChange}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="col-md-12">
            <label for="desc" className="form-label">
              <b>Description</b>
            </label>
            <textarea
              className="form-control"
              value={desc}
              onChange={(event) => setDescription(event.target.value)}
              cols="45"
              rows="8"
            ></textarea>
          </div>

          <button onClick={onEditBlog} className="btn btn-primary">
            Edit
          </button>

          <br />

          <Link to="/" className="btn btn-link">
            Return to Home Page
          </Link>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
