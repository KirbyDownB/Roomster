import React from 'react';
import { BASE_URL } from '../constants.js';

export const userLoginFetch = (email, password) => {
  return dispatch => {
    return fetch(`${BASE_URL}/api/login/`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.Message === "Login Successful"){
        localStorage.setItem("token", resp.token)
        console.log(resp.user)
        dispatch(loginUser(resp.user)); //backend needs to return user as well
      }
    })
  }
}

export const userRegisterFetch = (user) => {
  const formData = new FormData();

  Object.entries(user).forEach(item => {
    formData.append(item[0], item[1]);
  });

  return dispatch => {
    return fetch(`${BASE_URL}/api/signup/`, {
      method: "POST",
      body: formData
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
  }
}

export const tokenRefresh = () => {
  return dispatch => {
    if (localStorage.token) {
      return fetch(`${BASE_URL}/api/update_profile/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.token
        },
        method: "GET",
      })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        if (resp.Message === "Data retrieval successful"){
          console.log("refreshed")
          dispatch(loginUser(resp.user)); //backend needs to return user as well
        }
        else {
          localStorage.removeItem("token")
          //need to incorporate redux-persist in a future pr
          //this can also be handled by backend
        }
      })
    }
    else {
      console.log("no token")
    }
  }
}

const loginUser = (user) => ({
  type: 'USER_LOGIN',
  payload: user
})

const logoutUser = (user) => ({
  type: 'USER_LOGOUT',
})
