import React, { useState, useEffect } from "react";
import { API } from "../backend";
import Base from "../core/Base";
import {
  loadCart,
  removeItemFromCart,
  cartEmpty,
} from "../canteen/helper/cartHelper";
import {
  Button,
  CardColumns,
  Card,
  CardImg,
  CardBody,
  CardText,
  CardHeader,
  Row,
  Col,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRupeeSign,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";

const CartList = () => {
  const { user, token } = isAuthenticated();

  const redirecttohome = () => {
    if (getredirect) {
      return <Redirect to="/" />;
    }
  };
  const preload = () => {
    setProducts(loadCart());
  };
  useEffect(() => {
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [products, setProducts] = useState([]);

  const removeFromCart = (item) => {
    removeItemFromCart(item);
    preload();
  };

  const [getredirect, setRedirect] = useState(false);

  // ---------------------------------------------
  // ---------------------------------------------
  // ---------------------------------------------
  //start of razorpay

  async function displayRpay() {
    let l = [];
    for (let i in products) {
      if (l.length === 0) {
        l.push([products[i].title, 1]);
      } else {
        let flag = 0;
        for (let j in l) {
          if (l[j][0] === products[i].title) {
            l[j][1] += 1;
            flag = 1;
          }
        }
        if (flag === 0) {
          l.push([products[i].title, 1]);
        }
      }
    }
    l.push(["Total", sum]);
    l.push("ID", user._id);
    console.log(l.toString());
    let s = l.toString();
    const res = await razorPayLoad(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const amount = { sum: sum };
    const data = await fetch(`${API}/rpay/razorpay/${user._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(amount),
    }).then((t) => t.json());
    console.log(data);
    var options = {
      key: "rzp_test_NTNqjF2wPZCmCG",
      amount: data.amount.toString(),
      currency: data.currency,
      name: "Dev Jam",
      description: s,
      order_id: data.id,
      handler: function (response) {
        cartEmpty();
        preload();
        setRedirect(true);
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#000",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  const razorPayLoad = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  //end of razorpay
  // ---------------------------------------------
  // ---------------------------------------------
  // ---------------------------------------------

  let sum = 0;
  const calculateSum = () => {
    sum = 0;
    if (products) {
      products.map((product, index) => (sum += product.price));
      console.log(sum);
    }
    return (
      <div
        style={{
          textAlign: "center",
          color: "white",
          background: "black",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <h3>Total Amount : ₹{sum}</h3>
        <Button
          style={{ background: "white", color: "black", margin: "10px" }}
          onClick={displayRpay}
        >
          <FontAwesomeIcon icon={faRupeeSign} size="1x" /> Proceed To Checkout
        </Button>
        <Link to="/canteen">
          <Button style={{ background: "white", color: "black" }}>
            <FontAwesomeIcon icon={faPlusSquare} /> Add More Items
          </Button>
        </Link>
      </div>
    );
  };

  const listAllItems = () => (
    <div>
      {(!products || products.length === 0) && (
        <div
          style={{
            textAlign: "center",
            color: "white",
            background: "black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>Cart is Empty</h3>
          <Link to="/canteen">
            <Button>Add Some Items</Button>
          </Link>
        </div>
      )}
      {products && products.length !== 0 && calculateSum()}
      <CardColumns>
        {products &&
          products.map((item, index) => (
            <Card key={index} style={{ textAlign: "center" }}>
              <CardHeader>
                <b>{item.title}</b>
              </CardHeader>
              <CardImg top width="100%" src={item.image_url} />
              <CardBody>
                <CardText>{item.description}</CardText>
                <Row>
                  <Col>
                    <Button>Price: {item.price}</Button>
                  </Col>
                  <Col>
                    {item.available && (
                      <Button
                        color="danger"
                        onClick={() => removeFromCart(item._id)}
                      >
                        Remove From Cart
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          ))}
      </CardColumns>
    </div>
  );

  return (
    <Base title="Manage Food Items">
      {listAllItems()}
      {redirecttohome()}
    </Base>
  );
};

export default CartList;
