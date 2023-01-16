import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";

import useFetch from "./useFetch";
import ActivityList from "./ActivityList";

import { TODOURL } from "../Constants/todoUrl";

import Image from "../error-banner.jpeg";

const Home = () => {
  const [activity, setActivity] = useState([]);
  const { activity: todo, pending, error } = useFetch(TODOURL);

  useEffect(() => {
    setActivity(todo);
  }, [todo]);

  return (
    <div className="container">
      <div className="activity-list">
        <div>
          {error ? (
            <div>
              <img src={Image} alt="Can't Load Image"></img>
            </div>
          ) : pending ? (
            <SyncLoader color="#958255" className="loader" />
          ) : (
            <div>
              <h1 className="header">All Todos</h1>
              <hr />
              <div>
                <Link to="/create" className="btn btn-link">
                  <b className="link">Create Todo</b>
                </Link>
              </div>

              <ActivityList
                activity={activity}
                setActivity={setActivity}
                title="Activity List"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
