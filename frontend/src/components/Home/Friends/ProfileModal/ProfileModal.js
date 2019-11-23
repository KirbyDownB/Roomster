import React, { Component } from 'react';
import { Rate, Icon, Divider } from 'antd';
import './ProfileModal.css';
import { BASE_URL, showErrorMessage, FRIEND_REVIEW_ERROR } from '../../../../constants.js';
import { mockMyReviews } from '../../../../mocks';
import spinner from '../../../../assets/tail-spin.svg';

const moment = require('moment');

class ProfileModal extends Component {
  state = {
    reviews: [],
    isLoading: false
  }

  componentDidMount = () => {
    const { email } = this.props;
    const token = localStorage.getItem("token");

    this.setState({ isLoading: true });

    fetch('http://7b5c79e7.ngrok.io/api/reviews/friend_reviews/', {
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ friend: email })
    })
      .then(response => response.json())
      .then(data => {
        const { Reviews: reviews } = data;
        console.log("Response after fetching friend's reviews in ProfileModal", data);
        this.setState({
          isLoading: false,
          reviews
        });
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(FRIEND_REVIEW_ERROR);
        this.setState({ isLoading: false });
      })
  }

  render(){
    const reviews = [...this.state.reviews];
    const { isLoading } = this.state;

    return(
      <div className="profilemodal__container">
        <div className="profilemodal__header">
          <div className="profilemodal__image-container">
            <img className="profilemodal__image" src={this.props.pf_pic}></img>
          </div>
          <div className="profilemodal__header-text">
            <div className="profilemodal__header-name">{this.props.name}</div>
            <div className="profilemodal__occupation">
              <p className="profilemodal__occupation--inner">{this.props.occupation}</p>
            </div>
          </div>
        </div>
        <div className="container-fluid profilemodal__body">
          <div className="row profilemodal__body-container">
            <div className="col-6 profilemodal__col">
              <div className="profilemodal__icon-container">
                <Icon className="profilemodal__icon" type="mail"/>
                <p className="profilemodal__icon-text"style={{margin: '0'}}>{this.props.email}</p>
              </div>
            </div>
            <div className="col-6 profilemodal__col">
              <div className="profilemodal__icon-container">
                <Icon className="profilemodal__icon" type="phone"/>
                <p className="profilemodal__icon-text"style={{margin: '0'}}>{this.props.phone_number}</p>
              </div>
            </div>
          </div>
          <div className="row profilemodal__body-container">
            <div className="col-6 profilemodal__col">
              <div className="profilemodal__icon-container">
                <Icon className="profilemodal__icon" type="environment"/>
                <p className="profilemodal__icon-text"style={{margin: '0'}}>{this.props.location_of_interest}</p>
              </div>
            </div>
            <div className="col-6 profilemodal__col">
              <div className="profilemodal__icon-container">
                <Icon className="profilemodal__icon" type="calendar"/>
                <p className="profilemodal__icon-text"style={{margin: '0'}}>{this.props.duration}</p>
              </div>
            </div>
          </div>
          <div className="row profilemodal__body-container">
            <div className="col-12 profilemodal__col">
              <div className="profilemodal__icon-container">
                <Icon className="profilemodal__icon" type="user"/>
                <p className="profilemodal__icon-text"style={{margin: '0'}}>{this.props.ethnicity}</p>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        {isLoading &&
          <div className="profilemodal__reviews--loading">
            <img src={spinner} className="profilemodal__spinner" alt=""/>
          </div>
        }
        {!isLoading && <div className="profilemodal__reviews--wrapper">
          <div className="profilemodal__reviews--title">Reviews About {this.props.name.split(' ')[0]}</div>
          <div className="row justify-content-center">
            {reviews.length > 0 && reviews.map(review => {
              const { content, date, name, num_stars: rating } = review;
  
              return (
                <div className="col-12">
                  <div className="profilemodal__reviews--container">
                    <div className="profilemodal__reviews--name">{name}</div>
                    <div className="profilemodal__reviews--date">{moment(date).format('MMMM Do, YYYY')}</div>
                    <div className="profilemodal__reviews--rating">
                      <Rate value={rating} disabled />
                    </div>
                    <div className="profilemodal__reviews--content">{content}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>}
      </div>
    )
  }
}

export default ProfileModal;
