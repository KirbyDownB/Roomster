import React, { Component, Fragment } from 'react';
import './Landing.css';
import logo from '../../assets/imgs/roomster-logo.svg';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom'

class Landing extends Component {
  render() {
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="landing__logo-container">
            <div className="row">
              <img src={logo} className="landing__logo"/>
            </div>
            <div className="row justify-content-center">
              <NavLink to="/login">
                <Button type="primary">Get Started</Button>
              </NavLink>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Landing;