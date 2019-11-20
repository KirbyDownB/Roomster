import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import './ProfileModal.css';
import { BASE_URL } from '../../../../constants.js';


class ProfileModal extends Component {

  state = {

  }

  render(){
    return(
      <div>
        <div className="profilemodal__header">
          <div className="profilemodal__image-container">
            <img className="profilemodal__image" src={this.props.pf_pic}></img>
          </div>
          <div className="profilemodal__header-text">
            <h4 className="profilemodal__header-name">{this.props.name}</h4>
            <h6 className="profilemodal__header-occupation">{this.props.occupation}</h6>
          </div>
        </div>
        <div className="container-fluid profilemodal__body">
          <div className="row profilemodal__body-container">
            <div className="col-6 profilemodal__col">
              <div className="profilemodal__icon-container">
                <Icon className="profilemodal__icon" type="mail"/>
                <p className="profilemodal__icon-text"style={{margin: '0'}}>{this.props.email}</p>
              </div>
            </div>
            <div className="col-6 profilemodal__col">
              <div className="profilemodal__icon-container">
                <Icon className="profilemodal__icon" type="phone"/>
                <p className="profilemodal__icon-text"style={{margin: '0'}}>{this.props.phone_number}</p>
              </div>
            </div>
          </div>
          <div className="row profilemodal__body-container">
            <div className="col-6 profilemodal__col">
              <div className="profilemodal__icon-container">
                <Icon className="profilemodal__icon" type="environment"/>
                <p className="profilemodal__icon-text"style={{margin: '0'}}>{this.props.location_of_interest}</p>
              </div>
            </div>
            <div className="col-6 profilemodal__col">
              <div className="profilemodal__icon-container">
                <Icon className="profilemodal__icon" type="calendar"/>
                <p className="profilemodal__icon-text"style={{margin: '0'}}>{this.props.duration}</p>
              </div>
            </div>
          </div>
          <div className="row profilemodal__body-container">
            <div className="col-12 profilemodal__col">
              <div className="profilemodal__icon-container">
                <Icon className="profilemodal__icon" type="user"/>
                <p className="profilemodal__icon-text"style={{margin: '0'}}>{this.props.ethnicity}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfileModal;
