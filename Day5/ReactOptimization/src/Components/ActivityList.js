import { memo, useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";

import "../Styles/activitylist.css";

const ActivityListComponent = ({
  activity,
  setActivity,
  title,
  searchtitle,
  setSearchtitle,
  todos,
  status,
  setStatus,
  sort,
  setSorting,
  handleSorting,
}) => {
  return (
    <div>
      <div>
        <label for="search">Todo Search by title :</label>
        <input
          type="text"
          id="search"
          value={searchtitle}
          placeholder="Search title"
          onChange={(e) => setSearchtitle(e.target.value)}
        ></input>

        <label for="sort">Sort By :</label>
        <select
          id="sort"
          defaultValue={sort}
          onChange={(e) => {
            setSorting(e.target.value);
          }}
        >
          <option value={"ASC"}>A-Z</option>
          <option value={"DESC"}>Z-A</option>
        </select>

        <label for="stat">Check Status :</label>
        <select
          id="stat"
          defaultValue={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option value={"All"}>All</option>
          <option value={"Completed"}>Completed</option>
          <option value={"Pending"}>Pending</option>
        </select>
      </div>
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
          {handleSorting.map((object) => (
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
    </div>
  );
};
export const ActivityList = memo(ActivityListComponent);
