import React, { Component } from 'react';
import './Reviews.css';
import { Select } from 'antd';
import ReviewsCard from './ReviewsCard/ReviewsCard';
import { mockReviews } from '../../../mocks';
import { BASE_URL } from '../../../constants';
import spinner from '../../../assets/tail-spin.svg';

const { Option } = Select;

class Reviews extends Component {
  state = {
    isReviewsLoading: false
  }

  componentDidMount = () => {
    this.setState({ isReviewsLoading: true });

    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/api/reviews/all/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      method: "GET"
    })
      .then(response => response.status === 400 ? Promise.reject() : response.json())
      .then(data => {
        console.log("Got reviews", data);
        this.setState({ isReviewsLoading: false });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isReviewsLoading: false });
      });
  }

  render() {
    return (
      <div className="reviews__container">
        <div className="container-fluid">
          {this.state.isReviewsLoading && <img className="reviews__spinner" src={spinner} alt=""/> }
          {!this.state.isReviewsLoading && <div className="reviews__wrapper">
            <div className="row">
              <div className="col-2">
                <h2 className="reviews__title">Reviews</h2>
              </div>
              <div className="col-10">
                <Select
                  className="reviews__select"
                  defaultValue="me"
                >
                  <Option value="me">My reviews</Option>
                  <Option value="others">Reviews about me</Option>
                </Select>
              </div>
            </div>
            <div className="reviews__reviewscard--wrapper">
              <div className="row justify-content-center">
                {mockReviews.map(review => {
                  return (
                    <div className="col-10">
                      <ReviewsCard {...review} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>}
        </div>
      </div>
    )
  }
}

export default Reviews;