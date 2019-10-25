import React, { Component } from 'react';
import './SecondSignupPage.css';
import { Form, Input, Button, DatePicker, Icon } from 'antd';

class SecondSignupPage extends Component {
  render() {
    return (
      <div className="secondSignupPage__container">
        <Form onSubmit={this.props.handleFinalSubmit}>
          <div className="secondSignupPage__formBox">
            <div className="secondSignupPage__inputBox">
              <div style={{width: "45%"}}>
                <p className="secondSignupPage__formBody">Email <span className="secondSignupPage__red">*</span></p>
                <div className="secondSignupPage__inputWrap">
                  <Input
                    name="email"
                    placeholder="Username / Email"
                    prefix={<Icon type="mail" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
              <div style={{width: '10%'}}></div>
            </div>
            <div className="secondSignupPage__inputBox2">
              <div style={{width: "45%"}}>
                <p className="secondSignupPage__formBody">Password <span className="secondSignupPage__red">*</span></p>
                <div className="secondSignupPage__inputWrap">
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
                <p className="secondSignupPage__formBody">Confirm Password <span className="secondSignupPage__red">*</span></p>
                <div className="secondSignupPage__inputWrap">
                  <Input
                    name="password2"
                    type="password"
                    placeholder="Password"
                    prefix={<Icon type="lock" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
            </div>
            <div className="secondSignupPage__inputBox2">
              <div style={{width: "45%"}}>
                <p className="secondSignupPage__formBody">First Name <span className="secondSignupPage__red">*</span></p>
                <div className="secondSignupPage__inputWrap">
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
              <div style={{width: '10%'}}></div>
              <div style={{width: "45%"}}>
                <p className="secondSignupPage__formBody">Last Name <span className="secondSignupPage__red">*</span></p>
                <div className="secondSignupPage__inputWrap">
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
            </div>
            <div className="secondSignupPage__inputBox2">
              <div style={{width: "45%"}}>
                <p className="secondSignupPage__formBody">Phone Number <span className="secondSignupPage__red">*</span></p>
                <div className="secondSignupPage__inputWrap">
                  <Input
                    name="phoneNumber"
                    placeholder="Phone Number"
                    prefix={<Icon type="phone" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
              <div style={{width: '10%'}}></div>
              <div style={{width: "45%"}}>
                <p className="secondSignupPage__formBody">Date of Birth <span className="secondSignupPage__red">*</span></p>
                <div className="secondSignupPage__inputWrap">
                  <DatePicker
                    className="secondSignupPage__datePicker"
                    format="MM-DD-YYYY"
                    onChange={this.handleDateChange}
                    prefix={<Icon type="calendar" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
            </div>
            <div className="secondSignupPage__inputBox2">
            <div style={{width: '100%'}}>
              <p className="secondSignupPage__formBody">Address <span className="secondSignupPage__red">*</span></p>
              <Input
                name="address"
                placeholder="Address"
                prefix={<Icon type="bank" style={{color: 'rgba(0, 0, 0)'}} />}
              />
            </div>
          </div>
          </div>
          <div className="secondSignupPage__footer">
            <div className="secondSignupPage__buttonWrapper">
              <Button
                className="secondSignupPage__prevButton"
                onClick={this.props.setPageOne}
              >
                Previous
              </Button>
            </div>
            <div className="secondSignupPage__buttonWrapper">
              <Button
                htmlType="submit"
                className="secondSignupPage__submitButton"
                type="primary"
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

export default SecondSignupPage;