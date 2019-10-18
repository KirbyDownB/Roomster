import React, { Component, Fragment } from 'react';
import logo from '../../assets/imgs/roomster-logo.svg';
import { userLoginFetch } from '../../redux/action';
import spinner from '../../assets/tail-spin.svg';
import { Form, Icon, Input, Button, Alert } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Login.css';

const { Item } = Form;

class Login extends Component {
  state = {
    isLoginLoading: false,
    alertMessage: ""
  }

  handleSubmit = e => {
    e.preventDefault();

    let username = e.target.username.value;
    let password = e.target.password.value;

    if (!username) {
      this.setState({ alertMessage: "You forgot to enter your username!" });
      return;
    } else if (!password) {
      this.setState({ alertMessage: "You forgot to enter your password!" });
      return;
    } else {
      this.props.userLoginFetch(username, password)
      this.setState({ alertMessage: "" });
    }
    this.setState({ isLoginLoading: true });
  }

  handleAlertClose = () => {
    this.setState({ alertMessage: "" });
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
                <div className="row justify-content-center">
                  <Form onSubmit={this.handleSubmit} className="login__form">
                    <div className="login__title">Welcome back.</div>
                    <Item className="login__item">
                      <Input
                        className="login__input login__username"
                        name="username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username/Email"
                      />
                    </Item>
                    <Item className="login__item">
                      <Input
                        className="login__input login__password"
                        name="password"
                        type="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Password"
                      />
                    </Item>
                    <NavLink to="/forgot-password">
                      <div className="login__forgot">
                        Forgot your password?
                      </div>
                    </NavLink>
                    <Item classname="login__item">
                      <Button
                        className="login__button login__button--login"
                        htmlType="submit"
                        type="primary"
                        style={{ width: 440 }}
                      >
                        <span className="login__button--bold">LOGIN</span>
                      </Button>
                    </Item>
                  </Form>
                  <NavLink to="/signup">
                    <Button
                      ghost
                      className="login__button login__button--signup"
                      type="primary"
                      style={{ width: 440 }}
                    >
                      <span className="login__button--bold">SIGNUP</span>
                    </Button>
                  </NavLink>
                </div>
                <div className="row justify-content-center">
                  <div className="login__userfeedback">
                    {this.state.alertMessage.length > 0 && <Alert
                      className="login__alert"
                      message={this.state.alertMessage}
                      type="warning"
                      closable
                      afterClose={this.handleAlertClose}
                    />}
                    {this.state.isLoginLoading && <img className="login__spinner" src={spinner}/> }
                  </div>
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

const mapDispatchToProps = dispatch => ({
  userLoginFetch: (username, password) => dispatch(userLoginFetch(username, password)),
})

export default connect(null, mapDispatchToProps)(Login);
