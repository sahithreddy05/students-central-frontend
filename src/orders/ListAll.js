import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import Modal from "react-awesome-modal";
import { isAuthenticated } from "../auth/helper";
import { getAllOrdersOfUser, getOrderById } from "./helper";
import { CardColumns, Card, CardBody, Button, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
const QRCode = require("qrcode.react");

const UserOrders = () => {
  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllOrdersOfUser(user._id, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        if (data.maxItems === 0) {
          setValues({ ...values, error: "No items found" });
        } else {
          setValues({
            ...values,
            orders: data.Orders,
          });
          setOrder("");
          console.log(data.Orders, "lost items");
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
    orders: [],
    error: "",
  });

  const [orderqr, setOrder] = useState("");
  const [visible, setVisible] = useState(false);

  const { orders, error } = values;

  const getIndOrder = (id) => {
    getOrderById(user._id, token, id).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setOrder(data._id.toString());
        setVisible(true);
        console.log(orderqr);
      }
    });
  };
  const closeModal = () => {
    setOrder("");
    setVisible(false);
  };

  const showQR = () => {
    return (
      orderqr !== "" && (
        <div className="row">
          <div className="col-6">
            <Modal
              visible={visible}
              width="300"
              height="300"
              effect="fadeInUp"
              onClickAway={() => closeModal()}
            >
              <div>
                <QRCode size="75" value={orderqr} />
              </div>
            </Modal>
          </div>
        </div>
      )
    );
  };

  const listAllNotifications = () => (
    <div>
      <CardColumns>
        {orders &&
          orders.map((item, index) => (
            <Card key={index} style={{ textAlign: "center" }}>
              <CardBody>
                <div>
                  <Table striped dark>
                    {item.items
                      .filter((ord, index) => index % 2 === 0)
                      .map((order) => (
                        <tr>
                          <td>{order}</td>
                          <td> {item.items[item.items.indexOf(order) + 1]} </td>
                        </tr>
                      ))}
                    <tr>
                      <th>Total</th>
                      <th>
                        <FontAwesomeIcon icon={faRupeeSign} />
                        {item.total}
                      </th>
                    </tr>
                  </Table>
                </div>
                <p>Date Ordered : {item.date.slice(0, 10)}</p>
                <Button color="primary" onClick={() => getIndOrder(item._id)}>
                  Show QR
                </Button>
              </CardBody>
            </Card>
          ))}
      </CardColumns>
    </div>
  );

  return (
    <Base title="My Orders">
      {showQR()}
      {listAllNotifications()}
      {errorMessage()}
    </Base>
  );
};

export default UserOrders;
