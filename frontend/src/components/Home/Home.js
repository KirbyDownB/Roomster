import React, { Component } from 'react';
import './Home.css';
import Sidebar from './Sidebar/Sidebar';
import Feed from './Feed/Feed';
import Profile from './Profile/Profile';
import Friends from './Friends/Friends';

class Home extends Component {
  state = {
    activeInterface: "feed",
  }

  setActiveInterface = value => this.setState({ activeInterface: value });

  render() {
    return (
      <div className="home__container">
        <div className="row">
          <div className="col-2" style={{padding: '0', paddingLeft: '20px'}}>
            <Sidebar setActiveInterface={this.setActiveInterface} />
          </div>
          <div className="col-8" style={{padding: '0'}}>
            {this.state.activeInterface === "profile" && <Profile />}
            {this.state.activeInterface === "feed" && <Feed />}
            {this.state.activeInterface === "friends" && <Friends />}
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
