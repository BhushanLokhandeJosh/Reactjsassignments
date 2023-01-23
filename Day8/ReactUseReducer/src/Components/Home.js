import { useReducer } from "react";
import { SyncLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { ActivityList } from "./ActivityList";

import ACTIONS from "../Actions/action";

import CONSTANTS from "../MagicConstants";

import stateReducer from "../reducer/reducer";

import { useQuery } from "react-query";

import { getAllTodos } from "../services/todos.services";

import Image from "../error-banner.jpeg";

const Home = () => {
  const [state, dispatch] = useReducer(stateReducer, {
    pageSize: 10,
    pageNumber: 1,
    searchtitle: "",
    sort: CONSTANTS.SORT_BY,
    order: CONSTANTS.ORDER_BY,
    status: CONSTANTS.TODO_STATUS,
    buttondata: "",
  });

  const { data, isLoading, error } = useQuery(
    [
      "todos",
      state.pageNumber,
      state.sort,
      state.order,
      state.status,
      state.buttondata,
    ],
    () => {
      if (state.status === "All") {
        setStatus(undefined);
      }
      return getAllTodos({
        _page: state.pageNumber,
        _limit: state.pageSize,
        _sort: state.sort,
        _order: state.order,
        status: state.status,
        title_like: state.buttondata,
      });
    }
  );

  const setSearchtitle = (value) => {
    dispatch({ type: ACTIONS.SET_SEARCHTITLE, payload: value });
  };

  const setPageNumber = (value) => {
    dispatch({ type: ACTIONS.SET_PAGE_NUMBER, payload: value });
  };

  const setOrder = (value) => {
    dispatch({ type: ACTIONS.SET_ORDER, payload: value });
  };

  const setSorting = (value) => {
    dispatch({ type: ACTIONS.SET_SORT, payload: value });
  };

  const setStatus = (value) => {
    dispatch({ type: ACTIONS.SET_STATUS, payload: value });
  };
  const onClickButton = (value) => {
    console.log(value, "clicked button");
    dispatch({ type: ACTIONS.SET_BUTTONDATA, payload: value });
  };
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
                searchtitle={state.searchtitle}
                setSearchtitle={setSearchtitle}
                sort={state.sort}
                setSorting={setSorting}
                order={state.order}
                setOrder={setOrder}
                status={state.status}
                setStatus={setStatus}
                onClickButton={onClickButton}
              />

              <div>
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-center">
                    <button
                      onClick={() => setPageNumber(state.pageNumber - 1)}
                      disabled={state.pageNumber === 1}
                      className="button-style"
                    >
                      Previous
                    </button>
                    <div className="pageNumber">
                      <h3>{state.pageNumber}</h3>
                    </div>

                    <button
                      onClick={() => setPageNumber(state.pageNumber + 1)}
                      disabled={data?.length < state.pageSize}
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
