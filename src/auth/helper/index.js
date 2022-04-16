import { API } from "../../backend";

export const signin = (user) => {
  console.log(`${API}`);
  try {
    return fetch(`${API}/auth/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (e) {}
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    console.log("1");
    return false;
  }
  if (localStorage.getItem("jwt")) {
    console.log("2 success");
    return JSON.parse(localStorage.getItem("jwt"));
    // return JSON.stringify(localStorage.getItem("jwt"));
  } else {
    console.log("3");
    return false;
  }
};

export const signup = (userId, token, user) => {
  console.log(userId);
  return fetch(`${API}/auth/signup/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      let k = response.json();
      console.log(k);
      return k;
    })
    .catch((err) => console.log(err));
};
export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    localStorage.removeItem("cart");
    next();

    return fetch(`${API}/auth/signout`, {
      method: "GET",
    })
      .then((response) => console.log("signout success"))
      .catch((err) => console.log(err));
  }
};
