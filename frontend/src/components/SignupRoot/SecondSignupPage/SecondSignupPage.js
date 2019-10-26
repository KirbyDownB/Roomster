import React, { Component } from 'react';
import './SecondSignupPage.css';
import { Form, Input, Button, Icon, Slider } from 'antd';

class SecondSignupPage extends Component {
  state = {
    priceRange: [0, 10000]
  }

  handleSecondSignupPageSubmit = e => {
    e.preventDefault();

    const secondSignupInfo = {
      age: e.target.age.value,
      location: e.target.location.value,
      ethnicity: e.target.ethnicity.value,
      numRoommates: e.target.numRoommates.value,
      priceRange: this.state.priceRange
    };

    this.props.handleFinalSubmit(secondSignupInfo);
  }

  handlePriceRangeChange = value => {
    this.setState({ priceRange: value });
  }

  render() {
    return (
      <div className="secondSignupPage__container">
        <Form onSubmit={this.handleSecondSignupPageSubmit}>
          <div className="secondSignupPage__formBox">
            <div className="secondSignupPage__inputBox2">
              <div style={{width: "45%"}}>
                <p className="secondSignupPage__formBody">Age</p>
                <div className="secondSignupPage__inputWrap">
                  <Input
                    name="age"
                    placeholder="Age"
                    prefix={<Icon type="number" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
              <div style={{width: '10%'}}></div>
              <div style={{width: "45%"}}>
                <p className="secondSignupPage__formBody">Location</p>
                <div className="secondSignupPage__inputWrap">
                  <Input
                    name="location"
                    placeholder="Location"
                    prefix={<Icon type="environment" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
            </div>
            <div className="secondSignupPage__inputBox2">
              <div style={{width: "45%"}}>
                <p className="secondSignupPage__formBody">Ethnicity</p>
                <div className="secondSignupPage__inputWrap">
                  <Input
                    name="ethnicity"
                    placeholder="Ethnicity"
                    prefix={<Icon type="flag" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
              <div style={{width: '10%'}}></div>
              <div style={{width: "45%"}}>
                <p className="secondSignupPage__formBody">Number of Roommates</p>
                <div className="secondSignupPage__inputWrap">
                  <Input
                    name="numRoommates"
                    placeholder="Number of Roommates"
                    prefix={<Icon type="smile" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </div>
              </div>
            </div>
            <div className="secondSignupPage__inputBox2">
              <div style={{width: '100%'}}>
                <p className="secondSignupPage__formBody secondSignupPage__priceRange--title">Price Range</p>
                <Slider
                  className="secondSignupPage__slider"
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