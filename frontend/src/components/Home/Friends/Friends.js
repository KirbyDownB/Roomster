import React, { Component } from 'react';
import Cards from './Cards';
import EmptyCard from './EmptyCard';
import Requests from './Requests/Requests';
import Fade from 'react-reveal/Fade';
import { Modal, Input, Icon, Popover, Button } from 'antd';
import {
  BASE_URL,
  ADD_FRIEND_ERROR,
  ADD_FRIEND_ERROR_YOURSELF,
  ADD_FRIEND_SUCCESS,
  SEARCH_FRIEND_ERROR,
  FRIENDS_LIST_ERROR,
  FRIENDS_REQUESTS_ERROR,
  showErrorMessage,
  showSuccessMessage
} from '../../../constants.js';
import spinner from '../../../assets/tail-spin.svg';

import './Friends.css';

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
        "Authorization": localStorage.token
      },
      method: "GET"
    })
      .then(response => response.status === 400 ? Promise.reject() : response.json())
      .then(resp => {
        console.log("Got response from friends list", resp)
        if (resp.friends){
          this.setState({
            friendsList: resp.friends,
          })
        }
        this.setState({
          friendLoading: false
        })
      })
      .catch(error => {
        console.error("Get error from fetching friends");
        showErrorMessage(FRIENDS_LIST_ERROR);
        this.setState({ friendLoading: false });
      })
  }

  fetchRequests = () => {
    //add loader for requests
    fetch(`${BASE_URL}/api/friends/request_list/`, {
      headers: {
        "Authorization": localStorage.token
      },
      method: "GET"
    })
      .then(response => response.status === 400 ? Promise.reject() : response.json())
      .then(resp => {
        if (resp.friends){
          this.setState({
            requestsList: resp.friends
          })
        }
      })
      .catch(error => {
        console.error("Got an error from loading friend requests", error);
        showErrorMessage(FRIENDS_REQUESTS_ERROR);
      });
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
    .then(response => response.status === 400 ? Promise.reject() : response.json())
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
      .then(response => response.status === 400 ? Promise.reject() : response.json())
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
      .then(resp => resp.status === 400 ? Promise.reject(resp) : resp.json())
      .then(resp => {
        showSuccessMessage(ADD_FRIEND_SUCCESS);
        this.setState({
          loading: false
        })
      })
      .catch(err => {
        this.setState({
          loading: false
        })
        showErrorMessage(ADD_FRIEND_ERROR)
      })
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
            <img src={spinner} alt=""/>
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
                    <Fade>
                      <Cards handleDelete={this.handleDelete} {...item}/>
                    </Fade>
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
