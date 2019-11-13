import React, { Component } from 'react';
import { Animated } from 'react-animated-css';
import { Form, Input, Button, Icon, Slider, InputNumber } from 'antd';
import './Signup.css';
import circleLogo from '../../assets/imgs/circle-logo.svg';
import { userRegisterFetch } from '../../redux/action';
import { connect } from 'react-redux';
import { inputIconColor, showErrorMessage, PASSWORD_MATCH_ERROR, EMPTY_INPUT_ERROR, PHONE_ERROR } from '../../constants';

const phone = require('phone');
const { Item } = Form;

class Signup extends Component {
  state = {
    priceRange: [0, 10000],
    numRoommates: 2,
    age: 21
  }

  handleSubmit = e => {
    e.preventDefault();

    const password1 = e.target.password1.value;
    const password2 = e.target.password2.value;
    if (password1 !== password2) {
      showErrorMessage(PASSWORD_MATCH_ERROR);
      return;
    }

    const phoneNumber = phone(e.target.phoneNumber.value);
    if (phoneNumber.length !== 2) {
      showErrorMessage(PHONE_ERROR);
      return;
    }

    const email = e.target.email.value;
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const age = this.state.age;
    const location = e.target.location.value;
    const ethnicity = e.target.ethnicity.value;
    const numRoommates = this.state.numRoommates;
    const priceRange = this.state.priceRange;

    if (!email || !firstName || !lastName || !phoneNumber || !location || !ethnicity) {
      showErrorMessage(EMPTY_INPUT_ERROR);
      return;
    }

    const allInfo = { email, password1, password2, firstName, lastName, phoneNumber: phoneNumber[0], age, location, ethnicity, numRoommates, priceRange };
    
    this.props.userRegisterFetch(allInfo);
  }

  handlePriceRangeChange = priceRange => {
    this.setState({ priceRange });
  }

  handleNumRoommatesChange = numRoommates => {
    this.setState({ numRoommates })
  }

  handleAgeChange = age => {
    this.setState({ age });
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
                <div className="signup__left--container">
                  <h1 className="signup__formTitle">Rooming made easy for you.</h1>
                  <Form onSubmit={this.handleSubmit}>
                    <div className="signup__formBox">
                      <div className="row justify-content-center">
                        <div className="col-6">
                          <Item>
                            <p className="signup__formBody">Email <span className="signup__red">*</span></p>
                            <Input
                              name="email"
                              placeholder="Username / Email"
                              prefix={<Icon type="mail" style={inputIconColor} />}
                            />
                          </Item>
                        </div>
                        <div className="col-6">
                          Image upload can go here
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-6">
                          <Item>
                            <p className="signup__formBody">Password <span className="signup__red">*</span></p>
                            <Input
                              name="password1"
                              type="password"
                              placeholder="Password"
                              prefix={<Icon type="lock" style={inputIconColor} />}
                            />
                          </Item>
                        </div>
                        <div className="col-6">
                          <Item>
                            <p className="signup__formBody">Confirm Password <span className="signup__red">*</span></p>
                            <Input
                              name="password2"
                              type="password"
                              placeholder="Password"
                              prefix={<Icon type="lock" style={inputIconColor} />}
                            />
                          </Item>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-6">
                          <Item>
                            <p className="signup__formBody">First Name <span className="signup__red">*</span></p>
                            <Input
                              name="firstName"
                              placeholder="First Name"
                              prefix={<Icon type="user" style={inputIconColor} />}
                            />
                          </Item>
                        </div>
                        <div className="col-6">
                          <Item>
                            <p className="signup__formBody">Last Name <span className="signup__red">*</span></p>
                            <Input
                              name="lastName"
                              placeholder="Last Name"
                              prefix={<Icon type="user" style={inputIconColor} />}
                            />
                          </Item>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-6">
                          <Item>
                            <p className="signup__formBody">Phone Number <span className="signup__red">*</span></p>
                            <Input
                              name="phoneNumber"
                              placeholder="Phone Number"
                              prefix={<Icon type="phone" style={inputIconColor} />}
                            />
                          </Item>
                        </div>
                        <div className="col-6">
                          <Item>
                            <p className="signup__formBody">Age</p>
                            <InputNumber
                              className="signup__inputNumber"
                              min={1}
                              max={99}
                              defaultValue={21}
                              onChange={this.handleAgeChange}
                            />
                          </Item>
                        </div>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-6">
                          <Item>
                            <p className="signup__formBody">Location</p>
                            <Input
                              name="location"
                              placeholder="Location"
                              prefix={<Icon type="environment" style={{color: 'rgba(0, 0, 0)'}} />}
                            />
                          </Item>
                        </div>
                        <div className="col-6">
                          <Item>
                            <p className="signup__formBody">Ethnicity</p>
                            <Input
                              name="ethnicity"
                              placeholder="Ethnicity"
                              prefix={<Icon type="flag" style={{color: 'rgba(0, 0, 0)'}} />}
                            />
                          </Item>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <Item>
                            <p className="signup__formBody">Number of Roommates</p>
                            <InputNumber
                              className="signup__inputNumber"
                              min={1}
                              max={10}
                              defaultValue={2}
                              onChange={this.handleNumRoommatesChange}
                            />
                          </Item>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <p className="signup__formBody signup__priceRange--title">Price Range</p>
                          <Slider
                            className="signup__slider"
                            range
                            onAfterChange={this.handlePriceRangeChange}
                            defaultValue={[0, 10000]}
                            max={10000}
                            step={100}
                            marks={{ 0: '$0', 10000: '$10,000' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="signup__buttonWrapper">
                        <Button
                          htmlType="submit"
                          className="signup__submitButton"
                          type="primary"
                        >
                          SUBMIT
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  userRegisterFetch: user => dispatch(userRegisterFetch(user))
})

export default connect(null, mapDispatchToProps)(Signup);
