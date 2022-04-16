import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import {
  getLostItems,
  getFoundItems,
  claimItem,
  deleteItem,
  unClaimItem,
} from "./helper";
import { isAuthenticated } from "../auth/helper";
import {
  CardColumns,
  Button,
  CardText,
  CardSubtitle,
  CardTitle,
  CardBody,
  CardImg,
  Card,
  Row,
  Col,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const List = () => {
  const { user, token } = isAuthenticated();

  const preload = () => console.log("Use Effect");
  useEffect(() => {
    preload();
  }, []);

  const [values, setValues] = useState({
    itemlostlist: [],
    itemfoundlist: [],
    success: "",
    error: "",
    lost: false,
    found: false,
  });

  const { itemlostlist, itemfoundlist, error, success, lost, found } = values;

  const preload2 = () => {
    getLostItems(user._id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (data.maxItems === 0) {
          setValues({ ...values, error: "No items found" });
        } else {
          setValues({
            ...values,
            itemlostlist: data.Items,
            lost: true,
            found: false,
            success: "",
          });
          console.log(data.Items, "lost items");
        }
      }
    });
  };
  const preload1 = () => {
    getFoundItems(user._id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (data.maxItems === 0) {
          setValues({ ...values, error: "No items found" });
        } else {
          setValues({
            ...values,
            itemfoundlist: data.Items,
            found: true,
            lost: false,
            success: "",
          });
          console.log(data.Items, "found items");
        }
      }
    });
  };

  const errorMessage = () => {
    return (
      error !== "" && (
        <div className="alert-error">
          <h2>{error}</h2>
        </div>
      )
    );
  };
  const successMessage = () => {
    return (
      success !== "" && (
        <div className="alert-success">
          <h2>{success}</h2>
        </div>
      )
    );
  };

  const claimItemJs = (id) => {
    claimItem(user._id, token, id).then((res) => {
      if (res.error) {
        setValues({ ...values, error: res.error, success: "" });
      } else {
        setValues({
          ...values,
          error: "",
          success: "You have successfully claimed the item",
        });
        setFound();
        setLost();
      }
    });
  };

  const unClaimItemJs = (id) => {
    unClaimItem(user._id, token, id).then((res) => {
      if (res.error) {
        setValues({ ...values, error: res.error, success: "" });
      } else {
        setValues({
          ...values,
          error: "",
          success: "You have successfully unclaimed the item",
        });
        setFound();
        setLost();
      }
    });
  };

  const deleteItemJs = (id) => {
    deleteItem(user._id, token, id).then((res) => {
      if (res.message) {
        setValues({ ...values, error: res.message, success: "" });
        setFound();
        setLost();
      }
    });
  };

  const setLost = () => {
    preload2();
  };
  const setFound = () => {
    preload1();
  };
  const listAllLost = () => {
    console.log(lost);
    return (
      lost && (
        <div>
          <div>
            <h3>Lost Items</h3>
          </div>
          <CardColumns>
            {itemlostlist &&
              itemlostlist.map((item, index) => (
                <Card key={index}>
                  <CardImg
                    top
                    width="100%"
                    src={item.image_url}
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardText>{item.item_description}</CardText>
                    <CardTitle>
                      Posted By:{item.posted_username}{" "}
                      <FontAwesomeIcon icon={faPhoneSquare} />:
                      {item.posted_userphone}{" "}
                    </CardTitle>
                    {user._id !== item.user_Posted && !item.item_status && (
                      <Button
                        onClick={() => claimItemJs(item._id)}
                        className="btn-success"
                      >
                        I Have It
                      </Button>
                    )}
                    {item.item_status && (
                      <CardSubtitle>
                        Item With:{item.claimed_username}{" "}
                        <FontAwesomeIcon icon={faPhoneSquare} />:
                        {item.claimed_userphone}
                      </CardSubtitle>
                    )}
                    <p>Date Posted : {item.data.slice(0, 10)}</p>
                    {user._id === item.claimed_user && item.item_status && (
                      <Button
                        onClick={() => unClaimItemJs(item._id)}
                        className="btn-success"
                      >
                        Unclaim
                      </Button>
                    )}

                    {user._id === item.user_Posted && (
                      <Button
                        onClick={() => deleteItemJs(item._id)}
                        className="btn-danger"
                      >
                        Delete
                      </Button>
                    )}
                  </CardBody>
                </Card>
              ))}
          </CardColumns>
        </div>
      )
    );
  };
  const listAllFound = () => {
    return (
      found && (
        <div>
          <div>
            <h3>Found Items</h3>
          </div>
          <CardColumns>
            {itemfoundlist &&
              itemfoundlist.map((item, index) => (
                <Card key={index}>
                  <CardImg
                    top
                    width="100%"
                    src={item.image_url}
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardText>{item.item_description}</CardText>
                    <CardTitle>
                      Posted By:{item.posted_username}{" "}
                      <FontAwesomeIcon icon={faPhoneSquare} />:
                      {item.posted_userphone}{" "}
                    </CardTitle>
                    {item.item_status && (
                      <CardSubtitle>
                        Claimed By:{item.claimed_username}{" "}
                        <FontAwesomeIcon icon={faPhoneSquare} />:
                        {item.claimed_userphone}
                      </CardSubtitle>
                    )}
                    <p>Date Posted : {item.data.slice(0, 10)}</p>
                    {user._id !== item.user_Posted && !item.item_status && (
                      <Button
                        onClick={() => claimItemJs(item._id)}
                        className="btn-success"
                      >
                        Claim
                      </Button>
                    )}

                    {user._id === item.claimed_user && item.item_status && (
                      <Button
                        onClick={() => unClaimItemJs(item._id)}
                        className="btn-success"
                      >
                        Unclaim
                      </Button>
                    )}
                    {user._id === item.user_Posted && (
                      <Button
                        onClick={() => deleteItemJs(item._id)}
                        className="btn-danger"
                      >
                        Delete
                      </Button>
                    )}
                  </CardBody>
                </Card>
              ))}
          </CardColumns>
        </div>
      )
    );
  };
  return (
    <Base title="Lost/Found Items">
      <Row style={{ textAlign: "center" }}>
        <Col>
        <div className="col-xs-12">
          <Button style={{ margin: "10px" }} onClick={setLost}>
            See All Lost
          </Button>
        </div>
        </Col>
        <div className="col-lg-4 col-xs-12">
          <Button style={{ margin: "10px" }} onClick={setFound}>
            See All Found
          </Button>
        </div>
        <Col>
          <Link to="/postlostfound">
            <Button style={{ margin: "10px" }}>Post An Item</Button>
          </Link>
        </Col>
      </Row>
      {errorMessage()}
      {successMessage()}
      {listAllLost()}
      {listAllFound()}
    </Base>
  );
};

export default List;
