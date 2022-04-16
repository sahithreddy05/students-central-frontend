import React from "react";
import { useState } from "react";
import Base from "../core/Base";
import { Redirect } from "react-router-dom";
import { signin, isAuthenticated, authenticate } from "../auth/helper/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    try {
      signin({ email, password })
        .then((data) => {
          console.log("check");
          console.log(data.error);
          if (data.error !== "man") {
            console.log("data error if");
            setValues({ ...values, error: data.error, loading: false });
          } else {
            console.log("data error else");
            authenticate(data, () => {
              console.log("data error auth");
              setValues({ ...values, didRedirect: true });
            });
          }
        })
        .catch(console.log("signin failed"));
    } catch (e) {}
  };

  const performRedirect = () => {
    //TODO COME BACK
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/" />;
      } else {
        console.log("true");
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

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

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 col-sm-8 col-lg-6 mx-auto text-left">
          <form>
            <div className="form-group">
              <label className="text-black">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
              />
            </div>
            <div className="form-group">
              <label className="text-black password">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
              />
            </div>
            <div className="text-center">
              <button
                onClick={onSubmit}
                className="btn rounded"
                style={{ backgroundColor: "#56c6c6" }}
              >
                SignIn
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign In">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
