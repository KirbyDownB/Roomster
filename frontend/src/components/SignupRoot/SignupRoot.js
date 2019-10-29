import React, { Component } from 'react';
import { Animated } from 'react-animated-css';
import './SignupRoot.css';
import circleLogo from '../../assets/imgs/circle-logo.svg';
import FirstSignupPage from './FirstSignupPage.js/FirstSignupPage';
import SecondSignupPage from './SecondSignupPage/SecondSignupPage';
import { userRegisterFetch } from '../../redux/action';
import { connect } from 'react-redux';

class SignupRoot extends Component {
  state = {
    pageOne: true,
    pageTwo: false,
    firstSignupInfo: {},
    secondSignupInfo: {}
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
    this.setState({ firstSignupInfo: {...this.state.firstSignupInfo, ...firstSignupInfo} });
  }

  handleFinalSubmit = secondSignupInfo => {
    const allInfo = { ...this.state.firstSignupInfo, ...secondSignupInfo };
    console.log("Got all info", allInfo)
    this.props.userRegisterFetch(allInfo)
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
                {this.state.pageOne && <FirstSignupPage firstSignupInfo={this.state.firstSignupInfo} setPageTwo={this.setPageTwo} setFirstSignupInfo={this.setFirstSignupInfo} setInput={this.setInput} />}
                {this.state.pageTwo && <SecondSignupPage setPageOne={this.setPageOne} handleFinalSubmit={this.handleFinalSubmit} />}
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

export default connect(null, mapDispatchToProps)(SignupRoot);
