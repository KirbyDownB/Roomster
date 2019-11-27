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
          <p>{this.props.body}</p>
        </div>
      </div>
    )
  }
}
export default Reply;
