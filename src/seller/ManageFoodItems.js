import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllFoodItems, resetTime, updateAvailability, deleteFoodItem } from "./helper";
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

const ManageFoodItems = () => {
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

  const resetDT = (id) => {
    resetTime(user._id, token, id).then((res) => {
      if (res.error) {
        setValues({ ...values, error: res.error, success: "" });
      }
      preload();
    });
  };

  const updateAvailable = (id) => {
    updateAvailability(user._id, token, id).then((res) => {
      if (res.error) {
        setValues({ ...values, error: res.error, success: "" });
      }
      preload();
    });
  };

  const deleteNote = (id) => {
    deleteFoodItem(user._id, token, id).then((res) => {
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
      <div style={{ textAlign: "center", margin: "20px" }}>
        <Link to="/postfooditem">
          <Button>Post Food Item</Button>
        </Link>
      </div>
      <CardColumns>
        {notifications &&
          notifications.map((item, index) => (
            <Card key={index}>
              <CardImg top width="100%" src={item.image_url} />
              <CardBody>
                <CardTitle>{item.title}</CardTitle>
                <CardText>{item.description}</CardText>
                <p>Price: {item.price}</p>
                <p>Time: {item.delivery_time}</p>

                {user.role !== 0 && (
                  <Button style={{
                    marginBottom:"5px"
                  }}
                    onClick={() => {
                      resetDT(item._id);
                    }}
                    className="btn-danger"
                  >
                    Reset Delivery Time
                  </Button>
                )}
                {item.available === true && (
                  <div>
                    <Button  style={{
                      marginBottom:"5px"
                    }}
                      color="danger"
                      onClick={() => updateAvailable(item._id)}
                    >
                      Make Unavailable
                    </Button>
                  </div>
                )}
                {item.available === false && (
                  <div>
                    <Button style={{
                      marginBottom:"5px"
                    }}
                      color="success"
                      onClick={() => updateAvailable(item._id)}
                    >
                      Make Available
                    </Button>
                  </div>
                )}
                <Button  style={{
                  marginBottom:"5px"
                }}
                 onClick={()=>{
                  deleteNote(item._id)
              }} className="btn-danger">Delete</Button>
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

export default ManageFoodItems;
