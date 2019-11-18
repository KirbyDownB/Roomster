import React, { Component } from 'react';
import './BasicProfile.css';
import { Button, Icon } from 'antd';
import {
  BASE_URL,
  showSuccessMessage,
  showErrorMessage,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_ERROR
} from '../../../../../constants';

class BasicProfile extends Component {
  handleSendFriendRequest = e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const { posterEmail } = this.props;

    fetch(`${BASE_URL}/api/friends/request/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      method: "POST",
      body: JSON.stringify({ friend: posterEmail })
    })
      .then(response => response.status === 400 ? Promise.reject() : response.json())
      .then(data => {
        console.log("Response after sending friend request", data);
        showSuccessMessage(ADD_FRIEND_SUCCESS);
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(ADD_FRIEND_ERROR);
      });
  }

  render() {
    return (
      <div className="basicprofile__container">
        <div className="basicprofile__title">Add Friend</div>
        <Button
          type="primary"
          htmlType="submit"
          className="basicprofile__addFriend"
          onClick={this.handleSendFriendRequest}
        >
          <Icon type="plus-circle" theme="filled"/>
          Send Friend Request
        </Button>
      </div>
    )
  }
}

export default BasicProfile;