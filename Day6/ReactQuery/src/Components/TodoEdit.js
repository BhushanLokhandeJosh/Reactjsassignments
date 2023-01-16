import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { patchTodo } from "../services/todos.services";

import { getTodoById } from "../services/todos.services";

const TodoEdit = () => {
  const { id, status, DueDate } = useParams();

  const [Editedtitle, setEditedTitle] = useState("");
  const [Status, setStatus] = useState(null);
  const [desc, setDescription] = useState("");
  const [date, setDate] = useState(DueDate);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery("todo-edit", () => getTodoById(id));

  const { mutate: patchTodoMutate } = useMutation(() => patchTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setEditedTitle(data?.title);
      setStatus(data?.status);
      setDescription(data?.details);
      setDate(data?.DueDate);
    }
  }, [data]);

  const onEditBlog = () => {
    console.log({ desc });
    patchTodoMutate({
      id: id,
      title: Editedtitle,
      status: Status,
      DueDate: date,
      details: desc,
    });

    navigate("/");
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      {isLoading ? (
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
              <label htmlFor="id" className="form-label">
                <b>Id</b>
              </label>
              <input
                type="text"
                id="Id"
                value={data.id}
                className="form-control"
                readOnly
              ></input>
            </div>

            <div className="col-md-6">
              <label htmlFor="title" className="form-label">
                <b>Title</b>
              </label>
              <input
                className="form-control"
                type="text"
                id="title"
                placeholder="Enter Todo"
                value={Editedtitle}
                onChange={(event) => setEditedTitle(event.target.value)}
              />
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="date" className="form-label">
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
              <label htmlFor="status" className="form-label">
                <b>Status</b>
              </label>
              <select
                className="form-select form-select-sm m-0"
                id="status"
                name="status"
                defaultValue={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="col-md-12">
            <label htmlFor="desc" className="form-label">
              <b>Description</b>
            </label>
            <textarea
              className="form-control"
              value={desc}
              onChange={handleDescriptionChange}
              cols="45"
              rows="8"
            />
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

export default React.memo(TodoEdit);
