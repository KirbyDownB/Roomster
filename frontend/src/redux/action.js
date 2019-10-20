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

export const tokenRefresh = () => {
  return dispatch => {
    if (localStorage.token) {
      return fetch(`"${ BASE_URL}/api/validat_token"`, {
        headers: {
          "Content-Type": "application/json",
          "Token": localStorage.token
        },
        method: "GET",
      })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.message === "Invalid"){
          //response message could change this is just placeholder
          localStorage.removeItem("token")
        }
        else {
          localStorage.setItem("token", resp.token) //token time refreshed
          //need to incorporate redux-persist in a future pr
          //this can also be handled by backend 
        }
      })
    }
  }
}

const loginUser = (user) => ({
  type: 'LOGIN_USER',
  payload: user
})

const logoutUser = (user) => ({
  type: 'LOGOUT_USER',
})
