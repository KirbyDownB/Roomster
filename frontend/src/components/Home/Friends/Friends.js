import React, { Component } from 'react';
import Cards from './Cards';
import EmptyCard from './EmptyCard';
import Requests from './Requests/Requests';
import { Modal, Input, Select, Radio, Icon, Popover, Button } from 'antd';
import { BASE_URL, ADD_FRIEND_ERROR, ADD_FRIEND_ERROR_YOURSELF, ADD_FRIEND_SUCCESS, SEARCH_FRIEND_ERROR, showErrorMessage, showSuccessMessage } from '../../../constants.js';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

import './Friends.css';

const { Search } = Input;
const eric = require("../../../assets/eric.jpg")
const aditya = require("../../../assets/aditya.jpg")


class Friends extends Component {

  state = {
    friendsList: [],
    requestsList: [],
    email: "",
    search: "",
    visible: false,
    loading: false,
    friendLoading: false,
    requestLoading: false
  }

  fetchFriends = () => {
    this.setState({
      friendLoading: true
    })

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
      if (resp.friends){
        this.setState({
          friendsList: resp.friends,
        })
      }
      else {
        //error handling
      }
      this.setState({
        friendLoading: false
      })
    })
  }

  fetchRequests = () => {
    //add loader for requests
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
      if (resp.friends){
        this.setState({
          requestsList: resp.friends
        })
      }
      else {
        //error handling
      }
    })
  }

  handleDeleteRequests = (email) => {
    this.setState({
      requestsList: this.state.requestsList.filter(user => user.email != email)
    })
  }

  handleDelete = (email) => {
    fetch(`${BASE_URL}/api/friends/delete_friend/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.token
      },
      method: "DELETE",
      body: JSON.stringify({
        friend: email
      })
    })
    .then(resp => resp.json())
    .then(resp => {
      this.setState({
        friendsList: this.state.friendsList.filter(user => user.email != email)
      })
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

  handleSearch = (e) => {
    if (this.state.search === ""){
      showErrorMessage(SEARCH_FRIEND_ERROR);
    }
    else {
      fetch(`${BASE_URL}/api/search/name/`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.token
        },
        method: "POST",
        body: JSON.stringify({
          name_data: this.state.search
        })
      })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp.results.length)
        if (resp.results){
          this.setState({
            friendsList: resp.results,
          })
        }
        else {
          //error handling
        }
      })
    }
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
        else if (resp.Message === "You cannot add yourself as a friend"){
          showErrorMessage(ADD_FRIEND_ERROR_YOURSELF)
        }
        else {
          showSuccessMessage(ADD_FRIEND_SUCCESS)
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
      <>{this.state.requestsList.length > 0 ?
        <div>
          {this.state.requestsList.map(({ email, pf_pic, name, occupation }, index) => {
            return(
              <Requests handleDeleteRequests={this.handleDeleteRequests} email={email} img={pf_pic} name={name} title={occupation} />
            )
          })}
        </div>:
        <div>
          You have no requests
        </div>
      }
    </>
    )
  }

  componentDidMount() {
    this.fetchFriends()
  }

  render(){
    return(
      <div className="friends__container">
      {this.state.friendLoading ?
        <div className="container-fluid">
          <div className="row justify-content-center friends__loader">
            <Loader
             type="CradleLoader"
             color="#00BFFF"
             height={100}
             width={100}
            />
          </div>
        </div>:
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-2">
              <h2 className="friends__title" onClick={this.fetchFriends}>Friends</h2>
            </div>
            <div className="col-10">
              <Input
                name="search"
                value={this.state.search}
                prefix={<Icon type="search"/>}
                placeholder="Search for your friends"
                className="friends__search-input"
                onChange={this.handleInput}
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
          {this.state.friendsList.length > 0 ?
          <div className="friends__list--container">
            <div className="row">
              {this.state.friendsList.map(item => {
                return (
                  <div className="col-3">
                    <Cards handleDelete={this.handleDelete} {...item}/>
                  </div>
                )
              })}
            </div>
          </div>:
          <div className="friends__list--container">
            <div className="row">
              <div className="col-3">
                <EmptyCard />
              </div>
            </div>
          </div>
        }
        </div>
      }
      </div>
    )
  }
}

export default Friends
