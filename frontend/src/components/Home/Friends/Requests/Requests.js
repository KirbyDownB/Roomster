 import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { BASE_URL } from '../../../../constants';
import './Requests.css';

const eric = require("../../../../assets/eric.jpg")


class Requests extends Component {

  handleAccept = () => {
    fetch(`${BASE_URL}/api/friends/add_friend_request/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      },
      method: "POST",
      body: JSON.stringify({
        friend: this.props.email
      })
    })
    .then(response => response.status === 400 ? Promise.reject() : response.json())
    .then(resp => {
      console.log(resp);
      this.props.handleDeleteRequests(this.props.email);
    })
  }

  handleIgnore = () => {
    console.log(localStorage.token)
    fetch(`${BASE_URL}/api/friends/delete_friend_request/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      },
      method: "DELETE",
      body: JSON.stringify({
        friend: this.props.email
      })
    })
    .then(response => response.status === 400 ? Promise.reject() : response.json())
    .then(resp => {
      console.log(resp);
      this.props.handleDeleteRequests(this.props.email);
    })
  }

  render(){
    return(
      <div>
        <div className="requests__row">
          <img src={this.props.img} className="requests__img"></img>
          <div className="requests__body">
            <p className="requests__text">{this.props.name}</p>
            <p className="requests__text-title">{this.props.title}</p>
          </div>
          <Button className="requests__button-add" onClick={this.handleAccept} type="primary" icon="user-add">
             Add Friend
          </Button>
          <Button className="requests__button-remove" onClick={this.handleIgnore} icon="export">
             Ignore
          </Button>
        </div>
      </div>
    )
  }
}

export default Requests;
