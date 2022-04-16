import { API } from "../../backend";
export const getAllOrdersOfUser = (userId, token) => {
  return fetch(`${API}/order/getallorders/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      let k = response.json();
      console.log(k);
      return k;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getOrderById = (userId, token, id) => {
  return fetch(`${API}/order/getindorder/${userId}/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      let k = response.json();
      console.log(k);
      return k;
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getAllOrders = (userId, token) => {
  return fetch(`${API}/order/getalltheorders/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      let k = response.json();
      console.log(k);
      return k;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const markAsDelivered = (userId, token, id) => {
  return fetch(`${API}/order/markdelivered/${userId}/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
