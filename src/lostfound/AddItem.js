/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { postItem } from "./helper/index";
import { isAuthenticated } from "../auth/helper/index";

const AddItem = () => {
  const { user, token } = isAuthenticated();

  const preload = () => {
    setValues({ ...values, formData: new FormData() });
  };
  useEffect(() => {
    preload();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [values, setValues] = useState({
    item_description: "",
    place: "",
    photo: "",
    lost_found: false,
    error: "",
    loading: "",
    createdItem: "",
    getaRedirect: false,
    formData: "",
  });

  const {
    item_description,
    place,
    photo,
    lost_found,
    loading,
    error,
    createdItem,
    getaRedirect,
    formData,
  } = values;

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    formData.set("user_Posted", user._id);
    formData.set("posted_username", user.name);
    formData.set("posted_userphone", user.phone);
    console.log(user.phone);
    setValues({ ...values, error: "", loading: true });
    postItem(user._id, token, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          item_description: "",
          place: "",
          lost_found: false,
          error: "",
          loading: false,
          createdItem: "Item",
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
      style={{ display: createdItem ? "" : "None" }}
    >
      <h4>{createdItem} posted successfully</h4>
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

  const createProductForm = () => (
    <form style={{ textAlign: "center", margin: "auto" }}>
      <h4>Did You Lose Anything/ Found Someone's?</h4>
      <div className="form-group">
        <label htmlFor="lost">
          <input
            type="radio"
            checked={lost_found === "1"}
            onChange={handleRadio("lost_found")}
            name="lost"
            id="lost"
            value="1"
          />
          Lost An Item{" "}
        </label>
        <br />
        <label htmlFor="found">
          <input
            type="radio"
            onChange={handleRadio("lost_found")}
            name="found"
            id="found"
            value="0"
            checked={lost_found === "0"}
          />{" "}
          Found An Item
        </label>
      </div>
      <div className="form-group">
        <label className="btn btn-block btn-yel text-center rounded">
          <h5>
            Upload an Image Of The Item (JPEG, JPG or PNG)
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
        <textarea
          onChange={handleChange("item_description")}
          autoFocus
          type="text"
          required
          className="form-control"
          placeholder="Describe the item"
          value={item_description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("place")}
          type="text"
          className="form-control"
          placeholder="Place Where You Found/Lost The Item"
          required
          value={place}
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
          {createProductForm()}
          {successMessage()}
          {erroMessage()}
          {loadingMessage()}
        </div>
      </div>
    </Base>
  );
};

export default AddItem;
