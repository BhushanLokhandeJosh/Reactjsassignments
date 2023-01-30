import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addAction } from "../action/actions";

const AddContact = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [number, setnumber] = useState("");

  const contacts = useSelector((state) => state.contactReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmail = contacts.find(
      (contact) => contact.email === email && email
    );

    const checkNumber = contacts.find(
      (contact) => contact.number === parseInt(number) && parseInt(number)
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
      id: contacts[contacts.length - 1].id + 1,
      name,
      email,
      number,
    };
    console.log(data);

    dispatch(addAction(data));
    toast.success("Contact Added Successfully...");
    navigate("/");
  };

  return (
    <div className="container">
      <h1 className="display-3 text-center" style={{ marginTop: "15%" }}>
        Add Contact
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
                value="add Contact"
                className="btn btn-block btn-dark"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
