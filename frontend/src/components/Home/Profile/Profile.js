import React, { Component } from 'react';
import './Profile.css';
import { Input, Icon, Form, Slider, Button, Select } from 'antd';
import  {
  BASE_URL,
  occupations,
  showErrorMessage,
  showSuccessMessage,
  PROFILE_LOAD_ERROR,
  PROFILE_UPDATE_ERROR,
  PROFILE_UPDATE_SUCCESS,
  PASSWORD_MATCH_ERROR,
  ethnicities,
  durations
} from '../../../constants';
import spinner from '../../../assets/tail-spin.svg';

const { Item } = Form;
const { Option } = Select;

class Profile extends Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dob: '',
    occupation: '',
    age: '',
    location: '',
    duration: '',
    ethnicity: '',
    password: '',
    pf_pic: null,
    numRoommates: null,
    priceLow: null,
    priceHigh: null,
    pf_pic: null,
    token: null,
    alertMessage: "",
    messageType: "warning",
    isProfileUpdating: false,
    isProfileLoading: false
  }

  componentDidMount = () => {
    const token = localStorage.getItem("token");

    this.setState({ isProfileLoading: true });

    fetch(`${BASE_URL}/api/update_profile/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    })
      .then(response => response.status === 400 ? Promise.reject() : response.json())
      .then(data => {
        console.log("Received the current user's information", data);
        const { user } = data;
        const { pf_pic, age, email, ethnicity, occupation, duration, first_name: firstName, last_name: lastName, location_of_interest: location, number_of_roommates: numRoommates, phone_number: phoneNumber, price_range_max: priceHigh, price_range_min: priceLow } = user;

        this.setState({ pf_pic, email, firstName, lastName, phoneNumber, occupation, duration, age, location, ethnicity, numRoommates, priceLow, priceHigh, isProfileLoading: false });
      })
      .catch(error => {
        showErrorMessage(PROFILE_LOAD_ERROR);
        this.setState({ isProfileLoading: false });
      });
  }

  handleProfileUpdate = e => {
    e.preventDefault();

    const password1 = e.target.password1.value;
    const password2 = e.target.password2.value;

    if (password1 !== password2) {
      showErrorMessage(PASSWORD_MATCH_ERROR);
      return;
    }

    this.setState({ isProfileUpdating: true });

    const token = localStorage.getItem("token");
    let userInfo = this.state;
    delete userInfo.isProfileUpdating;
    delete userInfo.isProfileLoading;
    delete userInfo.password;

    console.log("Submitting userInfo to update_profile", userInfo);

    fetch(`${BASE_URL}/api/update_profile/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      method: "POST",
      body: JSON.stringify({ ...userInfo, password: password1 })
    })
      .then(response => response.status === 400 ? Promise.reject() : response.json())
      .then(data => {
        console.log("Received response after UPDATING PROFILE", data);
        this.setState({ isProfileUpdating: false });
        showSuccessMessage(PROFILE_UPDATE_SUCCESS);
      })
      .catch(error => {
        console.error("Got an error after UPDATING PROFILE", error);
        this.setState({ isProfileUpdating: false });
        showErrorMessage(PROFILE_UPDATE_ERROR);
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

  handleOccupationChange = occupation => this.setState({ occupation });

  handleEthnicityChange = ethnicity => this.setState({ ethnicity });

  handleDurationChange = duration => this.setState({ duration });

  render() {
    return (
      <div className="profile__container">
        <div className="container-fluid">
          {this.state.isProfileLoading && <img className="profile__spinner" src={spinner} alt=""/> }
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
                  <div className="profile__input--caption">Occupation</div>
                  <Select
                    defaultValue={this.state.occupation}
                    onChange={this.handleOccupationChange}
                  >
                    {occupations.map(occupationOption => <Option value={occupationOption}>{occupationOption}</Option>)}
                  </Select>
                  {/* <Input
                    className="profile__address"
                    name="address"
                    value={this.state.address}
                    placeholder="Address"
                    onChange={this.handleInputChange}
                    prefix={<Icon type="bank" style={{color: 'rgba(0, 0, 0)'}} />}
                  /> */}
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
                  <Select
                    defaultValue={this.state.ethnicity}
                    onChange={this.handleEthnicityChange}
                  >
                    {ethnicities.map(ethnicityOption => <Option value={ethnicityOption}>{ethnicityOption}</Option>)}
                  </Select>
                  {/* <Input
                    name="ethnicity"
                    placeholder="Ethnicity"
                    value={this.state.ethnicity}
                    onChange={this.handleInputChange}
                    prefix={<Icon type="flag" style={{color: 'rgba(0, 0, 0)'}} />}
                  /> */}
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
              <div className="col-5">
                <Item>
                  <div className="profile__input--caption">Duration</div>
                  <Select
                    defaultValue={this.state.duration}
                    onChange={this.handleDurationChange}
                  >
                    {durations.map(durationOption => <Option value={durationOption}>{durationOption}</Option>)}
                  </Select>
                </Item>
              </div>
              <div className="col-5">
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
                loading={this.state.isProfileUpdating}
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
