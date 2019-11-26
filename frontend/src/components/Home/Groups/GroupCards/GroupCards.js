import React, { Component } from 'react';
import { Button, Modal, Input, Popover, Icon, Popconfirm } from 'antd';
import MessageModal from '../MessageModal/MessageModal';
import Reply from '../Reply/Reply';
import './GroupCards.css';

const eric = require('../../../../assets/eric.jpg')
const aditya = require('../../../../assets/aditya.jpg')
const { Search } = Input;


class GroupCards extends Component {
  state = {
    visible: false,
    name: ""
  }

  handleReply = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  handleSearch = (value) => {
    //TODO fetch
    console.log(value)
  }

  componentDidMount(){
    //add fetching here
    this.setState({
      name: "KirbyDownB"
    })
  }

  render(){
    return(
      <div className="container-fluid">
      <div className="row">
        <div className="groupcards__container">
            <div className="groupcards__profile">
              <img className="groupcards__profile-image" src={this.props.user.pf_pic}></img>
              <div className="groupcards__title_container">
                <h1 className="groupcards__profile-title">{this.props.user.name}</h1>
                <h2 className="groupcards__profile-sub">{this.props.name}</h2>
              </div>
            </div>
            <div className="groupcards__body">
              {this.props.content}
            </div>
            <div className="groupcards__footer">
              <p className="groupcards__footer-text">Click here to &nbsp;</p>
              <p className="groupcards__footer-click" onClick={this.props.handlePost}>Reply &nbsp;</p>
              <p>or &nbsp;</p>
              <p className="groupcards__footer-click">Remove</p>
            </div>
            <div>
            </div>
              <Modal
                title="Reply Message"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="back" onClick={this.handleCancel}>
                    Return
                  </Button>,
                  <Button key="submit" type="primary" onClick={this.handleOk}>
                    Send
                  </Button>
                ]}
              >
                <MessageModal />
              </Modal>
          </div>
        </div>
      </div>
    )
  }
}

export default GroupCards;
