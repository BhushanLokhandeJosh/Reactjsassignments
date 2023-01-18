import { Link, useParams } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { useQuery } from "react-query";

import { getTodoById } from "../services/todos.services";

const TodoInfo = () => {
  const { id } = useParams();

  const {
    data: result,
    isLoading,
    error,
  } = useQuery("todo-info", () => {
    return getTodoById(id);
  });
  return (
    <div className="blog-details">
      {isLoading ? (
        <SyncLoader color="#958255" className="loader" />
      ) : (
        <div>
          <h4>Title : </h4> {result.title}
          <h4>DueDate : </h4> {result.DueDate}
          <h4>Description : </h4> {result.details}
          <h4>Status : </h4> {result.status}
          <div>
            <Link to="/">Return to Home Page</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoInfo;
