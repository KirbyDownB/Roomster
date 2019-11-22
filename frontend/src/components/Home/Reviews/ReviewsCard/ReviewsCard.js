import React, { Component } from 'react';
import './ReviewsCard.css';

class ReviewsCard extends Component {
  render() {
    console.log("Got props in ReviewsCard", this.props);

    return (
      <div className="reviewscard__container">
        {this.props.content}
      </div>
    )
  }
}

export default ReviewsCard;