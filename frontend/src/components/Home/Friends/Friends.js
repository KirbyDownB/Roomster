import React, { Component } from 'react';
import Cards from './Cards';
import Requests from './Requests/Requests';
import { Modal, Input, Select, Radio, Icon, Popover, Button } from 'antd';
import { BASE_URL, ADD_FRIEND_ERROR, showErrorMessage } from '../../../constants.js';

import './Friends.css';

const { Search } = Input;
const eric = require("../../../assets/eric.jpg")
const aditya = require("../../../assets/aditya.jpg")


class Friends extends Component {

  state = {
    friendsList: [],
    requestsList: [],
    email: "",
    visible: false,
    loading: false
  }

  fetchFriends = () => {
    fetch(`${BASE_URL}/api/friends/friends_list/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      },
      method: "POST",
      body: JSON.stringify({})
    })
    .then(resp => resp.json())
    .then(resp => {
      this.setState({
        friendsList: resp.friends
      })
    })
  }

  fetchRequests = () => {
    fetch(`${BASE_URL}/api/friends/request_list/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      },
      method: "POST",
      body: JSON.stringify({})
    })
    .then(resp => resp.json())
    .then(resp => {
      this.setState({
        requestsList: resp.friends
      })
    })
  }

  handleDeleteRequests = (email) => {
    this.setState({
      requestsList: this.state.requestsList.filter(user => user.Email != email)
    })
  }

  handleDelete = (email) => {
    this.setState({
      friendsList: this.state.friendsList.filter(user => user.Email != email)
    })
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleModal = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  handleSearch = () => {
    fetch(`${BASE_URL}/friends/_list`)
  }

  handleAdd = () => {
    const email = this.state.email;
    if (email) {
      this.setState({
        loading: true
      })

      fetch(`${BASE_URL}/api/friends/request/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.token
        },
        method: "POST",
        body: JSON.stringify({
          friend: this.state.email
        })
      })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp)
        if (resp.Message === "Friend email DNE"){
          showErrorMessage(ADD_FRIEND_ERROR)
        }
        this.setState({
          loading: false
        })
      })
      .catch(err => console.log(err))
    }
  }

  mapRequests = () => {
    return(
      <div>
        {this.state.requestsList.map(({ email, pf_pic, name, occupation }, index) => {
          return(
            <Requests handleDeleteRequests={this.handleDeleteRequests} email={email} img={pf_pic} name={name} title={occupation} />
          )
        })}
      </div>
    )
  }

  componentDidMount() {
    this.fetchFriends()
  }

  render(){
    console.log(this.state.requestsList)
    return(
      <div className="friends__container">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-2">
              <h2 className="friends__title">Friends</h2>
            </div>
            <div className="col-10">
              <Input
                prefix={<Icon type="search"/>}
                placeholder="Search for your friends"
                className="friends__search-input"
                onPressEnter={this.handleSearch}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <Popover
                title="Friend Requests"
                placement="bottom"
                content={this.mapRequests()}
                trigger="click"
              >
                <Button className="friends__requests-button" type="primary" onClick={this.fetchRequests}>Requests</Button>
              </Popover>
              <Button type="primary" onClick={this.handleModal} className="friends__add-button">Add Friends </Button>
              <Modal
                 title={"Add Friends"}
                 visible={this.state.visible}
                 onOk={this.handleOk}
                 onCancel={this.handleCancel}
                 footer={[
                            <Button type="primary" loading={this.state.loading} onClick={this.handleAdd}>
                              Add
                            </Button>
                          ]}
              >
                <div>
                  <Input autocomplete="off" onChange={this.handleInput} name="email" value={this.state.email} placeholder="Enter email"></Input>
                </div>
              </Modal>
            </div>
          </div>
          {this.state.friendsList.length > 0 &&  <div className="friends__list--container">
            <div className="row">
              {this.state.friendsList.map(item => {
                return (
                  <div className="col-3">
                    <Cards handleDelete={this.handleDelete} {...item}/>
                  </div>
                )
              })}
            </div>
          </div>
        }
        </div>
      </div>
    )
  }
}

export default Friends
