import React, { Component } from 'react';
import './Home.css';
import { mockNotifications } from '../../mocks';
import Sidebar from './Sidebar/Sidebar';
import Feed from './Feed/Feed';
import Profile from './Profile/Profile';
import Friends from './Friends/Friends';
import Reviews from './Reviews/Reviews';
import Groups from './Groups/Groups';
import Notifications from './Notifications/Notifications';
import {
  showNotification,
  BASE_URL,
  showErrorMessage,
  DELETE_ALL_NOTIFICATIONS_ERROR,
  DELETE_NOTIFICATION_ERROR
} from '../../constants';
import { subscribeToNotifications } from '../../socket';

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
    const token = localStorage.getItem("token");
    const activeInterface = localStorage.getItem("activeInterface");
    this.setState({ activeInterface });

    fetch(`${BASE_URL}/api/notifications/get_notifications/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      method: "GET"
    })
      .then(response => response.status === 400 ? Promise.reject() : response.json())
      .then(data => {
        const { Notifications: notifications } = data;
        console.log("Got notifications", notifications);
        this.setState({ notifications });
      })
      .catch(error => {
        console.error(error);
      })

    subscribeToNotifications(token, notification => {
      this.setState(prevState => ({ notifications: [...prevState.notifications, notification] }))
    });

    // mockNotifications.forEach((mockNotification, index) => {
    //   setTimeout(() => {
    //     // showNotification(mockNotification);
    //     this.setState(prevState => ({ notifications: [...prevState.notifications, mockNotification] }));
    //   }, 250 * (index + 1));
    // });

    // subscribeToNotifications(data => {
    //   console.log("Got data from notification subscription", data);
    //   this.setState(prevState => ({ notifications: [] }));
    // });
  }

  clearAllNotifications = () => {
    this.setState(prevState => ({ notifications: [] }));

    // const token = localStorage.getItem("token");
    // fetch(`${BASE_URL}/api/notifications/deleteAll`, {
    //   headers: {
    //     "Authorization": token,
    //     "Content-Type": "application/json"
    //   },
    //   method: "DELETE"
    // })
    //   .then(response => response.status === 400 ? Promise.reject() : response.json())
    //   .then(data => {
    //     console.log("Got response after deleting all notifications", data);
    //     this.setState(prevState => ({ notifications: [] }));
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     showErrorMessage(DELETE_ALL_NOTIFICATIONS_ERROR);
    //   });
  }

  handleNotificationDelete = notificationId => {
    // const updatedNotifications = this.state.notifications.filter(notification => notification.notificationId !== notificationId);
    // this.setState(prevState => ({ notifications: updatedNotifications }));

    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/notifications/delete/`, {
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      method: "DELETE",
      body: JSON.stringify({ notificationId })
    })
      .then(response => response.status === 400 ? Promise.reject() : response.json())
      .then(data => {
        console.log(`Got response after deleting notification with id ${notificationId}`, data);

        const updatedNotifications = this.state.notifications.filter(notification => notification.notificationId !== notificationId);
        this.setState(prevState => ({ notifications: updatedNotifications }));
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(DELETE_NOTIFICATION_ERROR);
      });
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
                {this.state.activeInterface === "groups" && <Groups />}
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
