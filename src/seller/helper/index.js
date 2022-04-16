import { API } from "../../backend";

export const deleteFoodItem=(userId,token,noteId)=>{
  return fetch(`${API}/fooditem/deletefooditem/${noteId}/${userId}`, {
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

export const postFoodItem = (userId, token, item) => {
  return fetch(`${API}/fooditem/postItem/${userId}`, {
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

export const getAllFoodItems = (userId, token) => {
  return fetch(`${API}/fooditem/getall/${userId}`, {
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

export const updateAvailability = (userId, token, foodId) => {
  return fetch(`${API}/fooditem/updateavailability/${userId}/${foodId}`, {
    method: "PUT",
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

export const resetTime = (userId, token, foodId) => {
  return fetch(`${API}/fooditem/resettime/${userId}/${foodId}`, {
    method: "PUT",
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

