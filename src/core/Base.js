import React, { useState } from "react";
import Menu from "./Menu";
import "./footer.css";
import { Button } from "reactstrap";
import Modal from "react-awesome-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMailBulk } from "@fortawesome/free-solid-svg-icons";
const Base = ({ title = "Home", children }) => {
  const [visible, setVisible] = useState(false);
  const closeModal = () => {
    setVisible(false);
  };
  const showContactDetails = () => {
    return (
      <div className="contact">
        <div className="col-6">
          <Modal
            visible={visible}
            width="300"
            height="120"
            effect="fadeInUp"
            onClickAway={() => closeModal()}
          >
            <div>
              <h3>Contact Info</h3>
              <p>
                <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>1234567890
                <br />
                <FontAwesomeIcon icon={faMailBulk}></FontAwesomeIcon>
                aravind@gmail.com
              </p>
            </div>
          </Modal>
        </div>
      </div>
    );
  };
  const showDetails = () => {
    console.log(visible);
    setVisible(true);
    console.log(visible);
  };

  return (
    <div>
      <Menu />
      <div className="container-fluid">
        <div
          className="jumbotron text-center"
          style={{ backgroundColor: "#fff" }}
        >
          <h1 style={{ fontSize: "60px" }}>{title}</h1>
        </div>
        <div>{children}</div>
      </div>
      <footer className="footer mt-auto mx-auto">
        <div className="text-center container-fluid mt-3">
          <Button color="secondary" onClick={() => showDetails()}>
            Contact Us
          </Button>
          <p>CMR © 2020</p>
        </div>
      </footer>
      {showContactDetails()}
    </div>
  );
};

export default Base;
