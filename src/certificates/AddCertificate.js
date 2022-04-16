/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { addCert } from "./helper/index";
import { isAuthenticated } from "../auth/helper/index";

const AddCertificate = () => {
  const { user, token } = isAuthenticated();

  const preload = () => {
    setValues({ ...values, formData: new FormData() });
  };
  useEffect(() => {
    preload();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [values, setValues] = useState({
    event_name: "",
    reflink: "",
    photo: "",
    error: "",
    loading: "",
    addedCert: "",
    formData: "",
  });

  const {
    event_name,
    reflink,
    photo,
    loading,
    error,
    addedCert,
    formData,
  } = values;

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    formData.set("user_id", user._id);
    setValues({ ...values, error: "", loading: true });
    addCert(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          event_name: "",
          reflink: "",
          error: "",
          loading: false,
          addedCert: "Certificate",
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const handleRadio = (name) => (event) => {
    const value = event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: addedCert ? "" : "None" }}
    >
      <h4>{addedCert} posted successfully</h4>
    </div>
  );

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () =>
    error && (
      <div className="alert alert-danger mt-3">
        <h4>{error}</h4>
      </div>
    );

  const addCertificateForm = () => (
    <form style={{ textAlign: "center", margin: "auto" }}>
      
      <div className="form-group">
        <label className="btn btn-block btn-yel text-center rounded">
          <h5>
            Upload an Image Of The Certificate (JPEG, JPG or PNG)
            <br />
          </h5>
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
            required
            placeholder="Choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("event_name")}
          autoFocus
          type="text"
          className="form-control"
          placeholder="Name of the event/competition"
          value={event_name}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("reflink")}
          type="text"
          className="form-control"
          placeholder="Please provide a link to know about the event(optional)"
          required
          value={reflink}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-dark mb-2 rounded"
      >
        Add Certificate
      </button>
    </form>
  );

  return (
    <Base title="Certificate Form" className="container p-4 yellow rounded">
      <div style={{ textAlign: "center", margin: "auto" }}>
        <Link to="/" className="btn btn-primary mb-3 rounded">
          Go Back To Home
        </Link>
      </div>
      <div className="row bg-white rounded">
        <div className="col-md-12">
          {successMessage()}
          {errorMessage()}
          {loadingMessage()}
          {addCertificateForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddCertificate;
