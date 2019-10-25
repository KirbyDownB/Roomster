import React, { Component } from 'react';
import './MoreInfo.css';
import { Form, Input, Button, DatePicker, Icon } from 'antd';

class MoreInfo extends Component {
  render() {
    return (
      <div className="moreinfo__container">
        <Form onSubmit={this.props.handleFinalSubmit}>
          <div className="moreInfo__formBox">
            <div className="moreInfo__inputBox">
              <div style={{width: "45%"}}>
                <p className="moreInfo__formBody">Email <span className="moreInfo__red">*</span></p>
                <div className="moreInfo__inputWrap">
                  <Input
                    name="email"
                    placeholder="Username / Email"
                    prefix={<Icon type="mail" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
              <div style={{width: '10%'}}></div>
            </div>
            <div className="moreInfo__inputBox2">
              <div style={{width: "45%"}}>
                <p className="moreInfo__formBody">Password <span className="moreInfo__red">*</span></p>
                <div className="moreInfo__inputWrap">
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
                <p className="moreInfo__formBody">Confirm Password <span className="moreInfo__red">*</span></p>
                <div className="moreInfo__inputWrap">
                  <Input
                    name="password2"
                    type="password"
                    placeholder="Password"
                    prefix={<Icon type="lock" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
            </div>
            <div className="moreInfo__inputBox2">
              <div style={{width: "45%"}}>
                <p className="moreInfo__formBody">First Name <span className="moreInfo__red">*</span></p>
                <div className="moreInfo__inputWrap">
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
              <div style={{width: '10%'}}></div>
              <div style={{width: "45%"}}>
                <p className="moreInfo__formBody">Last Name <span className="moreInfo__red">*</span></p>
                <div className="moreInfo__inputWrap">
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
            </div>
            <div className="moreInfo__inputBox2">
              <div style={{width: "45%"}}>
                <p className="moreInfo__formBody">Phone Number <span className="moreInfo__red">*</span></p>
                <div className="moreInfo__inputWrap">
                  <Input
                    name="phoneNumber"
                    placeholder="Phone Number"
                    prefix={<Icon type="phone" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
              <div style={{width: '10%'}}></div>
              <div style={{width: "45%"}}>
                <p className="moreInfo__formBody">Date of Birth <span className="moreInfo__red">*</span></p>
                <div className="moreInfo__inputWrap">
                  <DatePicker
                    className="moreInfo__datePicker"
                    format="MM-DD-YYYY"
                    onChange={this.handleDateChange}
                    prefix={<Icon type="calendar" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
            </div>
            <div className="moreInfo__inputBox2">
            <div style={{width: '100%'}}>
              <p className="moreInfo__formBody">Address <span className="moreInfo__red">*</span></p>
              <Input
                name="address"
                placeholder="Address"
                prefix={<Icon type="bank" style={{color: 'rgba(0, 0, 0)'}} />}
              />
            </div>
          </div>
          </div>
          <div className="moreInfo__footer">
            <div className="moreInfo__buttonWrapper">
              <Button
                className="moreInfo__prevButton"
                onClick={this.props.setPageOne}
              >
                Previous
              </Button>
            </div>
            <div className="moreInfo__buttonWrapper">
              <Button
                htmlType="submit"
                className="moreInfo__submitButton"
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

export default MoreInfo;