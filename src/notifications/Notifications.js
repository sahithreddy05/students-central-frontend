import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllNotifications, deleteNotification } from "./helper";
import {
  Button,
  CardColumns,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
} from "reactstrap";
import { Link } from "react-router-dom";

const Notifications = () => {
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllNotifications(user._id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (data.maxItems === 0) {
          setValues({ ...values, error: "No items found" });
        } else {
          setValues({
            ...values,
            notifications: data.Items,
          });
          console.log(data.Items, "lost items");
        }
      }
    });
  };
  useEffect(() => {
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteNote = (id) => {
    deleteNotification(user._id, token, id).then((res) => {
      if (res.message) {
        setValues({ ...values, error: res.message, success: "" });
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
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.description}</CardText>
                <p>Date Posted : {item.date.slice(0, 10)}</p>
                {user.role === 2 && (
                  <Button
                    onClick={() => {
                      deleteNote(item._id);
                    }}
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
  );

  return (
    <Base title="Notifications">
      <div
        style={{
          width: "100%",
          alignContent: "center",
          textAlign: "center",
        }}
      >
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to="/addnotification"
        >
          <Button
            color="primary"
            style={{ border: "2px", borderColor: "#000" }}
          >
            Add Notification
          </Button>
        </Link>
      </div>
      {listAllNotifications()}
      {errorMessage()}
    </Base>
  );
};

export default Notifications;
