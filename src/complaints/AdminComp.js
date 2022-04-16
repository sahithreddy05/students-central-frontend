import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllComplaints } from "./helper";
import {
  CardColumns,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle
} from "reactstrap";


const AdminComplaints = () => {
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllComplaints(user._id, token).then((data) => {
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
          console.log(data.Complaints, "complaints",data);
        }
      }
    });
  };
  useEffect(() => {
    preload();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);



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

  const listAllComplaints = () => (
    <div>
      <CardColumns>
        {complaints &&
          complaints.map((item, index) => (
            <Card key={index}>
              <CardImg
                top
                width="100%"
                src={item.image_url}
              />
              <CardBody>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.description}</CardText>
                <p>Date Posted : {item.date.slice(0,10)}</p>
              </CardBody>
            </Card>
          ))}
      </CardColumns>
    </div>
  );

  return (
    <Base title="All Complaints Posted">
      {listAllComplaints()}
      {errorMessage()}
    </Base>
  );
};

export default AdminComplaints;