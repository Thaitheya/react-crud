import React, { useState, useEffect } from "react";
import M from "materialize-css"; // Import Materialize JS
import "materialize-css/dist/css/materialize.min.css"; // Import Materialize CSS

const UserForm = ({ addUser }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    phoneNumber: "",
    city: "",
  });

  useEffect(() => {
    const modalElements = document.querySelectorAll(".modal");
    M.Modal.init(modalElements);
  }, []);

  const close = (elem) => {
    const instance = M.Modal.getInstance(elem);
    instance.close();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the formData to the parent component (or any logic for adding the user)
    addUser(formData);
    // Clear form
    setFormData({
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      phoneNumber: "",
      city: "",
    });
    // Close the modal
    close(document.getElementById("modal1"));
  };

  return (
    <div className="modals">
      <button data-target="modal1" className="btn modal-trigger">
        <span style={{ fontSize: "20px" }}> + </span>Add details
      </button>
      <div id="modal1" className="modal">
        <div className="modal-content">
          <div className="headers">
            <h3>Add user details</h3>
            <span
              className="material-icons"
              onClick={() => close(document.getElementById("modal1"))}
              style={{ cursor: "pointer" }}
            >
              close
            </span>
          </div>
          <div className="row">
            <form className="col s12" onSubmit={handleSubmit}>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    id="first_name"
                    type="text"
                    className="validate"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="first_name">First Name</label>
                </div>
                <div className="input-field col s6">
                  <input
                    id="last_name"
                    type="text"
                    className="validate"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="last_name">Last Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="password"
                    type="password"
                    className="validate"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    className="validate"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="phoneNumber"
                    type="number"
                    className="validate"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="phonenumber">Phone Number</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="city"
                    type="text"
                    className="validate"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="city">City</label>
                </div>
              </div>
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Submit
                <i className="material-icons left">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
