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
              <img className="groupcards__profile-image" src={eric}></img>
              <div className="groupcards__title_container">
                <h1 className="groupcards__profile-title">Eric Ong</h1>
                <h2 className="groupcards__profile-sub">I like lorem ipsum</h2>
              </div>
            </div>
            <div className="groupcards__body">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
            <div className="groupcards__footer">
              <p className="groupcards__footer-text">Click here to &nbsp;</p>
              <p className="groupcards__footer-click" onClick={this.handleReply}>Reply &nbsp;</p>
              <p>or &nbsp;</p>
              <p className="groupcards__footer-click">Share</p>
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
