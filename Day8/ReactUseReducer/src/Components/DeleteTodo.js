import { useParams, Link } from "react-router-dom";
import { deleteTodo } from "../services/todos.services";

import { useQuery } from "react-query";

const DeleteTodo = () => {
  const { id } = useParams();

  const { data } = useQuery("todo-delete", () => {
    return deleteTodo(id);
  });

  return (
    <div className="create-form">
      <div>Todo With Id : {id} Deleted Successfully...</div>

      <Link to="/">Return To Home Page...</Link>
    </div>
  );
};

export default DeleteTodo;
