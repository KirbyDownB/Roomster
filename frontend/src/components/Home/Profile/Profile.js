import React, { Component } from 'react';
import './Profile.css';
import { Input, Icon, Form, Slider, Button, Alert } from 'antd';
import  { BASE_URL } from '../../../constants';

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
    password: '',
    pf_pic: null,
    numRoommates: null,
    priceLow: null,
    priceHigh: null,
    token: null,
    alertMessage: "",
    messageType: "warning"
  }

  componentDidMount = () => {
    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/api/update_profile/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log("Received the current user's information", data);
        const { user } = data;
        const { pf_pic, address, age, email, ethnicity, first_name: firstName, last_name: lastName, location_of_interest: location, number_of_roommates: numRoommates, phone_number: phoneNumber, price_range_max: priceHigh, price_range_min: priceLow } = user;

        this.setState({ pf_pic, email, firstName, lastName, phoneNumber, address, age, location, ethnicity, numRoommates, priceLow, priceHigh });
      })
      .catch(error => {
        console.error("Got an error", error);
      })

    // const { email, firstName, lastName, phoneNumber, dob, address, age, location, ethnicity, numRoommates, priceLow, priceHigh } = mockProfileInfo;
    // this.setState({ email, firstName, lastName, phoneNumber, dob, address, age, location, ethnicity, numRoommates, priceRange: [priceLow, priceHigh] });
  }

  handleProfileUpdate = e => {
    e.preventDefault();

    this.setState({ isLoading: true });

    const token = localStorage.getItem("token");
    let userInfo = this.state;
    delete userInfo.isLoading;

    fetch(`${BASE_URL}/api/update_profile/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      method: "POST",
      body: JSON.stringify({ ...this.state })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Received the current user's information", data);
        const { user } = data;
        const {
          address,
          age,
          email,
          ethnicity,
          first_name: firstName,
          last_name: lastName,
          location_of_interest:
          location,
          number_of_roommates: numRoommates,
          phone_number: phoneNumber,
          price_range_max: priceHigh,
          price_range_min: priceLow
        } = user;

        this.setState({ email, firstName, lastName, phoneNumber, address, age, location, ethnicity, numRoommates, priceRange: [priceLow, priceHigh], isLoading: false, alertMessage: "Your profile has been successfully updated!", messageType: "success" });
      })
      .catch(error => {
        console.error("Got an error", error);
        this.setState({
          isLoading: false,
          alertMessage: "Something went wrong!",
          messageType: "warning"
        });
      })
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
    console.log(this.state.priceLow)

    return (
      <div className="profile__container">
        <div className="container-fluid">
          {this.state.priceLow && this.state.priceHigh && <Form onSubmit={this.handleProfileUpdate}>
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
              <div className="col-5">
                <div className="profile__image-container">
                  <img className="profile__image" src={this.state.pf_pic}></img>
                </div>
              </div>
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
                    defaultValue={[this.state.priceLow, this.state.priceHigh]}
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
                loading={this.state.isLoading}
              >
                <span className="profile__button--bold">SUBMIT</span>
              </Button>
            </div>
          </Form>}
          {/* <div className="profile__alertMessage--container">
            <div className="row justify-content-center">
              {this.state.alertMessage && this.state.messageType && <Alert
                className="profile__alertMessage"
                message={this.state.alertMessage}
                type={this.state.messageType}
                closable
                afterClose={this.handleAlertClose}
              />}
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}

export default Profile;
