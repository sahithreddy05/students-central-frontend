import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllFoodItems } from "../seller/helper";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  CardColumns,
  Card,
  CardImg,
  CardBody,
  CardText,
  Badge,
  CardHeader,
  Row,
  Col,
} from "reactstrap";
import { addItemToCart } from "./helper/cartHelper";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CanteenList = () => {
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllFoodItems(user._id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (data.maxItems === 0) {
          setValues({ ...values, error: "No items found" });
        } else {
          setValues({
            ...values,
            notifications: data.FoodItems,
          });
          console.log(data, "lost items");
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
    notifications: [],
    error: "",
  });

  const [redirect, setredirect] = useState(false);

  const addToCart = (item) => {
    addItemToCart(item);
    console.log("here");
    setredirect(true);
  };
  const getARedirect = (redirect) => {
    if (redirect) {
      console.log("Redirecting");
      return <Redirect to="/cart" />;
    }
  };

  const { notifications, error } = values;

  const listALlItems = () => (
    <div>
      {getARedirect(redirect)}
      <CardColumns>
        {notifications &&
          notifications.map((item, index) => (
            <Card
              key={index}
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              <CardHeader style={{ fontSize: "30px" }}>
                <b>{item.title}</b>
              </CardHeader>
              <CardImg top src={item.image_url} />
              <CardBody>
                <CardText>{item.description}</CardText>
                <Row>
                  <Col>
                    <h4
                      className="rounded"
                      style={{ background: "#000", color: "#fff" }}
                    >
                      <FontAwesomeIcon icon={faRupeeSign} /> {item.price}
                    </h4>
                  </Col>
                  <Col>
                    <h4
                      className="rounded"
                      style={{ background: "#000", color: "#fff" }}
                    >
                      Time: {item.delivery_time}
                    </h4>
                  </Col>
                </Row>
                {item.available && (
                  <Button
                    style={{ marginTop: "10px" }}
                    onClick={() => addToCart(item)}
                  >
                    Add To Cart
                  </Button>
                )}
                {!item.available && <Badge color="danger">Not Available</Badge>}
              </CardBody>
            </Card>
          ))}
      </CardColumns>
    </div>
  );

  return (
    <Base title="Menu">
      {listALlItems()}
      {errorMessage()}
    </Base>
  );
};

export default CanteenList;
