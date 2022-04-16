import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getUserCertificates } from "./helper";
import {
  CardColumns,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";

const UserCertificates = () => {
  const { user, token } = isAuthenticated();

  const preload = () => {
    getUserCertificates(user._id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (data.maxItems === 0) {
          setValues({ ...values, error: "No certificates found" });
        } else {
          setValues({
            ...values,
            certificates: data.Certificates,
          })
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
    certificates: [],
    error: "",
  });

  const { certificates, error } = values;

  const listUserCertificates = () => (
    <div>
      <CardColumns>
        {certificates &&
          certificates.map((item, index) => (
            <Card key={index}>
              <CardImg top width="100%" src={item.image_url} />
              <CardBody>
                <CardTitle>{item.event_name}</CardTitle>
                {item.reflink && <CardText>{item.reflink}</CardText>}
                <p>Date Added : {item.date.slice(0, 10)}</p>
              </CardBody>
            </Card>
          ))}
      </CardColumns>
    </div>
  );
  return (
    <Base title="Certificates You Have Added">
      <div className="row">
        <div className="col-12 align-center my-2">
          <Link className="btn btn-dark" to="/addcertificate">
            Add A Certificate
          </Link>
        </div>
        {user.role === 2 && (
          <div className="col-12 align-center my-2">
            <Link className="btn btn-dark" to="/allcertificates">
              View All Certificates
            </Link>
          </div>
        )}
        {user.role === 2 && (
          <div className="col-12 align-center my-2">
            <Link className="btn btn-dark" to="/rollcerts">
              View Certificates By Roll Number
            </Link>
          </div>
        )}
      </div>
      {listUserCertificates()}
      {errorMessage()}
    </Base>
  );
};

export default UserCertificates;
