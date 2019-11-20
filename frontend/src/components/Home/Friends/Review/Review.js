import React, { Component } from 'react';
import './Review.css';
import { Rate, Form, Input, Button } from 'antd';
import { BASE_URL, showErrorMessage, REVIEW_SUBMIT_ERROR, showSuccessMessage, REVIEW_SUBMIT_SUCCESS } from '../../../../constants';

const { Item } = Form;
const { TextArea } = Input;

class Review extends Component {
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
    const { rating } = this.state;

    fetch(`${BASE_URL}/reviews/submit`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      method: "POST",
      body: JSON.stringify({ review, rating })
    })
      .then(response => response.status === 400 ? Promise.reject() : response.json())
      .then(data => {
        console.log("Received response after SUBMITTING REVIEW", data);
        showSuccessMessage(REVIEW_SUBMIT_SUCCESS);
        this.setState({ isReviewSubmitLoading: false });
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(REVIEW_SUBMIT_ERROR);
        this.setState({ isReviewSubmitLoading: false });
      });
  }

  render() {
    return (
      <div className="review__container">
        <Form onSubmit={this.handleReviewSubmit}>
          <div className="review__title">Write Review</div>
          <Item>
            <div className="review__caption review__caption--rating">Rating</div>
            <div className="review__rating">
              <Rate
                allowHalf
                defaultValue={0}
                className="review__stars"
                onChange={this.handleRatingChange}
              />
            </div>
          </Item>
          <Item>
            <div className="review__caption">Review</div>
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
              className="review__submit"
            >
              SUBMIT
            </Button>
          </Item>
        </Form>
      </div>
    )
  }
}

export default Review;