import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createUserStart } from "../action/actions";

const AddContact = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");
  const navigate = useNavigate();

  const { contact, loading, error } = useSelector((state) => state.data);
  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmail = contact.find(
      (contact) => contact.email === email && email
    );

    const checkNumber = contact.find(
      (contact) => contact.number === parseInt(number) && parseInt(number)
    );

    if (!email || !number || !name) {
      return toast.warning("Please Fill in All Fields");
    }

    if (checkEmail) {
      return toast.warning("Email is already exists");
    }

    if (checkNumber) {
      return toast.warning("Number is already exists");
    }

    const data = {
      id:contact[contact.length-1].id+1,
      name,
      email,
      number,
    };

    dispatch(createUserStart(data));
    toast.success("Contact Added Successfully");
    navigate("/");
  };

  return (
    <div className="container">
      <h1 className="display-3 text-center" style={{ marginTop: "15%" }}>
        Add Contact
      </h1>
      {loading ? (
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status"></div>
        </div>
      ) : (
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
                  role="button"
                  type="submit"
                  value="add Contact"
                  className="btn btn-block btn-dark"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddContact;
