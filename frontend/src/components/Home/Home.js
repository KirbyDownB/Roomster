import React, { Component } from 'react';
import './Home.css';
import { mockNotifications } from '../../mocks';
import { showNotification } from '../../constants';
import Sidebar from './Sidebar/Sidebar';
import Feed from './Feed/Feed';
import Profile from './Profile/Profile';
import Friends from './Friends/Friends';
import Reviews from './Reviews/Reviews';
import Notifications from './Notifications/Notifications';

class Home extends Component {
  state = {
    activeInterface: "profile",
    notifications: []
  }

  setActiveInterface = value => {
    this.setState({ activeInterface: value });
    localStorage.setItem("activeInterface", value);
  };

  componentDidMount = () => {
    const activeInterface = localStorage.getItem("activeInterface");
    this.setState({ activeInterface });

    mockNotifications.forEach((mockNotification, index) => {
      setTimeout(() => {
        // showNotification(mockNotification);
        this.setState(prevState => ({ notifications: [...prevState.notifications, mockNotification] }));
      }, 250 * (index + 1));
    });

    // subscribeToNotifications(data => {
    //   console.log("Got data from notification subscription", data);
    //   this.setState(prevState => ({ notifications: [] }));
    // });
  }

  clearAllNotifications = () => {
    this.setState(prevState => ({ notifications: [] }));
  }

  handleNotificationDelete = notificationId => {
    const updatedNotifications = this.state.notifications.filter(notification => notification.notificationId !== notificationId);
    this.setState(prevState => ({ notifications: updatedNotifications }));
  }

  render() {
    const lastActiveInterface = localStorage.getItem("activeInterface");
    const { activeInterface, notifications } = this.state;

    return (
      <div className="home__container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
            	<Sidebar
                activeInterface={lastActiveInterface ? lastActiveInterface : "feed"}
                setActiveInterface={this.setActiveInterface}
                notifications={notifications}
              />
            </div>
            <div className="col-10">
              <div className="home__right--wrapper">
                {activeInterface === "profile" && <Profile />}
                {activeInterface === "feed" && <Feed />}
                {activeInterface === "friends" && <Friends />}
                {activeInterface === "reviews" && <Reviews />}
                {activeInterface === "notifications" &&
                  <Notifications
                    notifications={notifications}
                    handleNotificationDelete={this.handleNotificationDelete}
                    clearAllNotifications={this.clearAllNotifications}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
