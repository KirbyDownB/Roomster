import React, { Component } from 'react';
import GroupCards from './GroupCards/GroupCards';
import MessageModal from './MessageModal/MessageModal';
import Reply from './Reply/Reply';
import { BASE_URL } from '../../../constants.js'
import { Popover, Icon, Popconfirm, Input, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import './Groups.css';

const { Search } = Input;
const groupImg = require('../../../assets/imgs/people-2.svg')
const eric = require('../../../assets/eric.jpg')
const aditya = require('../../../assets/aditya.jpg')

class Groups extends Component {

  state = {
    postModal: false,
    visible: false,
    groupName: "",
    groupList: [],
    group: null,
    loading: false,
    body: "",
    subject: ""
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

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = () => {
    fetch(`${BASE_URL}/api/groups/create/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      },
      method: "POST",
      body: JSON.stringify({
        group_name: this.state.groupName
      })
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
  }

  groupList = () => {
    fetch(`${BASE_URL}/api/groups/group/`, {
      headers: {
        "Authorization": localStorage.token
      },
      method: "GET"
    })
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp.group)
      if (resp.group){
        this.setState({
          group: resp.group.posts_in_group,
          groupName: resp.group.name,
          groupList: resp.group.members
        })
      }
    })
  }

  handlePost = () => {
    this.setState({
      postModal: true
    })
  }

  handlePostOk = () => {
    this.setState({
      postModal: false
    })
  }

  handlePostSubmit = () => {
    this.setState({
      loading: true
    })

    fetch(`${BASE_URL}/api/groups/create_post/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      },
      method: "POST",
      body: JSON.stringify({
        name: this.state.subject,
        content: this.state.body
      })
    })
    .then(resp => resp.json())
    .then(resp => {
      console.log(resp);
      this.setState({
        loading: false,
        postModal: false
      })
    })
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
                title="Reply Message"
                visible={this.state.postModal}
                onOk={this.handlePostOk}
                onCancel={this.handlePostOk}
                footer={[
                  <Button key="back" loading={this.state.loading} onClick={this.handleOk}>
                    Return
                  </Button>,
                  <Button key="submit" type="primary" onClick={this.handlePostSubmit}>
                    Send
                  </Button>
                ]}
              >
                <MessageModal handleChange={this.handleChange} email={this.props.user.email} name={this.state.groupName}/>
              </Modal>
          </div>
        </div>
      </div>
        <div className="row">
          <div className="col-4" style={{paddingBottom: '3%'}}>
            <Button className="groups__header-buttons" icon="form" onClick={this.handlePost} type="primary">New Post</Button>
            <Popconfirm
              placement="right"
              title="Delete Group?"
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              trigger="click"
            >
              <Button className="groups__header-buttons_delete" icon="delete" type="primary">Are you sure?</Button>
            </Popconfirm>
          </div>

        </div>
        <div className="row">
          <div className="col-11 groups__chat-container">
            <div>
            {this.state.group.length > 0 ?
              <div>
              {this.state.group.map(props => {
                return(
                  <GroupCards handlePost={this.handlePost} {...props}  />
                )
              })
              }
              </div>
            :
              null
            }
            </div>
          </div>
          <div className="col-1 groups__drop-down">
            <img className="groups__image-dd" src={eric}></img>
            <img className="groups__image-dd" src={eric}></img>
            <Button className="groups__image-dd" shape="circle" icon="plus" />
          </div>
        </div>
      </div>:
      <div className="groups__empty-container">
        <div className="groups__empty-img-container">
          <div className="groups__empty-title-container">
            <h2 className="groups__empty-title">You are currently not part of a group</h2>
            <div style={{width: '50px'}}>
              <Button onClick={this.showModal} type="primary" shape="circle" icon="plus" />
            </div>
            <Modal
              title="Group Settings"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleOk}
              footer={[
                <Button
                  type="primary"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>,
                <Button key="back" onClick={this.handleOk}>
                  Return
                </Button>
              ]}
            >
            <Input
              placeholder="Enter your group name"
              name="groupName"
              value={this.state.groupName}
              onChange={this.handleChange}
              prefix={<Icon type="team" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
            </Modal>
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

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  null
)(Groups);
