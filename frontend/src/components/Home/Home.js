import React, { Component } from 'react';
import './Home.css';
import Sidebar from './Sidebar/Sidebar';
import Feed from './Feed/Feed';
import Profile from './Profile/Profile';
import Friends from './Friends/Friends';
import Reviews from './Reviews/Reviews';

class Home extends Component {
  state = {
    activeInterface: "profile",
  }

  setActiveInterface = value => {
    this.setState({ activeInterface: value });
    localStorage.setItem("activeInterface", value);
  };

  componentDidMount = () => {
    const activeInterface = localStorage.getItem("activeInterface");
    console.log("Got activeInterface", activeInterface);
    this.setState({ activeInterface });
  }

  render() {
    const lastActiveInterface = localStorage.getItem("activeInterface");

    return (
      <div className="home__container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
            	<Sidebar activeInterface={lastActiveInterface ? lastActiveInterface : "feed"} setActiveInterface={this.setActiveInterface} />
            </div>
            <div className="col-10">
              <div className="home__right--wrapper">
                {this.state.activeInterface === "profile" && <Profile />}
                {this.state.activeInterface === "feed" && <Feed />}
                {this.state.activeInterface === "friends" && <Friends />}
                {this.state.activeInterface === "reviews" && <Reviews />}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
