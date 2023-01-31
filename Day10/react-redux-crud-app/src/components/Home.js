import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteUserStart, loadUsersStart } from "../action/actions";

const Home = () => {
  const dispatch = useDispatch();
  const { contact, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadUsersStart());
  }, []);

  if (error) {
    toast.error("Something went wrong...");
  }

  const deleteHandler = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete the contact ?")
    ) {
      dispatch(deleteUserStart(id));
      toast.success("Contact with " + id + " Deleted Successfully");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 my-5 mx-2">
          <Link to="/add" className="btn btn-outline-dark">
            Add Contact
          </Link>
        </div>
        {loading ? (
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status"></div>
          </div>
        ) : (
          <div className="col-md-8 mx-auto">
            <table className="table table-hover">
              <thead className="text-white bg-dark text-center">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Number</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center", border: "1px solid black" }}>
                {contact &&
                  contact.map((contact, id) => (
                    <tr key={id}>
                      <td>{contact.id}</td>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.number}</td>
                      <td>
                        <Link
                          to={`/edit/${contact.id}`}
                          style={{ marginRight: "20px" }}
                        >
                          <button
                            className="btn btn-small btn-primary"
                            title="Edit Contact"
                          >
                            Edit
                          </button>
                        </Link>

                        <button
                          type="button"
                          className="btn btn-small btn-danger"
                          title="Delete Contact"
                          style={{ marginRight: "20px" }}
                          onClick={() => deleteHandler(contact.id)}
                        >
                          Delete
                        </button>

                        <Link
                          to={`/viewinfo/${contact.id}`}
                          style={{ marginRight: "20px" }}
                        >
                          <button
                            className="btn btn-small btn-success"
                            title="View Contact"
                          >
                            View
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
