/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { postFoodItem } from "./helper/index";
import { isAuthenticated } from "../auth/helper/index";
import { InputGroup, Button, InputGroupText } from "reactstrap";

const AddFoodItem = () => {
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
    error: "",
    loading: "",
    createdItem: "",
    formData: "",
  });

  const {
    title,
    description,
    price,
    photo,
    loading,
    error,
    createdItem,
    formData,
  } = values;

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    postFoodItem(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          description: "",
          price: 0,
          error: "",
          loading: false,
          createdItem: data.title,
        });
      }
    });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdItem ? "" : "None" }}
    >
      <h4>{createdItem} created successfully</h4>
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

  const erroMessage = () =>
    error && (
      <div className="alert alert-success mt-3">
        <h4>{error}</h4>
      </div>
    );

  const createFoodItemForm = () => (
    <form style={{ textAlign: "center", margin: "auto" }}>
      <div className="form-group">
        <label className="btn btn-block btn-yel text-center rounded">
          <h5>
            Upload an Image Of The Food Item (JPEG, JPG or PNG)
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
          type="text"
          className="form-control"
          placeholder="Title Of The Food Item"
          required
          value={title}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          autoFocus
          type="text"
          required
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <InputGroup style={{ marginBottom: "10px" }}>
        <InputGroupText addonType="prepend">₹</InputGroupText>
        <input
          onChange={handleChange("price")}
          autoFocus
          type="number"
          required
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </InputGroup>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-dark mb-2 rounded"
      >
        Create Food Item
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
          {erroMessage()}
          {loadingMessage()}
          {createFoodItemForm()}
        </div>
      </div>
    </Base>
  );
};

export default AddFoodItem;
