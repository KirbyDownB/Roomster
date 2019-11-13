import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import './Cards.css';

class Cards extends Component {
  render(){
    return(
      <div className="cards__bg">
        <div className="cards__profile-wrapper">
          <img src={this.props.img} className="cards__profile-pic">
          </img>
          <p className="cards__profile-name">{this.props.name}</p>
        </div>
        <div className="cards__profile-title">
          <p className="cards__profile-inner">Student</p>
        </div>
        <div className="cards__footer">
          <Button className="cards__button-left" icon="user">Profile</Button>
          <div style={{border: '0.5px solid #BEBEBE'}}></div>
          <Button className="cards__button-right" icon="user-delete">Delete</Button>
        </div>
      </div>
    )
  }
}

export default Cards;
