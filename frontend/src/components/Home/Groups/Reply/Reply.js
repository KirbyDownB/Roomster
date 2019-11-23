import React, { Component } from 'react';
import { Icon } from 'antd';
import './Reply.css';

class Reply extends Component {
  render(){
    return(
      <div className="reply__container">
        <div className="reply__container-left">
          <Icon style={{fontSize: '20px', float: 'right'}}type="arrow-right" />
        </div>
        <div className="reply__container-right">
          <h6 className="reply__title">Aditya Acharya</h6>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
        </div>
      </div>
    )
  }
}
export default Reply;
