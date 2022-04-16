import React, { useState } from "react";
import Base from "../core/Base";
import { signup, isAuthenticated } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    roll: "",
    role: "",
    error: "",
    phone: "",
    success: false,
  });

  const {user,token}=isAuthenticated()

  const { name, email, password,roll, role, phone, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup(user._id,token,{ name, email, password, phone, role,roll })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            phone: "",
            roll:"",
            role: "",
            success: true,
          });
        }
      })
      .catch();
  };

  const signUpForm = () => {
    return (
      <div className="row" style={{ backgroundColor: "#fffff" }}>
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-black">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-black">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-black">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
              />
            </div>
            <div className="form-group">
              <label className="text-black">Phone</label>
              <input
                className="form-control"
                onChange={handleChange("phone")}
                type="text"
                value={phone}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-black">Roll Number</label>
              <input
                className="form-control"
                onChange={handleChange("roll")}
                type="text"
                value={roll}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-black">Role</label>
              <input
                placeholder="0-student 1-seller 2-admin"
                className="form-control"
                onChange={handleChange("role")}
                type="number"
                value={role}
                required
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-block rounded"
              style={{ backgroundColor: "#56c6c6", color: "#ffffff" }}
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-success"
          style={{ display: success ? "" : "none" }}
        >
          New account was created successfully.
        </div>
      </div>
    </div>
  );

  const errorMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-sm-3 text-left">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
      </div>
    </div>
  );

  return (
    <Base title="Add Users">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
