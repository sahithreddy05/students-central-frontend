import { API } from "../../backend";

export const getAllNotifications = (userId, token) => {
  return fetch(`${API}/notification/getallnotifications/${userId}`, {
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

export const deleteNotification=(userId,token,noteId)=>{
    return fetch(`${API}/notification/deletenotification/${noteId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  }

  export const postNotification = (userId, token, item) => {
    return fetch(`${API}/notification/postnotification/${userId}`, {
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