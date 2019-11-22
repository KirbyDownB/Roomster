import React, { Component } from 'react';
import './Reviews.css';
import { Radio, Select, Alert } from 'antd';
import ReviewsCard from './ReviewsCard/ReviewsCard';
import { mockMyReviews, mockOtherReviews } from '../../../mocks';
import { BASE_URL,
  MY_REVIEW_SELECTION,
  REVIEWS_ABOUT_ME_SELECTION,
  NO_REVIEWS,
  reviewsSortOptions
} from '../../../constants';
import spinner from '../../../assets/tail-spin.svg';

const { Option } = Select;
const { Group, Button } = Radio;

class Reviews extends Component {
  state = {
    isReviewsLoading: false,
    myReviews: [],
    otherReviews: [],
    toggle: MY_REVIEW_SELECTION,
    sortBy: reviewsSortOptions[0]
  }

  componentDidMount = () => {
    // this.setState({
    //   myReviews: mockMyReviews,
    //   otherReviews: mockOtherReviews
    // });

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
        console.log("Got response on Reviews render", data);
        const { my_reviews: myReviews, otherReviews } = data;
        this.setState(prevState => ({
          myReviews,
          otherReviews,
          isReviewsLoading: false
        }))
      })
      .catch(error => {
        console.error(error);
        this.setState({ isReviewsLoading: false });
      });
  }

  setToggle = e => {
    const value = e.target.value;
    this.setState({ toggle: value });
  }

  handleReviewSortChange = sortBy => {
    const sortedMyReviews = [...this.state.myReviews];
    const sortedOtherReviews = [...this.state.otherReviews];

    if (sortBy === "Most Recent") {
      sortedMyReviews.sort((a, b) => a.date < b.date ? -1 : 1);
      sortedOtherReviews.sort((a, b) => a.date < b.date ? -1 : 1);
    } else if (sortBy === "Highest Rating") {
      sortedMyReviews.sort((a, b) => a.num_stars > b.num_stars ? -1 : 1);
      sortedOtherReviews.sort((a, b) => a.num_stars > b.num_stars ? -1 : 1);
    } else if (sortBy === "Longest") {
      sortedMyReviews.sort((a, b) => a.content.length > b.content.length ? -1 : 1);
      sortedOtherReviews.sort((a, b) => a.content.length > b.content.length ? -1 : 1);
    }

    this.setState({
      myReviews: sortedMyReviews,
      otherReviews: sortedOtherReviews
    });
  }

  render() {
    const { toggle } = this.state;
    const reviews = toggle === MY_REVIEW_SELECTION ? [...this.state.myReviews] : [...this.state.otherReviews];
    console.log("Rendering reviews", reviews);

    return (
      <div className="reviews__container">
        <div className="container-fluid">
          {this.state.isReviewsLoading ? (
            <img className="reviews__spinner" src={spinner} alt=""/>
          ) : (
            <div className="reviews__wrapper">
              <div className="row">
                <div className="col-2">
                  <h2 className="reviews__title">Reviews</h2>
                </div>
                <div className="col-10">
                  <Select
                    className="reviews__sortby"
                    defaultValue={reviewsSortOptions[0]}
                    onChange={this.handleReviewSortChange}
                  >
                    {reviewsSortOptions.map(option => <Option value={option}>{option}</Option>)}
                  </Select>
                </div>
              </div>
              <div className="reviews__toggle--wrapper">
                <div className="row justify-content-center">
                  <div className="col-12">
                    <Group
                      className="reviews__toggle"
                      onChange={this.setToggle}
                      defaultValue={this.state.toggle}
                      buttonStyle="solid"
                    >
                      <Button value={MY_REVIEW_SELECTION}>{MY_REVIEW_SELECTION}</Button>
                      <Button value={REVIEWS_ABOUT_ME_SELECTION}>{REVIEWS_ABOUT_ME_SELECTION}</Button>
                    </Group>
                  </div>
                </div>
              </div>
              <div className="reviews__reviewscard--wrapper">
                <div className="row justify-content-center">
                  {reviews.length > 0 && reviews.map(review => {
                    return (
                      <div className="col-10">
                        <ReviewsCard {...review} />
                      </div>
                    )
                  })}
                  {reviews.length === 0 && <div className="reviews__alert--container">
                    <Alert message={NO_REVIEWS} type="error" />
                  </div>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Reviews;