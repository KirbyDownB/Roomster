import React, { Component } from 'react';
import { Button, Icon } from 'antd'
import './Home.css';

import Search from './Search/Search';
import Listings from './Listings/Listings';

class Home extends Component {
  render() {
    return (
      <div className="home__container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-2 home__sideMenu">
              <div className="home__innerMenu">
                <Icon className="home__icon" type="user" />
                <p className="home__menu_text">Profile</p>
              </div>
              <div className="home__innerMenu">
                <Icon className="home__icon" type="menu" />
                <p className="home__menu_text">Listings</p>
              </div>
            </div>
            <div className="col-10 home__main">
              <Search />
              <Listings />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
