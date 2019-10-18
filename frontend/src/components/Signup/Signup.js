import React, { Component } from 'react';
import { Animated } from 'react-animated-css';
import { Input, Icon, Button, Form } from 'antd';
import './Signup.css';
import circleLogo from '../../assets/imgs/circle-logo.svg';

class Signup extends Component {
  state = {
  }

  handleSubmit = (e) => {
    //add post
  }

  render(){
    return(
      <div className="signup__background">
        <Animated animationIn="fadeInLeft" isVisible={true}>
          <div className="container-fluid signup__removePadding">
            <div className="row signup__removeMargin">
              <div className="col-6 signup__removePadding signup__suLeft">
                <div className="signup__logoBox">
                  <img src={circleLogo} alt=""/>
                </div>
              </div>
              <div className="col-6 signup__removePadding">
                <Form onSubmit={this.handleSubmit}>
                <div className="signup__formBox">
                  <h1 className="signup__formTitle">Rooming made easy for you.</h1>
                  <div className="signup__inputBox">
                    <div style={{width: "45%"}}>
                      <p className="signup__formBody">Email <span className="signup__red">*</span></p>
                      <div className="signup__inputWrap">
                        <Input
                          name="email"
                          placeholder="Username / Email"
                          prefix={<Icon type="mail" style={{color: 'rgba(0, 0, 0)'}} />}
                        />
                      </div>
                    </div>
                    <div style={{width: '10%'}}></div>
                    <div style={{width: "45%"}}>
                      <p className="signup__formBody">Profile</p>
                      <div className="signup__inputWrap">
                        <Input
                          name="profile"
                          placeholder="Upload Picture"
                          prefix={<Icon type="file-add" style={{color: 'rgba(0, 0, 0)'}} />}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="signup__inputBox2">
                    <div style={{width: "45%"}}>
                      <p className="signup__formBody">Password <span className="signup__red">*</span></p>
                      <div className="signup__inputWrap">
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
                      <p className="signup__formBody">Confirm Password <span className="signup__red">*</span></p>
                      <div className="signup__inputWrap">
                        <Input
                          name="password2"
                          type="password"
                          placeholder="Password"
                          prefix={<Icon type="lock" style={{color: 'rgba(0, 0, 0)'}} />}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="signup__inputBox2">
                    <div style={{width: "45%"}}>
                      <p className="signup__formBody">First Name <span className="signup__red">*</span></p>
                      <div className="signup__inputWrap">
                        <Input
                          name="firstName"
                          value={this.state.firstName}
                          placeholder="First Name"
                          prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0)'}} />}
                        />
                      </div>
                    </div>
                    <div style={{width: '10%'}}></div>
                    <div style={{width: "45%"}}>
                      <p className="signup__formBody">Last Name <span className="signup__red">*</span></p>
                      <div className="signup__inputWrap">
                        <Input
                          name="lastName"
                          placeholder="Last Name"
                          prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0)'}} />}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="signup__inputBox2">
                    <div style={{width: "45%"}}>
                      <p className="signup__formBody">Phone Number <span className="signup__red">*</span></p>
                      <div className="signup__inputWrap">
                        <Input
                          name="phoneNumber"
                          placeholder="Phone Number"
                          prefix={<Icon type="phone" style={{color: 'rgba(0, 0, 0)'}} />}
                        />
                      </div>
                    </div>
                    <div style={{width: '10%'}}></div>
                    <div style={{width: "45%"}}>
                      <p className="signup__formBody">Date of Birth <span className="signup__red">*</span></p>
                      <div className="signup__inputWrap">
                        <Input
                          name="dateOfBirth"
                          placeholder="Date of Birth"
                          prefix={<Icon type="calendar"
                          style={{color: 'rgba(0, 0, 0)'}} />}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="signup__inputBox2">
                    <div style={{width: '100%'}}>
                      <p className="signup__formBody">Address <span className="signup__red">*</span></p>
                      <Input
                        name="address"
                        placeholder="Address"
                        prefix={<Icon type="bank" style={{color: 'rgba(0, 0, 0)'}} />}
                      />
                    </div>
                  </div>
                  </div>
                  <div className="signup__footer">
                    <div className="signup__buttonWrapper">
                      <button className="signup__prevButton">Previous</button>
                    </div>
                    <div className="signup__buttonWrapper2">
                      <Button
                        htmlType="submit"
                        className="signup__nextButton"
                        type="primary"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    )
  }
}

export default Signup;
