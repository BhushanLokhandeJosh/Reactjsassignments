import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateAction, updateUserStart } from "../action/actions";

const EditContact = () => {
  const { id } = useParams();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");

  const {contact,loading,error} = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentContact = contact.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    if (currentContact) {
      setname(currentContact.name);
      setemail(currentContact.email);
      setnumber(currentContact.number);
    }
  }, [currentContact]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmail = contact.find(
      (contact) =>
        contact.id !== parseInt(id) && contact.email === email && email
    );

    const checkNumber = contact.find(
      (contact) =>
        contact.id !== parseInt(id) &&
        contact.number === parseInt(number) &&
        parseInt(number)
    );

    if (!email || !number || !name) {
      return toast.warning("Please Fill in All Fields");
    }

    if (checkEmail) {
      return toast.error("Email is already exists");
    }

    if (checkNumber) {
      return toast.error("Number is already exists");
    }

    const data = {
      id: parseInt(id),
      name,
      email,
      number,
    };
    console.log(data);

    dispatch(updateUserStart({ id, data }));
    toast.success("Contact Updated Successfully");
    navigate("/");
  };

  return (
    <div className="container">
      {currentContact ? (
        <>
          <h1 className="display-3 text-center" style={{ marginTop: "15%" }}>
            Edit Contact {id}
          </h1>
          <div className="row">
            <div className="col-md-6 shadow mx-auto p-5">
              <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                  <input
                    type="number"
                    placeholder="Contact"
                    className="form-control"
                    value={number}
                    onChange={(e) => setnumber(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    value="update Contact"
                    className="btn btn-dark"
                  />
                  <Link
                    to="/"
                    className="btn btn-danger ml-3"
                    style={{ marginLeft: "30px" }}
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <h1 className="display-3 text-center" style={{ marginTop: "15%" }}>
          contact with {id} is not exists
        </h1>
      )}
    </div>
  );
};

export default EditContact;
