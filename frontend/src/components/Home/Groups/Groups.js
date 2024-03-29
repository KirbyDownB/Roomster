import React, { Component } from 'react';
import GroupCards from './GroupCards/GroupCards';
import MessageModal from './MessageModal/MessageModal';
import Reply from './Reply/Reply';
import Fade from 'react-reveal/Fade';
import { BASE_URL, showErrorMessage } from '../../../constants.js'
import { Popover, Icon, Popconfirm, Input, Button, Modal } from 'antd';
import { connect } from 'react-redux';
import spinner from '../../../assets/tail-spin.svg';
import './Groups.css';

const { Search } = Input;
const groupImg = require('../../../assets/imgs/people-2.svg')
const eric = require('../../../assets/eric.jpg')
const aditya = require('../../../assets/aditya.jpg')

class Groups extends Component {

  state = {
    loadingGroups: false,
    groupdId: "",
    postModal: false,
    addModal: false,
    visible: false,
    groupName: "",
    groupList: [],
    group: null,
    loading: false,
    body: "",
    subject: "",
    addingMember: ""
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

  handleLeaveGroup = () => {
    fetch(`${BASE_URL}/api/groups/leave/`, {
      headers: {
        "Authorization": localStorage.token
      },
      method: "GET"
    })
    .then(resp => resp.json())
    .then(resp => {
      if (resp.Message === "Successfully removed you from the group"){
        this.setState({
          groupList: []
        })
      }
    })
  }

  handleSubmit = () => {
    console.log(this.state.groupName)
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
      if (resp.group){
        this.setState({
          groupId: resp.group.group_id,
          group: resp.group.posts_in_group,
          groupName: resp.group.name,
          groupList: resp.group.members
        })
      }
      this.setState({
        loadingGroups: false
      })
    })
  }

  showAddModal = () => {
    this.setState({
      addModal: true
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

  handleAddCancel = () => {
    this.setState({
      addModal: false
    })
  }

  handleDeleteGroup = () => {
    fetch(`${BASE_URL}/api/groups/delete_group/`, {
      headers: {
        'Authorization': localStorage.token
      },
      method: 'GET'
    })
    .then(response => response.status === 400 ? Promise.reject() : response.json())
    .then(resp => {
      if (resp.Message === "Successfully removed you from the group and deleted group"){
        this.setState({
          groupList: []
        })
      }
    })
    .catch(error => {
      console.error(error);
      showErrorMessage(error);
    });
  }

  handleDelete = () => {
    fetch(`${BASE_URL}/api/groups/leave/`, {
      headers: {
        'Authorization': 'localStorage.token'
      },
      method: 'GET'
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
  }

  handleAddMembers = () => {
    console.log(this.state.addingMember)
    fetch(`${BASE_URL}/api/groups/add/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      },
      method: "POST",
      body: JSON.stringify({
        new_group_member: this.state.addingMember,
        group_id: this.state.groupId
      })
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
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

  removePost = (postId) => {
    this.setState({
      group: this.state.group.filter(post => post.posting_id != postId)
    })
  }

  handleDeleteRequests = (email) => {
    this.setState({
      requestsList: this.state.requestsList.filter(user => user.email != email)
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
              onConfirm={this.handleDeleteGroup}
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
    this.setState({
      loadingGroups: true
    })
    this.groupList();
  }

  render(){

    return(
      <div>
      {this.state.loadingGroups ? (
        <img className="groups__spinner" src={spinner} alt=""/>
      ) : (
        <div>
        {this.state.groupList.length > 0 ?
        <Fade>
        <div className="container-fluid groups__container">
        <div className="row">
          <div className="col">
            <div className="groupcards__header">
                <h2 className="groupcards__header-text" onClick={this.showModal}>{this.state.groupName}</h2>
                <Modal
                  title="Reply Message"
                  visible={this.state.postModal}
                  onOk={this.handlePostOk}
                  onCancel={this.handlePostOk}
                  footer={[
                    <Button key="back" onClick={this.handlePostOk}>
                      Return
                    </Button>,
                    <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handlePostSubmit}>
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
            <div className="col" style={{paddingBottom: '3%'}}>
              <Button className="groups__header-buttons" icon="form" onClick={this.handlePost} type="primary">New Post</Button>
              <Button className="groups__header-buttons_delete" icon="export" onClick={this.handleLeaveGroup} type="primary">Leave Group</Button>
              <Popconfirm
                placement="right"
                title="Are you sure?"
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                trigger="click"
                onConfirm={this.handleDeleteGroup}
              >
                <Button className="groups__header-buttons_delete" icon="delete" type="primary">Delete Group</Button>
              </Popconfirm>
            </div>

          </div>
          <div className="row">
            <div className="col-11 groups__chat-container">
              <div style={{width: '100%'}}>
              {this.state.group.length > 0 ?
                <div>
                {this.state.group.map(props => {
                  return(
                    <div>
                      <GroupCards handlePost={this.handlePost} removePost={this.removePost} user={this.props.user} {...props}  />
                    </div>
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
              {this.state.groupList.length > 0 &&
                <div>
                  {this.state.groupList.map(({name, pf_pic}) => {
                    return(
                      <div style={{textAlign: 'center', marginBottom: '15px'}}>
                        <img className="groups__image-dd" src={pf_pic}></img>
                        <p>{name}</p>
                      </div>
                    )
                  })
                }
                </div>
              }
              <Button style={{marginBottom: '15px'}} className="groups__image-dd" onClick={this.showAddModal} shape="circle" icon="plus" />
              <Modal
                title="Add Members"
                visible={this.state.addModal}
                onCancel={this.handleAddCancel}
                footer={[
                  <Button key="back" onClick={this.handleAddCancel}>
                    Return
                  </Button>,
                  <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleAddMembers}>
                    Submit
                  </Button>
                ]}
              >
                <Input name="addingMember" onChange={this.handleChange} placeHolder="Enter username"/>
              </Modal>
            </div>
          </div>
        </div>
        </Fade>
        :
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
