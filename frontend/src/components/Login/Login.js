import React, { Component, Fragment } from 'react';
import './Login.css';
import logo from '../../assets/imgs/roomster-logo.svg';

class Login extends Component {
  render() {
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-5">
              <div className="row justify-content-center">
                <div className="login__logo-container">
                  <img src={logo} className="login__logo"/>
                </div>
              </div>
            </div>
            <div className="col-7 login__right"></div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Login;