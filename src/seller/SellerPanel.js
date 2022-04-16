import React from "react";
import Base from "../core/Base";
import "../core/footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCookieBite,
  faMugHot,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function SellerPanel() {
  return (
    <Base title="Seller Dashboard">
      <div className="container text-center">
        <div className="row">
          <div className="col-lg-3 my-2">
            <Link
              to="/managefooditems"
              className="btn btn-squared-default btn-success"
            >
              <FontAwesomeIcon icon={faCookieBite} size="7x" />
              <h5 className="h5-home">Manage Products</h5>
            </Link>
          </div>
          <div className="col-lg-3 my-2">
            <Link
              to="/postfooditem"
              className="btn btn-squared-default btn-success"
            >
              <FontAwesomeIcon icon={faMugHot} size="7x" />
              <h5 className="h5-home">Add Food Items</h5>
            </Link>
          </div>
          <div className="col-lg-3 my-2">
            <Link
              to="/allorders"
              className="btn btn-squared-default btn-success"
            >
              <FontAwesomeIcon icon={faTicketAlt} size="7x" />
              <h5 className="h5-home">Manage Orders</h5>
            </Link>
          </div>
          <div className="col-lg-3 my-2">
            <Link
              to="/scanorder"
              className="btn btn-squared-default btn-success"
            >
              <FontAwesomeIcon icon={faTicketAlt} size="7x" />
              <h5 className="h5-home">Scan Orders</h5>
            </Link>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default SellerPanel;
