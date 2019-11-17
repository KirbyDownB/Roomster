import React, { Component } from 'react';
import { Modal, Button, Icon, Popconfirm } from 'antd';
import ProfileModal from './ProfileModal/ProfileModal';
import './Cards.css';

const profile = require('../../../assets/imgs/default.jpg');

class EmptyCard extends Component {
  state = {
    visible: false
  }

  deleteCard = () => {
    this.props.handleDelete(this.props.email)
  }

  handleModal = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  render(){
    return(
      <div className="cards__bg">
        <div className="cards__profile-wrapper">
          <img src={profile} className="cards__profile-pic">
          </img>
          <p className="cards__profile-name">Add friends</p>
        </div>
        <div className="cards__profile-title">
          <p className="cards__profile-inner">User</p>
        </div>
        <div className="cards__footer">
          <Button className="cards__button-left" onClick={this.handleModal} icon="user">Profile</Button>
          <div style={{border: '0.5px solid #BEBEBE'}}></div>
            <Button className="cards__button-right" icon="user-delete">Delete</Button>
        </div>
      </div>
    )
  }
}

export default EmptyCard;
