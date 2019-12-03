import React, { Component } from 'react';
import './Notifications.css';
import { Icon, Button, Empty, Popconfirm } from 'antd';
import Fade from 'react-reveal/Fade';
import { NO_NOTIFICATIONS } from '../../../constants';

class Notifications extends Component {
  handleNotificationDelete = (e, notificationId) => {
    e.preventDefault();
    console.log("Handle notification delete in Notifications component", notificationId);
    this.props.handleNotificationDelete(notificationId);
  }

  clearAllNotifications = e => {
    e.preventDefault();
    this.props.clearAllNotifications();
  }

  render() {
    const notifications = [...this.props.notifications];

    return (
      <div className="notifications__container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <h2 className="notifications__title">Notifications</h2>
            </div>
            <div className="col-10">
              {notifications.length > 0 &&
                <Popconfirm
                  title="Are you sure you want to clear all of your notifications?"
                  onConfirm={e => this.clearAllNotifications(e)}
                  okText="Yes"
                  cancelText="No"
                  placement="left"
                >
                  <Button
                    type="primary"
                    className="notifications__clearall--button"
                  >
                    <Icon type="close-circle" theme="filled" />
                    Clear All
                  </Button>
                </Popconfirm> 
              }
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
              {notifications && notifications.length > 0 && 
              notifications.reverse().map(notification => {
                const { category, content, notification_id: notificationId } = notification;
                
                return (
                  <div className="col-10" key={notificationId}>
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
                                onClick={e => this.handleNotificationDelete(e, notificationId)}
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