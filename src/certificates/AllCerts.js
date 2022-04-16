import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllCerts } from "./helper";
import {
  CardColumns,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";

const AllCertificates = () => {
  const { user, token } = isAuthenticated();
  const preload = () => {
    getAllCerts(user._id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (data.maxItems === 0) {
          setValues({ ...values, error: "No certificates found" });
        } else {
          setValues({
            ...values,
            certificates: data.Certificates,
          });
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
  const listAllCertificates = () => (
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
    <Base title="All Certificates">
      {listAllCertificates()}
      {errorMessage()}
    </Base>
  );
};

export default AllCertificates;