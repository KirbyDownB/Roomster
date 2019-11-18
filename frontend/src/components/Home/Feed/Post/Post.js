import React, { Component } from 'react';
import { Carousel, Tag, Icon, Tooltip, Popover } from 'antd';
import './Post.css';
import { BASE_URL, showErrorMessage, REACTION_ERROR } from '../../../../constants';
import BasicProfile from './BasicProfile/BasicProfile';

const moment = require('moment');

class Post extends Component {
  handlePostLike = (e, postId, hasLiked) => {
    e.preventDefault();

    if (hasLiked) {
      return;
    }

    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/api/like/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      method: "POST",
      body: JSON.stringify({
        posting_id: postId
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Response after LIKING post", data);
        this.props.addLikedId(postId);
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(REACTION_ERROR);
      });
  }

  handlePostDislike = (e, postId, hasDisliked) => {
    e.preventDefault();

    console.log("Got postId", postId);

    if (hasDisliked) {
      return;
    }

    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/api/dislike/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      method: "POST",
      body: JSON.stringify({
        posting_id: postId
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Response after DISLIKING post", data);
        this.props.addDislikedId(postId);
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(REACTION_ERROR);
      });
  }

  render() {
    const {
      name,
      date,
      content,
      images,
      tags,
      hasLiked,
      hasDisliked,
      likes,
      dislikes,
      poster_email,
      posting_id: postId
    } = this.props;
    
    return (  
      <div className="post__container">
        <div className="post__name">
          <Popover
            trigger="click"
            content={<BasicProfile posterEmail={poster_email} />}
          >
            <span className="post__name--hover">{name}</span>
          </Popover>
        </div>
        <div className="post__date">{moment(date).format('MMMM Do, YYYY')}</div>
        <div className="post__images">
          {
            images.length > 0 &&
            <Carousel
              className="post__carousel"
              afterChange={this.onChange}
              effect="fade"
              autoplay
            >
              {images.map(url => <img className="post__image" src={url} alt=""/>)}
            </Carousel>
          }
        </div>
        <div className="post__content">{content}</div>
        <div className="post__tags">
          {tags.length > 0 && tags.map(tag => <Tag color="red">{tag}</Tag> )}
        </div>
        {<div className="post__reactions">
          <Tooltip title="Like">
            <Icon
              className="post__react"
              type="like"
              theme={hasLiked ? "filled" : "outlined"}
              onClick={e => this.handlePostLike(e, postId, hasLiked)}
            />
          </Tooltip>
          <span className="post__react--count">{likes}</span>
          <Tooltip title="Dislike">
            <Icon
              className="post__react"
              type="dislike"
              theme={hasDisliked ? "filled" : "outlined"}
              onClick={e => this.handlePostDislike(e, postId, hasDisliked)}
            />
          </Tooltip>
          <span className="post__react--count">{dislikes}</span>
        </div>}
      </div>
    )
  }
}

export default Post;