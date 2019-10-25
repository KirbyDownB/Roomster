import React, { Component } from 'react';
import { Animated } from 'react-animated-css';
import './SignupRoot.css';
import circleLogo from '../../assets/imgs/circle-logo.svg';
import FirstSignupPage from './FirstSignupPage.js/FirstSignupPage';
import SecondSignupPage from './SecondSignupPage/SecondSignupPage';

class SignupRoot extends Component {
  state = {
    pageOne: true,
    pageTwo: false,
    signupInfo: null
  }

  setPageOne = () => {
    this.setState({
      pageOne: true,
      pageTwo: false
    });
  }

  setPageTwo = () => {
    this.setState({
      pageTwo: true,
      pageOne: false
    });
  }

  setFirstSignupInfo = firstSignupInfo => {
    const currentSignupInfo = this.state.signupInfo;
    this.setState({ signupInfo: {...currentSignupInfo, firstSignupInfo} });
  }

  handleFinalSubmit = e => {
    // const moreSignupInfo = {
    //   passwordOne: e.target.password1.value,
    //   passwordTwo: e.target.password2.value,
    //   firstName: e.target.firstName.value,
    //   lastName: e.target.lastName.value,
    //   phoneNumber: e.target.phoneNumber.value,
    //   dob: this.state.dob,
    //   address: e.target.address.value
    // }

    // Make a format like the above, and combine the object with the state's object shown below
    // const allInfo = {...this.state.signupInfo, moreSignupInfo}
  }

  handleDateChange = (date, dateString) => {
    console.log("Got a date", dateString);
  }

  render(){
    return(
      <div className="signupRoot__background">
        <Animated animationIn="fadeInLeft" isVisible={true}>
          <div className="container-fluid signupRoot__removePadding">
            <div className="row signupRoot__removeMargin">
              <div className="col-6 signupRoot__removePadding signupRoot__suLeft">
                <div className="signupRoot__logoBox">
                  <img src={circleLogo} alt=""/>
                </div>
              </div>
              <div className="col-6 signupRoot__removePadding">
                <h1 className="signupRoot__formTitle">Rooming made easy for you.</h1>
                {this.state.pageOne && <FirstSignupPage setPageTwo={this.setPageTwo} setFirstSignupInfo={this.setFirstSignupInfo} />}
                {this.state.pageTwo && <SecondSignupPage setPageOne={this.setPageOne} handleFinalSubmit={this.handleFinalSubmit} />}
              </div>
            </div>
          </div>
        </Animated>
      </div>
    )
  }
}

export default SignupRoot;
