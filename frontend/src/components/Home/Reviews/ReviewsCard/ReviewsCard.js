import React, { Component } from 'react';
import './ReviewsCard.css';
import { Rate, Tooltip } from 'antd';

const moment = require('moment');

class ReviewsCard extends Component {
  render() {
    console.log("Got props in ReviewsCard", this.props);
    const { content, date, name, num_stars: rating } = this.props;

    return (
      <div className="reviewscard__container">
        <div className="reviewscard__name">{name}</div>
        <div className="reviewscard__date">{moment(date).format('MMMM Do, YYYY')}</div>
        <div className="reviewscard__rating">
          <Tooltip title={rating}>
            <span><Rate disabled value={rating}/></span>
          </Tooltip>
        </div>
        <div className="reviewscard__content">{content}</div>
      </div>
    )
  }
}

export default ReviewsCard;