import { API } from "../../backend";

export const getUserComplaints = (userId, token) => {
  return fetch(`${API}/complaint/getUserComplaints/${userId}`, {
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

export const getAllComplaints = (userId, token) => {
    return fetch(`${API}/complaint/getAllComplaints/${userId}`, {
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


  export const postComplaint = (userId, token, item) => {
    return fetch(`${API}/complaint/postComplaint/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: item,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };