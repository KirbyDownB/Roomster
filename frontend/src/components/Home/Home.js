import React, { Component } from 'react';
import './Home.css';
import Listings from './Listings/Listings';
import Profile from './Profile/Profile';

class Home extends Component {
  state = {
    activePage: "profile"
  }


  render() {
    return (
      <div className="home__container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">hi</div>
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