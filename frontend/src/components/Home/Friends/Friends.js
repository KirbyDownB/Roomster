import React, { Component } from 'react';
import Cards from './Cards';
import Requests from './Requests/Requests';
import { Modal, Input, Select, Radio, Icon, Popover } from 'antd';
import { BASE_URL } from '../../../constants.js';

import './Friends.css';

const { Search } = Input;
const eric = require("../../../assets/eric.jpg")
const aditya = require("../../../assets/aditya.jpg")


class Friends extends Component {

  state = {
    friendsList: [
      {
        "Email": "eeong18@ucr.edu",
        "Image": eric,
        "Name": "Eric Ong"
      },
      {
        "Email": "aacha002@ucr.edu",
        "Image": aditya,
        "Name": "Aditya Acharya1"
      },
      {
        "Email": "aacha003@ucr.edu",
        "Image": aditya,
        "Name": "Aditya Acharya2"
      },
      {
        "Email": "aacha004@ucr.edu",
        "Image": aditya,
        "Name": "Aditya Acharya3"
      },
      {
        "Email": "aacha005@ucr.edu",
        "Image": aditya,
        "Name": "Aditya Acharya4"
      },
    ],
    requestsList: [
      {
        "Email": "ericong18@ucr.edu",
        "Image": eric,
        "Name": "Eric Ong",
        "Title": "Lyft Driver"
      },
      {
        "Email": "aacha002@ucr.edu",
        "Image": aditya,
        "Name": "Aditya Acharya",
        "Title": "Uber Driver"
      }
    ]
  }

  handleSearch = () => {
    fetch(`${BASE_URL}/friends/_list`)
  }

  fetchFriends = () => {
    //const { img, name } = user;
    // fetch(`${BASE_URL}/friends/list`,{
    //   headers: {
    //     "Content": "application/json"
    //   },
    //   method: "POST"
    // })
    // .then(resp => resp.json())
    // .then(resp => console.log(resp))
    //let temp = []
    // temp.push(<Cards img={eric}, name={"Eric Ong"} />)
    // this.setState({
    //   friendsList: temp
    // })
  }

  componentDidMount() {
    this.fetchFriends()
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

  mapRequests = () => {
    return(
      <div>
        {this.state.requestsList.map(({ Email, Image, Name, Title }, index) => {
          return(
            <Requests handleDeleteRequests={this.handleDeleteRequests} email={Email} img={Image} name={Name} title={Title} />
          )
        })}
      </div>
    )
  }

  render(){
    console.log(this.state.requestsList.length)
    return(
      <div className="container-fluid friends__bg">
        <div className="row">
          <div className="col-10 friends__right">
            <div className="row friends__search-container">
              <div style={{width: '20%'}}>
                <h1 className="friends__remove">Friends</h1>
              </div>
              <div style={{width: '50%'}}>
                <Input
                  prefix=<Icon type="search"/>
                  placeholder="Search for your friends"
                  className="friends__search-input"
                  onPressEnter={this.handleSearch}
                />
              </div>
            </div>
            <div className="row friends__search-filter">
              <div className="friends__search-parent">
                <button className="friends__search-filter-inner1">
                  All
                </button>
                <Popover title="Friend Requests" placement="bottom" content={this.mapRequests()} className="friends__search-filter-inner2" trigger="click">
                  Requests
                </Popover>
                <button className="friends__search-filter-inner3">
                  Block
                </button>
              </div>
            </div>

            <div className="row friends__list-container">
              {this.state.friendsList.map(({ Image, Name, Email }, index) => {
                return (
                  <div className="col-3 friends__col">
                    <Cards handleDelete={this.handleDelete} email={Email} img={Image} name={Name}/>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Friends
