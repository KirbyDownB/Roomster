import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import './Requests.css'

const eric = require("../../../assets/eric.jpg")


class Requests extends Component {
  handleAdd = () => {

  }

  handleIgnore = () => {

  }
  
  render(){
    return(
      <div>
        <div className="requests__row">
          <img src={eric} className="requests__img"></img>
          <div className="requests__body">
            <p className="requests__text">Eric Ong</p>
            <p className="requests__text-title">Student</p>
          </div>
          <Button className="requests__button-add" onClick={this.handleAdd} type="primary" icon="user-add">
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
