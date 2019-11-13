import React, { Component } from 'react';
import Cards from './Cards';
import Requests from './Requests/Requests';
import { Input, Select, Radio, Icon, Popover } from 'antd';
import { BASE_URL } from '../../constants.js';

import './Friends.css';

const { Search } = Input;
const eric = require("../../assets/eric.jpg")
const aditya = require("../../assets/aditya.jpg")

const content = (
  <div>
    <Requests />
    <Requests />
  </div>
)

class Friends extends Component {

  state = {
    friendsList: null
  }

  handleSearch = () => {
    fetch(`${BASE_URL}/friends/_list`)
  }

  convertList = () => {
    temp = []
    for (var i = 0; i < this.state.friendsList.length(); ++i){
      temp.push(<div className="col-3 friends__col"><Cards img={eric} name={"Eric Ong"}/></div>)
    }
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
    let temp = []
    temp.push(<Cards img={eric}, name={"Eric Ong"} />)
    this.setState({
      friendsList: temp
    })
  }

  componentDidMount() {
    this.fetchFriends()
  }

  render(){
    return(
      <div className="container-fluid friends__bg">
        <div className="row">
          <div className="col-2">
          </div>
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
                <Popover title="Friend Requests" placement="bottom" content={content} className="friends__search-filter-inner2" trigger="click">
                  Requests
                </Popover>
                <button className="friends__search-filter-inner3">
                  Block
                </button>
              </div>
            </div>
            <div className="row friends__list-container">
              <div className="col-3 friends__col">
                <Cards img={eric} name={"Eric Ong"}/>
              </div>
              <div className="col-3 friends__col">
                <Cards img={eric} name={"Eric Ong"}/>
              </div>
              <div className="col-3 friends__col">
                <Cards img={eric} name={"Eric Ong"}/>
              </div>
              <div className="col-3 friends__col">
                <Cards img={eric} name={"Eric Ong"}/>
              </div>
            </div>
            <div className="row friends__list-container">
              <div className="col-3 friends__col">
                <Cards img={aditya} name={"Aditya Acharya"}/>
              </div>
              <div className="col-3 friends__col">
                <Cards img={aditya} name={"Aditya Acharya"}/>
              </div>
              <div className="col-3 friends__col">
                <Cards img={aditya} name={"Aditya Acharya"}/>
              </div>
              <div className="col-3 friends__col">
                <Cards img={aditya} name={"Aditya Acharya"}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Friends
