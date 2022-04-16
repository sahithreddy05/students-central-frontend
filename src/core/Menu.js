import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper/index";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
  faUser,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";

const Menu = ({ history }) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  return (
    <div>
      <div>
        <ul className="nav nav-pills nav-fill bgcolor-#353535 my-auto">
          <li className="nav-item">
            <Link className="btn btn-dark rounded my-2" to="/">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </li>

          {!isAuthenticated() && (
            <li className="nav-item my-auto">
              <Link className="btn btn-warning" to="/signin">
                <FontAwesomeIcon icon={faSignInAlt} /> Sign In
              </Link>
            </li>
          )}
          {isAuthenticated() && (
            <li className="nav-item my-auto">
              <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle
                  caret
                  style={{ background: "#2B2B52", color: "white" }}
                >
                  <FontAwesomeIcon icon={faUser} /> Profile
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem color="danger">
                    <FontAwesomeIcon icon={faEdit} /> Edit Profile
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    color="danger"
                    onClick={() => {
                      signout(() => {
                        history.push("/signin");
                      });
                    }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
                  </DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </li>
          )}
          {isAuthenticated() && (
            <li className="nav-item">
              <Link className="btn btn-dark rounded my-2" to="/cart">
                <FontAwesomeIcon icon={faShoppingCart} /> Cart
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default withRouter(Menu);
