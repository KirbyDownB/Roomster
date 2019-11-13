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
        dispatch(loginUser(resp.user)); //backend needs to return user as well
      }
      else {
      }
    })
  }
}

export const userRegisterFetch = (user) => {
  console.log(user)
  return dispatch => {
    return fetch(`${ BASE_URL }/api/signup/`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        email: user.email,
        password: user.passwordOne,
        first_name: user.firstName,
        last_name: user.lastName,
        address: user.address,
        phone_number: user.phoneNumber,
        age: user.age,
        range: "",
        location_of_interest: user.location,
        ethnicity: user.ethnicity,
        range_max: user.priceRange[1],
        range_min: user.priceRange[0],
        num_roommates: user.numRoommates,
        duration: ""
      })
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
