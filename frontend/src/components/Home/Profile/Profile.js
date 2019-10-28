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
        <div className="container-fluid">
          <Form onSubmit={this.handleProfileUpdate}>
            <div className="row justify-content-center">
              <div className="col-10">
                <div className="profile__title">
                  Edit your profile.
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-5">
                <Item>
                  <div className="profile__input--caption">Email</div>
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
                  <div className="profile__input--caption">Password</div>
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
                  <div className="profile__input--caption">Confirm Password</div>
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
                  <div className="profile__input--caption">First Name</div>
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </Item>
              </div>
              <div className="col-5">
                <Item>
                  <div className="profile__input--caption">Last Name</div>
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
                  <div className="profile__input--caption">Phone Number</div>
                  <Input
                    name="phoneNumber"
                    placeholder="Phone Number"
                    prefix={<Icon type="phone" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </Item>
              </div>
              <div className="col-5">
                <Item>
                  <div className="profile__input--caption">Date of Birth</div>
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
                  <div className="profile__input--caption">Address</div>
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
                  <div className="profile__input--caption">Age</div>
                  <Input
                    name="age"
                    placeholder="Age"
                    prefix={<Icon type="number" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </Item>
              </div>
              <div className="col-5">
                <Item>
                  <div className="profile__input--caption">Location</div>
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
                  <div className="profile__input--caption">Ethnicity</div>
                  <Input
                    name="ethnicity"
                    placeholder="Ethnicity"
                    prefix={<Icon type="flag" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </Item>
              </div>
              <div className="col-5">
                <Item>
                  <div className="profile__input--caption">Number of Roommates</div>
                  <Input
                    name="numRoommates"
                    placeholder="Number of roommates"
                    prefix={<Icon type="smile" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </Item>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-10">
                <Item>
                  <div className="profile__input--caption">Price Range</div>
                  <Slider
                    range
                    onAfterChange={this.handleProfilePriceRangeChange}
                    defaultValue={[0, 10000]}
                    max={10000}
                    step={100}
                    marks={{ 0: '$0', 10000: '$10,000' }}
                  />
                </Item>
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
      </div>
    )
  }
}

export default Profile;