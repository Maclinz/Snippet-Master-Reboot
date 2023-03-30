import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import queryString from "query-string";

let baseUrl = "https://snippetmastertest.onrender.com/api/v1";

export const userPublicProfile = (username) => {
  return fetch(`${baseUrl}/user/${username}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProfile = (token) => {
  return fetch(`${baseUrl}/user/profile`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//update user
export const updateUser = (token, user) => {
  return fetch(`${baseUrl}/user/update`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: user,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//get photo of user
export const getPhoto = (username) => {
  return fetch(`${baseUrl}/user/photo/${username}`, {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
