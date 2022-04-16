import React from "react";
import Base from "./Base";
import "./footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLowVision,
  faBell,
  faExclamationTriangle,
  faMedal,
  faRupeeSign,
  faClipboardCheck,
  faUtensils,
  faTools,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

function Home() {
  const { user } = isAuthenticated();
  return (
    <Base>
      <div className="container text-center">
        <div className="row" style={{textAlign:"center"}}>
          <div className="col-lg-2 my-2">
            <Link
              to="/canteen"
              className="btn btn-squared-default"
              style={{ background: "#e17055", color: "#000" }}
            >
              <FontAwesomeIcon icon={faUtensils} size="7x" />
              <h5 className="h5-home">Cafeteria</h5>
            </Link>
          </div>
          <div className="col-lg-2 my-2">
            <Link
              to="/myorders"
              className="btn btn-squared-default"
              style={{ background: "#a29bfe", color: "#000" }}
            >
              <FontAwesomeIcon icon={faClipboardCheck} size="7x" />
              <h5 className="h5-home">Orders</h5>
            </Link>
          </div>
          <div className="col-lg-2 my-2">
            <Link
              to="/lostfound"
              className="btn btn-squared-default"
              style={{ background: "#fab1a0" }}
            >
              <FontAwesomeIcon icon={faLowVision} size="7x" />
              <h5 className="h5-home">Lost / Found</h5>
            </Link>
          </div>
          <div className="col-lg-2 my-2">
            <Link
              to="/certificates"
              className="btn btn-squared-default"
              style={{ background: "#00b894" }}
            >
              <FontAwesomeIcon icon={faMedal} size="7x" />
              <h5 className="h5-home">Certificates</h5>
            </Link>
          </div>
          <div className="col-lg-2 my-2">
            <Link
              to="/complaints"
              className="btn btn-squared-default btn-warning"
            >
              <FontAwesomeIcon icon={faExclamationTriangle} size="7x" />
              <h5 className="h5-home">Complaints</h5>
            </Link>
          </div>
          <div className="col-lg-2 my-2">
            <Link
              to="/notifications"
              className="btn btn-squared-default"
              style={{ background: "#ff7675" }}
            >
              <FontAwesomeIcon icon={faBell} size="7x" />
              <h5 className="h5-home">Notifications</h5>
            </Link>
          </div>

          {user.role >= 1 && (
            <div className="col-lg-2 my-2">
              <Link
                to="/sellerpanel"
                className="btn btn-squared-default"
                style={{ background: "#2475B0", color: "white" }}
              >
                <FontAwesomeIcon icon={faRupeeSign} size="7x" />
                <h5 className="h5-home">Seller Panel</h5>
              </Link>
            </div>
          )}
          {user.role >= 1 && (
            <div className="col-lg-2 my-2">
              <Link
                to="/adminpanel"
                className="btn btn-squared-default"
                style={{ background: "#2475B0", color: "white" }}
              >
                <FontAwesomeIcon icon={faTools} size="7x" />
                <h5 className="h5-home">Admin Panel</h5>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Base>
  );
}

export default Home;
