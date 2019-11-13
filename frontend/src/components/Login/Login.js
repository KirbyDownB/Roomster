import React, { Component, Fragment } from 'react';
import './Login.css';
import logo from '../../assets/imgs/roomster-logo.svg';
import { userLoginFetch } from '../../redux/action';
import spinner from '../../assets/tail-spin.svg';
import people from '../../assets/imgs/people-1.svg';
import { Form, Icon, Input, Button, Popover } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  BASE_URL,
  EMPTY_INPUT_ERROR,
  showErrorMessage,
  showSuccessMessage,
  EMAIL_RESET_MESSAGE,
  LOGIN_ERROR,
  GENERAL_ERROR
} from '../../constants';

const { Item } = Form;

class Login extends Component {
  state = {
    isLoginLoading: false,
    showForgotPassword: false,
    isPasswordResetSubmitting: false,
    resetEmail: "",
    redirectHome: false,
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isLoginLoading: true });

    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username || !password) {
      showErrorMessage(EMPTY_INPUT_ERROR);
      return;
    }

    this.props.userLoginFetch(username, password)
      .then(resp => {
        this.setState({
          redirectHome: true,
          isLoginLoading: false
        })
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(LOGIN_ERROR);
        this.setState({ isLoginLoading: false });
      });
  }

  handleForgotPassword = () => {
    this.setState({ showForgotPassword: true });
  }

  handleForgotPasswordVisible = showForgotPassword => {
    this.setState({ showForgotPassword });
  }

  handlePasswordResetSubmit = e => {
    e.preventDefault();

    const resetEmail = this.state.resetEmail;

    if (resetEmail) {
      this.setState({ isPasswordResetSubmitting: true });

      fetch(`${ BASE_URL }/api/reset/email/`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          email: resetEmail
        }),
      })
        .then(resp => resp.json())
        .then(data => {
          showSuccessMessage(EMAIL_RESET_MESSAGE);
          this.setState({
            isPasswordResetSubmitting: false,
            showForgotPassword: false,
          });
        })
        .catch(error => {
          console.error(error);
          showErrorMessage(GENERAL_ERROR);
          this.setState({
            isPasswordResetSubmitting: false,
            showForgotPassword: false,
          });
        });
    }
  }

  handlePasswordResetChange = e => {
    e.preventDefault();
    this.setState({ resetEmail: e.target.value });
  }

  render() {
    if (this.state.redirectHome) {
      return <Redirect push to= "/home" />
    }

    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-5 login__left">
              <div className="login__left--narrow">
                <div className="row justify-content-center">
                  <div className="login__logo-container">
                    <img src={logo} className="login__logo" alt=""/>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <Form onSubmit={this.handleSubmit} className="login__form">
                    <div className="login__title">Welcome back.</div>
                    <Item className="login__item">
                      <div className="login__input--caption">Email</div>
                      <Input
                        className="login__input login__username"
                        name="username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username/Email"
                      />
                    </Item>
                    <Item className="login__item">
                      <div className="login__input--caption">Password</div>
                      <Input
                        className="login__input login__password"
                        name="password"
                        type="password"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Password"
                      />
                    </Item>
                    <Popover
                      trigger="click"
                      visible={this.state.showForgotPassword}
                      onVisibleChange={this.handleForgotPasswordVisible}
                      content={
                        <div className="login__forgotPassword--container">
                          <div className="login__forgotPassword--caption">
                            Enter your email below to send a password reset link.
                          </div>
                          <Input
                            placeholder="Enter your email"
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            className="login__resetInput"
                            name="resetEmail"
                            value={this.state.resetEmail}
                            onChange={this.handlePasswordResetChange}
                          />
                          <div className="login__resetButton--container">
                            <Button
                              className="login__resetButton"
                              type="primary"
                              loading={this.state.isPasswordResetSubmitting}
                              onClick={this.handlePasswordResetSubmit}
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      }
                    >
                      <Button
                        type="link"
                        onClick={this.handleForgotPassword}
                        className="login__forgot"
                      >
                          Forgot your password?
                      </Button>
                    </Popover>
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
                    {this.state.isLoginLoading && <img className="login__spinner" src={spinner} alt=""/> }
                  </div>
                </div>
              </div>
            </div>
            <div className="col-7 login__right">
              <div className="login__people--background">
                <img src={people} alt="" className="login__people"/>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  userLoginFetch: (email, password) => dispatch(userLoginFetch(email, password))
})

export default connect(null, mapDispatchToProps)(Login);
