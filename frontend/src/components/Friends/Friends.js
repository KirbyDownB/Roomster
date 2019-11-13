import React, { Component } from 'react';
import Cards from './Cards';
import { Input, Select, Radio, Icon, Popover } from 'antd';
import { BASE_URL } from '../../constants.js';

import './Friends.css';

const { Search } = Input;
const content = (
  <div>
    <p>Eric Ong</p>
    <p>Aditya Acharya</p>
  </div>
)

class Friends extends Component {

  handleSearch = () => {
    fetch(`${BASE_URL}/friends/_list`)
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
                <Popover placement="bottom" content={content} className="friends__search-filter-inner2">
                  Requests
                </Popover>
                <button className="friends__search-filter-inner3">
                  Block
                </button>
              </div>
            </div>
            <div className="row friends__list-container">
              <div className="col-3 friends__col">
                <Cards />
              </div>
              <div className="col-3 friends__col">
                <Cards />
              </div>
              <div className="col-3 friends__col">
                <Cards />
              </div>
              <div className="col-3 friends__col">
                <Cards />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Friends
