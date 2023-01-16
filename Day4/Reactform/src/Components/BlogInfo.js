import { Link, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogInfo = () => {
  const { id } = useParams();

  let result = useFetch("http://localhost:8000/todo/" + id);
  console.log(result);

  return (
    <div className="blog-details">
      <h4>Title : </h4> {result.activity.title}
      <h4>DueDate : </h4> {result.activity.DueDate}
      <h4>Description : </h4> {result.activity.details}
      <h4>Status : </h4> {result.activity.status}
      <div>
        <Link to="/">Return to Home Page</Link>
      </div>
    </div>
  );
};

export default BlogInfo;
