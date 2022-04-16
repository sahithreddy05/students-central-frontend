/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { postComplaint } from "./helper/index";
import { isAuthenticated } from "../auth/helper/index";

const AddComplaint = () => {
  const { user, token } = isAuthenticated();

  const preload = () => {
    setValues({ ...values, formData: new FormData() });
  };
  useEffect(() => {
    preload();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [values, setValues] = useState({
    title: "",
    description: "",
    photo: "",
    authority: "9",
    error: "",
    loading: "",
    createdComplaint: "",
    formData: "",
  });

  const {
    title,
    description,
    photo,
    authority,
    loading,
    error,
    createdComplaint,
    formData,
  } = values;

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    formData.set("posted_user", user._id);
    setValues({ ...values, error: "", loading: true });
    postComplaint(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          description: "",
          authority: "9",
          error: "",
          loading: false,
          createdComplaint: "Complaint",
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
      style={{ display: createdComplaint ? "" : "None" }}
    >
      <h4>{createdComplaint} posted successfully</h4>
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

  const postComplaintForm = () => (
    <form style={{ textAlign: "center", margin: "auto" }}>
      <h4>What is your complaint related to??</h4>
      <div className="form-group">
        <label htmlFor="lost">
          <input
            type="radio"
            checked={authority === "1"}
            onChange={handleRadio("authority")}
            name="lost"
            id="lost"
            value="1"
          />
          Academics{" "}
        </label>
        <br />
        <label htmlFor="found">
          <input
            type="radio"
            onChange={handleRadio("authority")}
            name="found"
            id="found"
            value="0"
            checked={authority === "0"}
          />{" "}
          Infrastructure
        </label>
        <br />
        <label htmlFor="found">
          <input
            type="radio"
            onChange={handleRadio("authority")}
            name="found"
            id="found"
            value="2"
            checked={authority === "2"}
          />{" "}
          Management
        </label>
      </div>
      <div className="form-group">
        <label className="btn btn-block btn-yel text-center rounded">
          <h5>
            Upload an Image Of The Complaint (JPEG, JPG or PNG)
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
          onChange={handleChange("title")}
          autoFocus
          type="text"
          required
          className="form-control"
          placeholder="Title of the complaint"
          value={title}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          type="text"
          className="form-control"
          placeholder="Please elaborate your complaint"
          required
          value={description}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-dark mb-2 rounded"
      >
        Post Item
      </button>
    </form>
  );

  return (
    <Base title="Item Form" className="container p-4 yellow rounded">
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
          {postComplaintForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddComplaint;
