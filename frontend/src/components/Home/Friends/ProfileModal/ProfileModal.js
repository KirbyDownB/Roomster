import React, { Component } from 'react';
import { BASE_URL } from '../../../../constants.js';

class ProfileModal extends Component {

  state = {

  }

  fetchProfile = () => {
    const token = localStorage.token
    fetch(`${BASE_URL}/api/retrieve_profile/`, {
      headers: {
        "Content": "application/json",
        "Authorization": token
      },
      method: "GET"
    })
    .then(resp => resp.json())
    .then(resp => {
      console.log("hey");
      console.log(resp);
    })
  }

  componentDidMount(){
    this.fetchProfile()
  }

  render(){
    return(
      <div>
        {this.props.email}
      </div>
    )
  }
}

export default ProfileModal;
