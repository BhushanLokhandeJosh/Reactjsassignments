import { Link } from "react-router-dom";

import "../Styles/activitylist.css";

const ActivityList = ({ activity, setActivity, title }) => {
  return (
    <div className="App-header">
      <table className="table">
        <tr style={{ border: "1px solid white" }}>
          <th>Id</th>
          <th>Title</th>
          <th>Due Date</th>
          <th>Current Status</th>

          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {activity.map((object) => (
          <tr>
            <td>{object.id}</td>
            <Link to={`/blogdetails/${object.id}`} className="link">
              <td>{object.title}</td>
            </Link>
            <td className="extra-width">{object.DueDate}</td>
            <td>{object.status}</td>
            <td>
              <button className="btn btn-outline-info link">
                <Link
                  to={`/blogs/edit/${object.id}/${object.status}/${object.DueDate}`}
                >
                  Edit
                </Link>
              </button>
            </td>
            <td>
              <button className="link btn btn-danger ">
                <Link to={`/blogs/delete/${object.id}`}>Delete</Link>
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};
export default ActivityList;
