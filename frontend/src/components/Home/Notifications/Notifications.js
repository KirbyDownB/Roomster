import React, { Component } from 'react';
import './Notifications.css';
import { Icon, Button, Alert, Empty } from 'antd';
import Fade from 'react-reveal/Fade';
import { BASE_URL, NO_NOTIFICATIONS } from '../../../constants';

class Notifications extends Component {
  handleNotificationDelete = e => {
    e.preventDefault();
    alert("Deleting notification")
  }

  clearAllNotifications = e => {
    e.preventDefault();
    alert("Clearing all notifications");
  }

  render() {
    const { notifications } = this.props;

    return (
      <div className="notifications__container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <h2 className="notifications__title">Notifications</h2>
            </div>
            <div className="col-10">
              {notifications.length > 0 &&
              <Button
                type="primary"
                className="notifications__clearall--button"
                onClick={e => this.clearAllNotifications(e)}
              >
                <Icon type="close-circle" theme="filled" />
                Clear All
              </Button>}
            </div>
          </div>
          <div className="notification__wrapper">
            <div className="row justify-content-center">
              {notifications.length === 0 &&
                <Empty
                  description={
                    <span>{NO_NOTIFICATIONS}</span>
                  }
                />
              }
              {notifications.length > 0 && 
              notifications.map(notification => {
                const { category, content } = notification;
                
                return (
                  <div className="col-10">
                    <Fade>
                      <div className="notification__card">
                        <div className="row justify-content-center">
                          <div className="col-10">
                            <div className="notification__category">{category}</div>
                            <div className="notification__content">{content}</div>
                          </div>
                          <div className="col-2">
                            <div className="notification__delete">
                              <Icon
                                type="close-circle"
                                theme="filled"
                                className="notification__delete--icon"
                                onClick={e => this.handleNotificationDelete(e)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fade>
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

export default Notifications;