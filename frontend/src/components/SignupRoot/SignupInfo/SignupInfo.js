import React, { Component } from 'react';
import './SignupInfo.css';
import { Form, Input, Button, DatePicker, Icon } from 'antd';

class signupInfoInfo extends Component {
  state = {
    dob: ''
  }

  handleSignupInfoSubmit = e => {
    e.preventDefault();

    const userSignupInfo = {
      passwordOne: e.target.password1.value,
      passwordTwo: e.target.password2.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      phoneNumber: e.target.phoneNumber.value,
      dob: this.state.dob,
      address: e.target.address.value
    }

    // Send signup info data to the parent component
    this.props.setSignupInfo(userSignupInfo)

    // Render the next page through the parent component
    this.props.setPageTwo();
  }

  handleDateChange = (date, dateString) => {
    this.setState({ dob: dateString });
  }

  render() {
    return (
      <div className="signupInfoInfo__container">
        <Form onSubmit={this.handleSignupInfoSubmit}>
          <div className="signupInfo__formBox">
            <div className="signupInfo__inputBox">
              <div style={{width: "45%"}}>
                <p className="signupInfo__formBody">Email <span className="signupInfo__red">*</span></p>
                <div className="signupInfo__inputWrap">
                  <Input
                    name="email"
                    placeholder="Username / Email"
                    prefix={<Icon type="mail" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
              <div style={{width: '10%'}}></div>
            </div>
            <div className="signupInfo__inputBox2">
              <div style={{width: "45%"}}>
                <p className="signupInfo__formBody">Password <span className="signupInfo__red">*</span></p>
                <div className="signupInfo__inputWrap">
                  <Input
                    name="password1"
                    type="password"
                    placeholder="Password"
                    prefix={<Icon type="lock" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
              <div style={{width: '10%'}}></div>
              <div style={{width: "45%"}}>
                <p className="signupInfo__formBody">Confirm Password <span className="signupInfo__red">*</span></p>
                <div className="signupInfo__inputWrap">
                  <Input
                    name="password2"
                    type="password"
                    placeholder="Password"
                    prefix={<Icon type="lock" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
            </div>
            <div className="signupInfo__inputBox2">
              <div style={{width: "45%"}}>
                <p className="signupInfo__formBody">First Name <span className="signupInfo__red">*</span></p>
                <div className="signupInfo__inputWrap">
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
              <div style={{width: '10%'}}></div>
              <div style={{width: "45%"}}>
                <p className="signupInfo__formBody">Last Name <span className="signupInfo__red">*</span></p>
                <div className="signupInfo__inputWrap">
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
            </div>
            <div className="signupInfo__inputBox2">
              <div style={{width: "45%"}}>
                <p className="signupInfo__formBody">Phone Number <span className="signupInfo__red">*</span></p>
                <div className="signupInfo__inputWrap">
                  <Input
                    name="phoneNumber"
                    placeholder="Phone Number"
                    prefix={<Icon type="phone" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
              <div style={{width: '10%'}}></div>
              <div style={{width: "45%"}}>
                <p className="signupInfo__formBody">Date of Birth <span className="signupInfo__red">*</span></p>
                <div className="signupInfo__inputWrap">
                  <DatePicker
                    className="signupInfo__datePicker"
                    format="MM-DD-YYYY"
                    onChange={this.handleDateChange}
                    prefix={<Icon type="calendar" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
            </div>
            <div className="signupInfo__inputBox2">
            <div style={{width: '100%'}}>
              <p className="signupInfo__formBody">Address <span className="signupInfo__red">*</span></p>
              <Input
                name="address"
                placeholder="Address"
                prefix={<Icon type="bank" style={{color: 'rgba(0, 0, 0)'}} />}
              />
            </div>
          </div>
          </div>
          <div className="signupInfo__footer">
            <div className="signupInfo__buttonWrapper">
              <Button
                htmlType="submit"
                className="signupInfo__nextButton"
                type="primary"
              >
                Next
              </Button>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

export default signupInfoInfo;