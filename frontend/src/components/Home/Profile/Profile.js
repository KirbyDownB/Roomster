import React, { Component } from 'react';
import './Profile.css';
import { Input, Icon, Form, DatePicker, Slider, Button } from 'antd';
import  { BASE_URL } from '../../../constants';
import { mockProfileInfo } from '../../../mocks';

const { Item } = Form;

class Profile extends Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dob: '',
    address: '',
    age: '',
    location: '',
    ethnicity: '',
    numRoommates: 0,
    priceRange: [null, null]
  }

  componentDidMount = () => {
    // fetch(`${BASE_URL}/api/something`, {
    //   //something
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log("Received the current user's information", data);
    //   })
    //   .catch(error => {
    //     console.error("Got an error", error);
    //   })

    const { email, firstName, lastName, phoneNumber, dob, address, age, location, ethnicity, numRoommates, priceLow, priceHigh } = mockProfileInfo;
    this.setState({ email, firstName, lastName, phoneNumber, dob, address, age, location, ethnicity, numRoommates, priceRange: [priceLow, priceHigh] });
  }

  handleProfileUpdate = e => {
    e.preventDefault();
  }

  handleProfileDateChange = (date, dateString) => {
    console.log(date)
    this.setState({
      dob: dateString,
      dobMoment: date
    });
  }

  handleProfilePriceRangeChange = value => {
    this.setState({ priceRange: value });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="profile__container">
        <div className="container-fluid">
          {this.state.priceRange[0] && this.state.priceRange[1] && <Form onSubmit={this.handleProfileUpdate}>
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
                    value={this.state.email}
                    onChange={this.handleInputChange}
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
                    onChange={this.handleInputChange}
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
                    onChange={this.handleInputChange}
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
                    value={this.state.firstName}
                    placeholder="First Name"
                    onChange={this.handleInputChange}
                    prefix={<Icon type="user" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </Item>
              </div>
              <div className="col-5">
                <Item>
                  <div className="profile__input--caption">Last Name</div>
                  <Input
                    name="lastName"
                    value={this.state.lastName}
                    placeholder="Last Name"
                    onChange={this.handleInputChange}
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
                    value={this.state.phoneNumber}
                    placeholder="Phone Number"
                    onChange={this.handleInputChange}
                    prefix={<Icon type="phone" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </Item>
              </div>
              <div className="col-5">
                <Item>
                  <div className="profile__input--caption">Address</div>
                  <Input
                    className="profile__address"
                    name="address"
                    value={this.state.address}
                    placeholder="Address"
                    onChange={this.handleInputChange}
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
                    value={this.state.age}
                    onChange={this.handleInputChange}
                    prefix={<Icon type="number" style={{color: 'rgba(0, 0, 0)'}} />}
                  />
                </Item>
              </div>
              <div className="col-5">
                <Item>
                  <div className="profile__input--caption">Location</div>
                  <Input
                    name="location"
                    value={this.state.location}
                    placeholder="Location"
                    onChange={this.handleInputChange}
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
                    value={this.state.ethnicity}
                    onChange={this.handleInputChange}
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
                    value={this.state.numRoommates}
                    onChange={this.handleInputChange}
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
                    defaultValue={this.state.priceRange}
                    max={10000}
                    step={100}
                    marks={{ 0: '$0', 5000: '$5,000', 10000: '$10,000' }}
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
          </Form>}
        </div>
      </div>
    )
  }
}

export default Profile;