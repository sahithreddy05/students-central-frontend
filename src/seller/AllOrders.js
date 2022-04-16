import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllOrders } from "../orders/helper/index";
import {
  CardColumns,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Badge,
} from "reactstrap";

const AllOrders = () => {
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllOrders(user._id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (data.maxItems === 0) {
          setValues({ ...values, error: "No items found" });
        } else {
          setValues({
            ...values,
            notifications: data,
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

  const { notifications, error } = values;

  const listAllNotifications = () => (
    <div>
      <CardColumns>
        {notifications &&
          notifications.map((item, index) => (
            <Card key={index}>
              <CardImg top width="100%" src={item.image_url} />
              <CardBody>
                <CardTitle>{item.items}</CardTitle>
                <p>Price: {item.total}</p>
                {item.status && <Badge color="success">Delivered</Badge>}
                {!item.status && <Badge color="danger">Not Delivered</Badge>}
              </CardBody>
            </Card>
          ))}
      </CardColumns>
    </div>
  );

  return (
    <Base title="Manage Food Items">
      {listAllNotifications()}
      {errorMessage()}
    </Base>
  );
};

export default AllOrders;
