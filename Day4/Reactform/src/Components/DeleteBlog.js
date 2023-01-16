import { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const DeleteBlog = () => {
  const { id } = useParams();
  fetch("http://localhost:8000/todo/" + id, {
    method: "DELETE",
  });

  return (
    <div className="create-form">
      <div>Todo With Id : {id} Deleted Successfully...</div>
      <Link to="/">Return To Home Page...</Link>
    </div>
  );
};

export default DeleteBlog;
