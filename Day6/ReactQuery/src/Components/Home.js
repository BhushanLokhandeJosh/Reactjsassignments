import { useEffect, useMemo, useState } from "react";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { ActivityList } from "./ActivityList";

import { useMutation, useQuery, useQueryClient } from "react-query";

import { getAllTodos } from "../services/todos.services";

import Image from "../error-banner.jpeg";

const Home = () => {
  const pageSize = 10;
  const [pageNumber, setPageNumber] = useState(1);
  const [searchtitle, setSearchtitle] = useState("");
  const [sort, setSorting] = useState("id");
  const [order, setOrder] = useState("ASC");
  const [status, setStatus] = useState(undefined);
  const [buttondata, setButtonData] = useState("");

  const { data, isLoading, error } = useQuery(
    ["todos", pageNumber, sort, order, searchtitle, status],
    () => {
      if (status === "All") {
        setStatus(undefined);
      }
      return getAllTodos({
        _page: pageNumber,
        _limit: pageSize,
        _sort: sort,
        _order: order,
        title_like: searchtitle,
        status: status,
      });
    }
  );

  return (
    <div className="container">
      <div className="activity-list">
        <div>
          {error ? (
            <div>
              <img src={Image} alt="Can't Load Image"></img>
            </div>
          ) : isLoading ? (
            <div className="parent">
              <div className="child">
                <SyncLoader color="#958255" />
              </div>
            </div>
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
                data={data}
                searchtitle={searchtitle}
                setSearchtitle={setSearchtitle}
                sort={sort}
                setSorting={setSorting}
                order={order}
                setOrder={setOrder}
                status={status}
                setStatus={setStatus}
                buttondata={buttondata}
                setButtonData={setButtonData}
              />

              <div>
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">
                    <button
                      onClick={() => setPageNumber(pageNumber - 1)}
                      disabled={pageNumber === 1}
                      className="button-style"
                    >
                      Previous
                    </button>
                    <div className="pageNumber">
                      <h3>{pageNumber}</h3>
                    </div>

                    <button
                      onClick={() => setPageNumber(pageNumber + 1)}
                      disabled={data?.length < pageSize}
                      className="button-style"
                    >
                      Next
                    </button>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
