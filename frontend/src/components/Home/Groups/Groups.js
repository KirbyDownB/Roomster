import React, { Component } from 'react';
import GroupCards from './GroupCards/GroupCards';
import Reply from './Reply/Reply';
import { Popover, Icon, Popconfirm, Input, Button, Modal } from 'antd';
import './Groups.css';

const { Search } = Input;
const groupImg = require('../../../assets/imgs/people-2.svg')
const eric = require('../../../assets/eric.jpg')
const aditya = require('../../../assets/aditya.jpg')

class Groups extends Component {

  state = {
    visible: false,
    groupList: []
  }

  showModal = () => {
    this.setState({
      visible: true
    })
  }

  handleOk = () => {
    this.setState({
      visible: false
    })
  }

  groupList = () => {
    //fetch()
    // let fake = [
    //   {
    //     name: "Aditya Acharya",
    //     pf_pic: aditya,
    //   },
    //   {
    //     name: "Eric Ong",
    //     pf_pic: eric
    //   }
    // ]
    //
    // this.setState({
    //   groupList: fake
    // })
  }

  modalContent = () => {
    //add fetching of groups here
    return(
      <div>
        <div className="groups__sections">
          <h6>Settings</h6>
          <div className="groups__people-container">
            <Popconfirm
              placement="right"
              title="Are you sure?"
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              trigger="click"
            >
              <Icon className="groups__icon-button" type="exclamation-circle" />
            </Popconfirm>
            <p className="groups__people-text">Delete Group</p>
          </div>
        </div>
        <div className="groups__sections">
        <h6>Members</h6>
          <div className="groups__people-container">
            <Icon className="groups__icon-button" type="plus" />
            <p className="groups__people-text">Add People</p>
          </div>
          {this.state.groupList.map(({ name, pf_pic }, index) => {
            return(
              <div className="groups__user-container">
                <img className="groups__user-img" src={pf_pic}></img>
                <p className="groups__user-name">{name}</p>
              </div>
            )
          })
          }
          </div>
      </div>
    )
  }

  componentDidMount(){
    this.groupList();
  }

  render(){
    return(
      <div>
      {this.state.groupList.length > 0 ?
      <div className="container-fluid groups__container">
      <div className="row">
        <div className="col">
          <div className="groupcards__header">
              <h2 className="groupcards__header-text" onClick={this.showModal}>KirbyDownB</h2>
              <Modal
                title="Group Settings"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleOk}
                footer={[
                  <Button key="back" onClick={this.handleOk}>
                    Return
                  </Button>
                ]}
              >
                {this.modalContent()}
              </Modal>
            <div className="groupcards__icon-container">
            </div>
          </div>
        </div>
      </div>
        <div className="row">
          <div className="col groups__chat-container">
            <div>
              <div className="groups__chat-box">
                <GroupCards />
                <Reply />
                <Reply />
                <GroupCards />
              </div>
            </div>
          </div>
        </div>
      </div>:
      <div className="groups__empty-container">
        <div className="groups__empty-img-container">
          <div className="groups__empty-title-container">
            <h2 className="groups__empty-title">You are currently not part of a group</h2>
            <Button type="primary" shape="circle" icon="search" />
          </div>
          <img className="groups__empty-img" src={groupImg}>
          </img>
        </div>
      </div>
    }
    </div>
    )
  }
}

export default Groups;
