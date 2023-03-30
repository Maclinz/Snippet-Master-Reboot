import fetch from "isomorphic-fetch";
import cookie from "js-cookie";

let baseUrl = "https://snippetmastertest.onrender.com/api/v1";

export const signup = (user) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signin = (user) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signout = (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  next();

  return fetch(`${baseUrl}/signout`, {
    method: "GET",
  })
    .then((res) => {
      console.log("signout success");
    })
    .catch((err) => {
      console.log(err);
    });
};

//set cookie
export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

//get cookie
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};

//local storage
export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
export const removeLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};
//authenticate user
export const authenticate = (data, next) => {
  console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", data);
  setCookie("token", data.token);
  setCookie("user", JSON.stringify(data.user));
  setLocalStorage("user", data.user);
  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
};
