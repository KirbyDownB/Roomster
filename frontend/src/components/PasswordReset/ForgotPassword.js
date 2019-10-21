import React, { Component } from 'react';
import { Form, Icon, Input, Button, Alert } from 'antd';
import logo from '../../assets/imgs/roomster-logo.svg';
import spinner from '../../assets/tail-spin.svg';
import { NavLink } from 'react-router-dom';
import './ForgotPassword.css';

const { Item } = Form;

class ForgotPassword extends Component {
  state = {
    isForgotPasswordLoading: false,
    alertMessage: ""
  }

  handleSubmit = e => {
    e.preventDefault()

    let password1 = e.target.password1.value
    let password2 = e.target.password2.value

    if (password1 != password2){
      this.setState({ alertMessage: "Your passwords do not match!" });
    }
    else {
      this.setState({ isForgotPasswordLoading: true });
      //add fetch
    }
  }

  handleAlertClose = () => {
    this.setState({ alertMessage: "" });
  }

  render(){
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-5 ForgotPassword__left">
            <div className="row justify-content-center">
              <div className="ForgotPassword__logo-container">
                <img src={logo} className="ForgotPassword__logo"/>
              </div>
            </div>
            <div className="row justify-content-center">
              <Form onSubmit={this.handleSubmit} className="ForgotPassword__form">
                <div className="ForgotPassword__title">Reset Password</div>
                <Item>
                  <Input
                    className="ForgotPassword__input"
                    name="password1"
                    type="password"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Password"
                  />
                </Item>
                <Item>
                  <Input
                    className="ForgotPassword__input"
                    name="password2"
                    type="password"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Confirm Password"
                  />
                </Item>
                <Item>
                  <Button
                    className="ForgotPassword__button--login"
                    htmlType="submit"
                    type="primary"
                    style={{ width: 440 }}
                  >
                    <span className="ForgotPassword__button--bold">SUBMIT</span>
                  </Button>
                </Item>
              </Form>
              <div className="row justify-content-center">
                <div className="ForgotPassword__userfeedback">
                  {this.state.alertMessage.length > 0 && <Alert
                    className="ForgotPassword__alert"
                    message={this.state.alertMessage}
                    type="warning"
                    closable
                    afterClose={this.handleAlertClose}
                  />}
                  {this.state.isForgotPasswordLoading && <img src={spinner}/> }
                </div>
              </div>
            </div>
          </div>
          <div className="col-7 ForgotPassword__right"></div>


        </div>

      </div>
    )
  }
}

export default ForgotPassword;
