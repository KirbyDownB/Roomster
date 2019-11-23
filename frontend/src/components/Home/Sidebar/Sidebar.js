import React, { Component } from "react";
import "./Sidebar.css";
import { Menu, Icon, Button } from 'antd';
import logo from '../../../assets/imgs/roomster-logo.svg';

const { Item } = Menu;

class Sidebar extends Component {
  handleMenuSelect = ({ key }) => this.props.setActiveInterface(key);

  handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  render() {
    return (
      <Menu
        onSelect={this.handleMenuSelect}
        style={{ height: "100vh", width: 256, marginLeft: -15, position: "fixed" }}
        defaultSelectedKeys={[this.props.activeInterface]}
        mode="inline"
      >
        <div className="menu__logo--container">
          <img className="menu__logo" src={logo} alt=""/>
        </div>
        <Item
          className="menu__item"
          key="feed"
        >
          <Icon type="container" />
          <span className="menu__text">Feed</span>
        </Item>
        <Item
          className="menu__item"
          key="friends"
        >
          <Icon type="team" />
          <span className="menu__text">Friends</span>
        </Item>
        <Item
          className="menu__item"
          key="reviews"
        >
          <Icon type="profile" />
          <span className="menu__text">Reviews</span>
        </Item>
        <Item
          className="menu__item"
          key="profile"
        >
          <Icon type="edit" />
          <span className="menu__text">Edit Profile</span>
        </Item>
        <Item
          className="menu__item"
          key="groups"
        >
          <Icon type="team" />
          <span className="menu__text">Groups</span>
        </Item>
        <div className="menu__logout--container">
          <Button
            onClick={this.handleLogout}
            className="menu__logout"
            type="primary"
          >
            LOGOUT
          </Button>
        </div>
      </Menu>
    )
  }
}

export default Sidebar;
