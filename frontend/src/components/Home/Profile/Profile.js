import React, { Component } from 'react';
import './Profile.css';
import { Input, Icon, Form, DatePicker, Slider, Button } from 'antd';

const { Item } = Form;

class Profile extends Component {
  state = {
    dob: '',
    priceRange: [0, 10000]
  }

  handleProfileUpdate = e => {
    e.preventDefault();
  }

  handleProfileDateChange = (date, dateString) => {
    this.setState({ dob: dateString });
  }

  handleProfilePriceRangeChange = value => {
    this.setState({ priceRange: value });
  }

  render() {
    return (
      <div className="profile__container">
        <Form onSubmit={this.handleProfileUpdate}>
          <div className="row justify-content-center">
            <div className="profile__title">
              Edit your profile.
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-5">
              <Item>
                <Input
                  placeholder="Email"
                  name="email"
                  prefix={<Icon type="mail" style={{color: 'rgba(0, 0, 0)'}} />}
                />
              </Item>
            </div>
            <div className="col-5"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-5">
              <Item>
                <Input
                  placeholder="Password"
                  name="password1"
                  type="password"
                  prefix={<Icon type="lock" style={{color: 'rgba(0, 0, 0)'}} />}
                />
              </Item>
            </div>
            <div className="col-5">
              <Item>
                <Input
                  placeholder="Password"
                  name="password2"
                  type="password"
                  prefix={<Icon type="lock" style={{color: 'rgba(0, 0, 0)'}} />}
                />
              </Item>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-5">
              <Item>
                <Input
                  name="firstName"
                  placeholder="First Name"
                  prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0)'}} />}
                />
              </Item>
            </div>
            <div className="col-5">
              <Item>
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0)'}} />}
                />
              </Item>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-5">
              <Item>
                <Input
                  name="phoneNumber"
                  placeholder="Phone Number"
                  prefix={<Icon type="phone" style={{color: 'rgba(0, 0, 0)'}} />}
                />
              </Item>
            </div>
            <div className="col-5">
              <Item>
                <DatePicker
                  className="profile__datePicker"
                  format="MM-DD-YYYY"
                  onChange={this.handleProfileDateChange}
                  prefix={<Icon type="calendar" style={{color: 'rgba(0, 0, 0)'}} />}
                  placeholder="Date of birth"
                />
              </Item>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-10">
              <Item>
                <Input
                  className="profile__address"
                  name="address"
                  placeholder="Address"
                  prefix={<Icon type="bank" style={{color: 'rgba(0, 0, 0)'}} />}
                />
              </Item>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-5">
              <Item>
                <Input
                  name="age"
                  placeholder="Age"
                  prefix={<Icon type="number" style={{color: 'rgba(0, 0, 0)'}} />}
                />
              </Item>
            </div>
            <div className="col-5">
              <Item>
                <Input
                  name="location"
                  placeholder="Location"
                  prefix={<Icon type="environment" style={{color: 'rgba(0, 0, 0)'}} />}
                />
              </Item>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-5">
              <Item>
                <Input
                  name="ethnicity"
                  placeholder="Ethnicity"
                  prefix={<Icon type="flag" style={{color: 'rgba(0, 0, 0)'}} />}
                />
              </Item>
            </div>
            <div className="col-5">
              <Item>
                <Input
                  name="numRoommates"
                  placeholder="Number of Roommates"
                  prefix={<Icon type="smile" style={{color: 'rgba(0, 0, 0)'}} />}
                />
              </Item>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-10">
              <Slider
                range
                onAfterChange={this.handleProfilePriceRangeChange}
                defaultValue={[0, 10000]}
                max={10000}
                step={100}
                marks={{ 0: '$0', 10000: '$10,000' }}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <Button
              className="profile__button--submit"
              htmlType="submit"
              type="primary"
              style={{ width: 440 }}
            >
              <span className="profile__button--bold">SUBMIT</span>
            </Button>
          </div>
        </Form>
      </div>
    )
  }
}

export default Profile;