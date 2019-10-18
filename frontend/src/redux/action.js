import React from 'react';
import { BASE_URL } from '../const.js';

export const userLoginFetch = (username, password) => {
  return dispatch => {
    return fetch(`"${ BASE_URL }/api/login"`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.message === "Login Successful"){
        dispatch(loginUser(resp.user)); //backend needs to return user as well
        localStorage.setItem("token", resp.token)
      }
      else {
        //TODO invalid user
      }
    })
  }
}

const loginUser = (user) => ({
  type: 'LOGIN_USER',
  payload: user
})
