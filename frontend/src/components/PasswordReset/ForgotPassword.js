import React, { Component } from 'react';
import { Form, Icon, Input, Button, Alert } from 'antd';
import logo from '../../assets/imgs/roomster-logo.svg';
import spinner from '../../assets/tail-spin.svg';
import { BASE_URL } from '../../constants';
import './ForgotPassword.css';

const { Item } = Form;

class ForgotPassword extends Component {
  state = {
    isForgotPasswordLoading: false,
    alertMessage: "",
    successMessage: "",
    messageType: ""
  }

  handleSubmit = e => {
    e.preventDefault()

    const password1 = e.target.password1.value
    const password2 = e.target.password2.value

    if (password1 !== password2){
      this.setState({
        alertMessage: "Your passwords do not match!",
        successMessage: "",
        messageType: "warning"
      });
    }
    else {
      this.setState({ 
        isForgotPasswordLoading: true,
        alertMessage: "",
        successMessage: "",
        messageType: ""
      });

      fetch(`${ BASE_URL }/api/reset/password/`, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': this.props.match.params.token
        },
        method: "POST",
        body: JSON.stringify({
          new_password: password1
        }),
      })
        .then(resp => resp.json())
        .then(resp => {
          console.log(resp)
          this.setState({
            isForgotPasswordLoading: false,
            successMessage: "Your password has been successfully reset!",
            alertMessage: "",
            messageType: "success"
          });
        })
        .catch(error => {
          console.error(error);
          this.setState({
            isForgotPasswordLoading: false,
            successMessage: "",
            alertMessage: "Something went wrong!",
            messageType: "warning"
          });
        });
    }
  }

  handleAlertClose = () => {
    this.setState({ alertMessage: "" });
  }

  render(){
    return (
      <div className="forgotPassword__container">
        <div className="forgotPassword__formBox">
          <div className="forgotPassword__formBox--contents">
            <div className="row justify-content-center">
              <img src={logo} className="forgotPassword__roomsterLogo" alt=""/>
            </div>
            <div className="forgotPassword__title">Reset Password</div>
            <Form onSubmit={this.handleSubmit}>
              <Item>
                <div className="forgotPassword__input--caption">Password</div>
                <Input
                  className="ForgotPassword__input"
                  name="password1"
                  type="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Password"
                />
              </Item>
              <Item>
                <div className="forgotPassword__input--caption">Confirm Password</div>
                <Input
                  className="ForgotPassword__input"
                  name="password2"
                  type="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Confirm Password"
                />
              </Item>
              <Item>
                <div className="forgotPassword__button--container">
                  <Button
                    className="forgotPassword__button--login"
                    htmlType="submit"
                    type="primary"
                  >
                    <span className="ForgotPassword__button--bold">SUBMIT</span>
                  </Button>
                </div>
              </Item>
            </Form>
            <div className="row justify-content-center">
              <div className="ForgotPassword__userfeedback">
                {this.state.alertMessage && this.state.messageType && <Alert
                  className="ForgotPassword__alert"
                  message={this.state.alertMessage}
                  type={this.state.messageType}
                  closable
                  afterClose={this.handleAlertClose}
                />}
                {this.state.isForgotPasswordLoading && <img src={spinner} alt=""/> }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ForgotPassword;
