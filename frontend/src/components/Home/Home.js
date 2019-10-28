import React, { Component } from 'react';
import { Button, Icon } from 'antd'
import './Home.css';
import Listings from './Listings/Listings';
import Profile from './Profile/Profile';

class Home extends Component {
  state = {
    activePage: "profile"
  }

  handleProfileClick = e => {
    e.preventDefault();
    this.setState({ activePage: "profile" });
  }

  handleListingsClick = e => {
    e.preventDefault();
    this.setState({ activePage: "listings" });
  }

  render() {
    return (
      <div className="home__container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-2 home__sideMenu">
              <div
                className="home__innerMenu"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ activePage: "profile" });
                }}
              >
                <Icon className="home__icon" type="user" />
                <p className="home__menu_text">Profile</p>
              </div>
              <div
                className="home__innerMenu"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ activePage: "listings" });
                }}
              >
                <Icon className="home__icon" type="menu" />
                <p className="home__menu_text">Listings</p>
              </div>
            </div>
            <div className="col-10 home__main">
              {this.state.activePage === "listings" && <Listings />}
              {this.state.activePage === "profile" && <Profile />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
