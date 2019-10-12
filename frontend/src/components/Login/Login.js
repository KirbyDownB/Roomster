import React, { Component, Fragment } from 'react';
import './Login.css';
import logo from '../../assets/imgs/roomster-logo.svg';
import { Form, Icon, Input, Button } from 'antd';
import { NavLink } from 'react-router-dom';

const { Item } = Form;

class Login extends Component {
  state = {}

  handleSubmit = e => {
    e.preventDefault();
  }

  render() {
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-5 login__left">
              <div className="login__left--narrow">
                <div className="row justify-content-center">
                  <div className="login__logo-container">
                    <img src={logo} className="login__logo"/>
                  </div>
                </div>
                <div className="row">
                  <h1 className="login__title">Welcome back.</h1>
                </div>
                <div className="row justify-content-center">
                  <Form onSubmit={this.handleSubmit} className="login__form">
                    <Item className="login__item">
                      <Input
                        className="login__input login__username"
                        placeholder="Username/Email"
                        style={{ width: 440 }}
                      />
                    </Item>
                    <Item className="login__item">
                      <Input
                        className="login__input login__password"
                        placeholder="Password"
                        style={{ width: 440 }}
                      />
                    </Item>
                    <NavLink to="/forgot-password">
                      <div className="login__forgot">
                        Forgot your password?
                      </div>
                    </NavLink>
                    <Item classname="login__item">
                      <Button
                        className="login__button"
                        htmlType="submit"
                        type="primary"
                        style={{width: 440 }}
                      >
                        <span className="login__button--bold">LOGIN</span>
                      </Button>
                    </Item>
                  </Form>
                  <NavLink to="/signup">
                    <Button
                      ghost
                      className="login__button--signup"
                      type="primary"
                      style={{width: 440 }}
                    >
                      <span className="login__button--bold">SIGNUP</span>
                    </Button>
                  </NavLink>
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