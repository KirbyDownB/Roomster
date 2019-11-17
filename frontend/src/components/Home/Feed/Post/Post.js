import React, { Component } from 'react';
import { Carousel, Tag, Icon, Tooltip} from 'antd';
import './Post.css';
import { BASE_URL, showErrorMessage, REACTION_ERROR } from '../../../../constants';

const moment = require('moment');

class Post extends Component {
  state = {
    likes: this.props.likes,
    dislikes: this.props.dislikes,
  }

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
    const { name, date, content, images, tags, posting_id: postId } = this.props;
    
    console.log("Received props in post", this.props)

    return (  
      <div className="post__container">
        <div className="post__name">{name}</div>
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
              theme={this.props.hasLiked ? "filled" : "outlined"}
              onClick={e => this.handlePostLike(e, postId, this.props.hasLiked)}
            />
          </Tooltip>
          <span className="post__react--count">{this.props.likes}</span>
          <Tooltip title="Dislike">
            <Icon
              className="post__react"
              type="dislike"
              theme={this.props.hasDisliked ? "filled" : "outlined"}
              onClick={e => this.handlePostDislike(e, postId, this.props.hasDisliked)}
            />
          </Tooltip>
          <span className="post__react--count">{this.props.dislikes}</span>
        </div>}
      </div>
    )
  }
}

export default Post;