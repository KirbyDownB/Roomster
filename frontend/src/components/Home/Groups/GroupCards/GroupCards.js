import React, { Component } from 'react';
import { Button, Modal, Input, Popover, Icon, Popconfirm } from 'antd';
import MessageModal from '../MessageModal/MessageModal';
import Reply from '../Reply/Reply';
import { BASE_URL } from '../../../../constants'
import './GroupCards.css';

const eric = require('../../../../assets/eric.jpg')
const aditya = require('../../../../assets/aditya.jpg')
const { Search } = Input;

class GroupCards extends Component {
  state = {
    visible: false,
    loading: false,
    name: "",
    subject: "",
    body: ""
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value });
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

  handleDeletePost = () => {
    this.props.removePost(this.props.posting_id)
    fetch(`${BASE_URL}/api/groups/delete_post/`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": localStorage.token
      },
      method: "DELETE",
      body: JSON.stringify({
        posting_id: this.props.posting_id
      })
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
  }

  handleSearch = (value) => {
    //TODO fetch
    console.log(value)
  }

  handleReplyModal = () => {
    this.setState({
      visible: true
    })
  }

  handleAddReply = () => {
    this.setState({
      loading: true
    })
    fetch(`${BASE_URL}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      },
      method: "POST",
      body: JSON.stringify({
        subject: this.state.subject,
        body: this.state.body
      })
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))
  }

  componentDidMount(){
  }

  render(){
    console.log(this.props.date.slice(0,10))
    console.log(this.props.date.slice(11,20))
    return(
      <div className="container-fluid">
      <div className="row">
        <div className="groupcards__container">
            <div className="groupcards__profile">
              <img className="groupcards__profile-image" src={this.props.user.pf_pic}></img>
              <div className="groupcards__title_container">
                <div className="groupcards__title_inner_container">
                  <div style={{width: '100%', alignItems: 'center'}}>
                    <h1 className="groupcards__profile-title">{this.props.user.name}</h1>
                  </div>
                  <div style={{width: '100%', float: 'right'}}>
                    <h2 className="groupcards__profile-date">{this.props.date.slice(0,10)}</h2>
                  </div>
                </div>
                <div className="groupcards__title_inner_container">
                  <div style={{width: '100%'}}>
                    <h2 className="groupcards__profile-sub">{this.props.name}</h2>
                  </div>
                  <div style={{width: '100%', float: 'right'}}>
                    <h2 className="groupcards__profile-date">{this.props.date.slice(11,20)}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="groupcards__body">
              {this.props.content}
            </div>
            <div className="groupcards__footer">
              <p className="groupcards__footer-text">Click here to &nbsp;</p>
              <Popconfirm
                placement="right"
                title="Are you sure?"
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                trigger="click"
                onConfirm={this.handleDeletePost}
              >
                <p className="groupcards__footer-click">Remove</p>
              </Popconfirm>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default GroupCards;
