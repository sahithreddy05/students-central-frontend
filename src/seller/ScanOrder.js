import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { getOrderById, markAsDelivered } from "../orders/helper";
import { isAuthenticated } from "../auth/helper";
import Modal from "react-awesome-modal";
import Base from "../core/Base";
import { Button } from "reactstrap";
const ScanOrder = () => {
  const [result, setResult] = useState("");
  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  const [flag, setflag] = useState(0);
  const { user, token } = isAuthenticated();
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState("");
  const closeModal = () => {
    setVisible(false);
  };
  const getOrderDets = () => {
    if (flag === 0 && result !== "") {
      getOrderById(user._id, token, result)
        .then((data) => {
          setOrder(data);
          if (order !== "") {
            setflag(1);
            setVisible(true);
          }
          console.log(order);
        })
        .catch((err) => console.log(err));
    }
  };
  const markItem = (id) => {
    markAsDelivered(user._id, token, id).then((data) => console.log(data));
    setflag(0);
  };
  const displayOrder = () => {
    getOrderDets();
    return (
      <Modal
        visible={visible}
        width="300"
        height="300"
        effect="fadeInUp"
        onClickAway={() => closeModal()}
      >
        <div>
          <h4>{order.items}</h4>
          {!order.status && (
            <Button onClick={() => markItem(order._id)}>
              Mark As Delivered
            </Button>
          )}
        </div>
      </Modal>
    );
  };

  const restart = () => {
    setflag(0);
  };
  return (
    <Base>
      <div>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "300px" }}
        />
        <p>{result}</p>
      </div>
      {displayOrder()}
      <Button onClick={restart}>Scan Next</Button>
    </Base>
  );
};

export default ScanOrder;
