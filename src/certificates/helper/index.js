import { API } from "../../backend";

export const getUserCertificates = (userId, token) => {
  return fetch(`${API}/certificate/getcertbyid/${userId}`, {
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

export const getAllCerts = (userId, token) => {
  return fetch(`${API}/certificate/getallcerts/${userId}`, {
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
export const getCertsByRoll = (userId, token, roll) => {
  return fetch(`${API}/certificate/getcertbyroll/${userId}/${roll}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addCert = (userId, token, cert) => {
  return fetch(`${API}/certificate/postcert/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: cert,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
