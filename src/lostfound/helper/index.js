import { API } from "../../backend";

export const getLostItems = (userId, token) => {
  return fetch(`${API}/item/getLostItems/${userId}`, {
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

export const getFoundItems = (userId, token) => {
  return fetch(`${API}/item/getFoundItems/${userId}`, {
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

export const postItem = (userId, token, item) => {
  return fetch(`${API}/item/postItem/${userId}`, {
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


export const claimItem=(userId,token,itemId)=>{
  return fetch(`${API}/item/claim/${itemId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}

export const unClaimItem=(userId,token,itemId)=>{
  return fetch(`${API}/item/unclaim/${itemId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}

export const deleteItem=(userId,token,itemId)=>{
  return fetch(`${API}/item/delete/${itemId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
}