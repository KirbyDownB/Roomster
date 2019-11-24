import React, { Component } from 'react';
import './ReviewForm.css';
import { Rate, Form, Input, Button } from 'antd';
import {
  BASE_URL,
  showErrorMessage,
  REVIEW_SUBMIT_ERROR,
  showSuccessMessage,
  REVIEW_SUBMIT_SUCCESS
} from '../../../../constants';

const { Item } = Form;
const { TextArea } = Input;

class ReviewForm extends Component {
  state = {
    rating: 0,
    isReviewSubmitLoading: false
  }

  handleRatingChange = rating => {
    this.setState({ rating });
  }

  handleReviewSubmit = e => {
    e.preventDefault();
    this.setState({ isReviewSubmitLoading: true });

    const token = localStorage.getItem("token");
    const review = e.target.review.value;
    const { friendEmail } = this.props;
    const { rating } = this.state;

    fetch(`${BASE_URL}/api/reviews/add/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      method: "POST",
      body: JSON.stringify({ content: review, numStars: rating, email: friendEmail })
    })
      .then(response => response.status === 400 ? Promise.reject() : response.json())
      .then(data => {
        console.log("Received response after SUBMITTING REVIEW", data);
        showSuccessMessage(REVIEW_SUBMIT_SUCCESS);
        this.setState({ isReviewSubmitLoading: false });
        this.props.closeReviewForm();
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(REVIEW_SUBMIT_ERROR);
        this.setState({ isReviewSubmitLoading: false });
      });
  }

  render() {
    return (
      <div className="reviewform__container">
        <Form onSubmit={this.handleReviewSubmit}>
          <div className="reviewform__title">Write Review</div>
          <Item>
            <div className="reviewform__caption reviewform__caption--rating">Rating</div>
            <div className="reviewform__rating">
              <Rate
                allowHalf
                defaultValue={0}
                className="reviewform__stars"
                onChange={this.handleRatingChange}
              />
            </div>
          </Item>
          <Item>
            <div className="reviewform__caption">Review</div>
            <TextArea
              rows={4}
              name="review"
              placeholder="Type your review here..."
              autoSize={{ maxRows: 5 }}
            />
          </Item>
          <Item>
            <Button
              type="primary"
              htmlType="submit"
              className="reviewform__submit"
              loading={this.state.isReviewSubmitLoading}
            >
              SUBMIT
            </Button>
          </Item>
        </Form>
      </div>
    )
  }
}

export default ReviewForm;