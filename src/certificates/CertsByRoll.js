import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getCertsByRoll } from "./helper";
import {
  CardColumns,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const CertsByRoll = () => {
  const { user, token } = isAuthenticated();
  const preload = (roll) => {
    if (roll.length !== 10) {
      setValues({
        ...values,
        certificates: [],
        error: "Roll Number should be 10 characters long",
      });
    } else {
        roll=roll.toUpperCase()
      getCertsByRoll(user._id, token, roll).then((data) => {
        if (data.error) {
          setValues({ ...values, certificates: [], error: data.error });
        } else {
          if (data.Certificates.length === 0) {
            setValues({
              ...values,
              certificates: [],
              error: "No certificates found",
            });
          } else {
            setValues({
              ...values,
              certificates: data.Certificates,
              error: "",
            });
          }
        }
      });
    }
  };
  const [rollnumber, setRollNumber] = useState({
    value: "",
  });

  const handleChange = (name) => (event) => {
    let rollvalue = event.target.value;
    setRollNumber({ ...rollnumber, [name]: rollvalue });
  };
  const errorMessage = () => {
    return (
      error !== "" && (
        <div className="alert alert-danger">
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
  const listCertificatesByRoll = () => (
    <div>
      <CardColumns>
        {certificates &&
          certificates.map((item, index) => (
            <Card key={index}>
              <CardImg top width="100%" src={item.image_url} />
              <CardBody>
                <CardTitle>{item.event_name}</CardTitle>
                {item.reflink && (
                  <a href={item.reflink}>
                    <CardText>{item.reflink}</CardText>
                  </a>
                )}
                <p>Date Added : {item.date.slice(0, 10)}</p>
              </CardBody>
            </Card>
          ))}
      </CardColumns>
    </div>
  );
  const search = () => {
    return (
      <div
        style={{
          background: "#000",
          color: "#ffff",
          textAlign: "center",
          padding: "10px",
        }}
      >
        <b>Roll Number:</b>{" "}
        <input
          required
          type="search"
          onChange={handleChange("value")}
          value={rollnumber.value}
        />{" "}
        <Button
          onClick={() => {
            preload(rollnumber.value);
          }}
          style={{ background: "white", color: "black" }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </div>
    );
  };

  return (
    <Base title="All Certificates">
      {search()}
      {listCertificatesByRoll()}
      {errorMessage()}
    </Base>
  );
};

export default CertsByRoll;
