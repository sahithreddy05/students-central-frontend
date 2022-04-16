import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getUserComplaints } from "./helper";
import {
  CardColumns,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";

const UserComplaints = () => {
  const { user, token } = isAuthenticated();

  const preload = () => {
    getUserComplaints(user._id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (data.maxItems === 0) {
          setValues({ ...values, error: "No items found" });
        } else {
          setValues({
            ...values,
            complaints: data.Complaints,
          });
          console.log(data.Complaints, "complaints", data);
        }
      }
    });
  };
  useEffect(() => {
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const errorMessage = () => {
    return (
      error !== "" && (
        <div className="alert-error">
          <h2>{error}</h2>
        </div>
      )
    );
  };
  const [values, setValues] = useState({
    complaints: [],
    error: "",
  });

  const { complaints, error } = values;

  const listUserComplaints = () => (
    <div>
      <CardColumns>
        {complaints &&
          complaints.map((item, index) => (
            <Card key={index}>
              <CardImg top width="100%" src={item.image_url} />
              <CardBody>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.description}</CardText>
                <p>Date Posted : {item.date.slice(0, 10)}</p>
              </CardBody>
            </Card>
          ))}
      </CardColumns>
    </div>
  );

  return (
    <Base title="Complaints You Have Posted">
      <div className="row">
        <div className="col-12 align-center my-2">
          <Link className="btn btn-dark" to="/postcomplaint">
            Post A Complaint
          </Link>
        </div>
        {user.role === 2 && (
          <div className="col-12 align-center my-2">
            <Link className="btn btn-dark" to="/allcomplaints">
              View All Complaints
            </Link>
          </div>
        )}
      </div>
      {listUserComplaints()}
      {errorMessage()}
    </Base>
  );
};

export default UserComplaints;
