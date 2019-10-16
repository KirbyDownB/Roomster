import React, { Component } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { Animated } from 'react-animated-css';
import { Input, Icon, Button } from 'antd';
import './Signup.css';

const circleLogo = require('../../assets/imgs/circle-logo.svg');

class Signup extends Component {
  state = {
    email: '',
    password1: '',
    password2: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: ''
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render(){
    return(
      <div className="signupBG">
        <Animated animationIn="fadeInLeft" isVisible={true}>
          <Container fluid className="removePadding">
            <Row className="removeMargin">
              <Col xs lg="5" className="removePadding suLeft">
                <div className="logoBox">
                  <img src={circleLogo}></img>
                </div>
              </Col>
              <Col className="removePadding">
                <div className="formBox">
                  <h1 className="formTitle">Rooming made easy for you.</h1>
                  <div className="inputBox">
                    <div style={{width: "45%"}}>
                      <p className="formBody">Email *</p>
                      <div className="inputWrap">
                        <Input name="email" value={this.state.email} onChange={this.handleChange} placeholder="Username / Email" prefix={<Icon type="mail" style={{color: 'rgba(0, 0, 0)'}} />}/>
                      </div>
                    </div>
                    <div style={{width: '10%'}}></div>
                    <div style={{width: "45%"}}>
                      <p className="formBody">Email *</p>
                      <div className="inputWrap">
                        <Input value={this.state.email} onChange={this.handleChange} placeholder="Username / Email" prefix={<Icon type="mail" style={{color: 'rgba(0, 0, 0)'}} />}/>
                      </div>
                    </div>
                  </div>
                  <div className="inputBox2">
                    <div style={{width: "45%"}}>
                      <p className="formBody">Password *</p>
                      <div className="inputWrap">
                        <Input name="password1" type="password" value={this.state.password1} onChange={this.handleChange} placeholder="Password" prefix={<Icon type="lock" style={{color: 'rgba(0, 0, 0)'}} />}/>
                      </div>
                    </div>
                    <div style={{width: '10%'}}></div>
                    <div style={{width: "45%"}}>
                      <p className="formBody">Password *</p>
                      <div className="inputWrap">
                        <Input name="password2" type="password" value={this.state.password2} onChange={this.handleChange} placeholder="Password" prefix={<Icon type="lock" style={{color: 'rgba(0, 0, 0)'}} />}/>
                      </div>
                    </div>
                  </div>
                  <div className="inputBox2">
                    <div style={{width: "45%"}}>
                      <p className="formBody">First Name *</p>
                      <div className="inputWrap">
                        <Input name="firstName" value={this.state.firstName} onChange={this.handleChange} placeholder="First Name" prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0)'}} />}/>
                      </div>
                    </div>
                    <div style={{width: '10%'}}></div>
                    <div style={{width: "45%"}}>
                      <p className="formBody">Last Name *</p>
                      <div className="inputWrap">
                        <Input name="lastName" value={this.state.lastName} onChange={this.handleChange} placeholder="Last Name" prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0)'}} />}/>
                      </div>
                    </div>
                  </div>
                  <div className="inputBox2">
                    <div style={{width: "45%"}}>
                      <p className="formBody">Phone Number *</p>
                      <div className="inputWrap">
                        <Input name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange} placeholder="Phone Number" prefix={<Icon type="phone" style={{color: 'rgba(0, 0, 0)'}} />}/>
                      </div>
                    </div>
                    <div style={{width: '10%'}}></div>
                    <div style={{width: "45%"}}>
                      <p className="formBody">Date of Birth *</p>
                      <div className="inputWrap">
                        <Input name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleChange} placeholder="Date of Birth" prefix={<Icon type="calendar" style={{color: 'rgba(0, 0, 0)'}} />}/>
                      </div>
                    </div>
                  </div>
                  <div className="inputBox2">
                    <div style={{width: '100%'}}>
                      <Input name="address" value={this.state.address} onChange={this.handleChange} placeholder="Address" prefix={<Icon type="bank" style={{color: 'rgba(0, 0, 0)'}} />}/>
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <div className="buttonWrapper">
                    <button className="prevButton">Previous</button>
                  </div>
                  <div className="buttonWrapper2">
                    <button className="nextButton">Next</button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Animated>
      </div>
    )
  }
}

export default Signup;
