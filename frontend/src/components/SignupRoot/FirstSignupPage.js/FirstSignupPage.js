import React, { Component } from 'react';
import './FirstSignupPage.css';
import { Form, Input, Button, Icon } from 'antd';
import { inputIconColor } from '../../../constants';

class FirstSignupPage extends Component {

  handleFirstPageSignupSubmit = e => {
    e.preventDefault();

    const firstSignupInfo = {
      email: e.target.email.value,
      passwordOne: e.target.password1.value,
      passwordTwo: e.target.password2.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      phoneNumber: e.target.phoneNumber.value,
      address: e.target.address.value
    }

    // Send signup info data to the parent component
    this.props.setFirstSignupInfo(firstSignupInfo)

    // Render the next page through the parent component
    this.props.setPageTwo();
  }

  handleDateChange = (date, dateString) => {
    this.setState({ dob: dateString });
  }

  render() {
    return (
      <div className="firstSignupPage__container">
        <Form onSubmit={this.handleFirstPageSignupSubmit}>
          <div className="firstSignupPage__formBox">
            <div className="firstSignupPage__inputBox">
              <div style={{width: "45%"}}>
                <p className="firstSignupPage__formBody">Email <span className="firstSignupPage__red">*</span></p>
                <div className="firstSignupPage__inputWrap">
                  <Input
                    name="email"
                    placeholder="Username / Email"
                    prefix={<Icon type="mail" style={inputIconColor} />}
                  />
                </div>
              </div>
              <div style={{width: '10%'}}></div>
            </div>
            <div className="firstSignupPage__inputBox2">
              <div style={{width: "45%"}}>
                <p className="firstSignupPage__formBody">Password <span className="firstSignupPage__red">*</span></p>
                <div className="firstSignupPage__inputWrap">
                  <Input
                    name="password1"
                    type="password"
                    placeholder="Password"
                    prefix={<Icon type="lock" style={inputIconColor} />}
                  />
                </div>
              </div>
              <div style={{width: '10%'}}></div>
              <div style={{width: "45%"}}>
                <p className="firstSignupPage__formBody">Confirm Password <span className="firstSignupPage__red">*</span></p>
                <div className="firstSignupPage__inputWrap">
                  <Input
                    name="password2"
                    type="password"
                    placeholder="Password"
                    prefix={<Icon type="lock" style={inputIconColor} />}
                  />
                </div>
              </div>
            </div>
            <div className="firstSignupPage__inputBox2">
              <div style={{width: "45%"}}>
                <p className="firstSignupPage__formBody">First Name <span className="firstSignupPage__red">*</span></p>
                <div className="firstSignupPage__inputWrap">
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    prefix={<Icon type="user" style={inputIconColor} />}
                  />
                </div>
              </div>
              <div style={{width: '10%'}}></div>
              <div style={{width: "45%"}}>
                <p className="firstSignupPage__formBody">Last Name <span className="firstSignupPage__red">*</span></p>
                <div className="firstSignupPage__inputWrap">
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    prefix={<Icon type="user" style={inputIconColor} />}
                  />
                </div>
              </div>
            </div>
            <div className="firstSignupPage__inputBox2">
              <div style={{width: "45%"}}>
                <p className="firstSignupPage__formBody">Phone Number <span className="firstSignupPage__red">*</span></p>
                <div className="firstSignupPage__inputWrap">
                  <Input
                    name="phoneNumber"
                    placeholder="Phone Number"
                    prefix={<Icon type="phone" style={inputIconColor} />}
                  />
                </div>
              </div>
              <div style={{width: '10%'}}></div>
      
            </div>
            <div className="firstSignupPage__inputBox2">
            <div style={{width: '100%'}}>
              <p className="firstSignupPage__formBody">Address <span className="firstSignupPage__red">*</span></p>
              <Input
                name="address"
                placeholder="Address"
                prefix={<Icon type="bank" style={inputIconColor} />}
              />
            </div>
          </div>
          </div>
          <div className="firstSignupPage__footer">
            <div className="firstSignupPage__buttonWrapper">
              <Button
                htmlType="submit"
                className="firstSignupPage__nextButton"
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

export default FirstSignupPage;
