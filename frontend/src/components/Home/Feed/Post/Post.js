import React, { Component } from 'react';
import { Carousel, Tag, Icon, Tooltip} from 'antd';
import './Post.css';
import { BASE_URL, showErrorMessage, REACTION_ERROR } from '../../../../constants';

const moment = require('moment');

class Post extends Component {
  state = {
    numLikes: 0,
    numDislikes: 0,
    likedIds: [],
    dislikedIds: []
  }

  componentDidMount = () => {
    this.setState({
      numLikes: this.props.likedEmails.length,
      numDislikes: this.props.dislikedEmails.length,
      likedIds: this.props.likedIds,
      dislikedIds: this.props.dislikedIds
    });
  }

  handlePostLike = (e, postId, likedIds) => {
    e.preventDefault();

    if (likedIds.includes(postId)) {
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
        this.setState({
          numLikes: this.state.numLikes + 1,
          likedIds: [...this.state.likedIds, postId]
        });
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(REACTION_ERROR);
      });
  }

  handlePostDislike = (e, postId, dislikedIds) => {
    e.preventDefault();

    if (dislikedIds.includes(postId)) {
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
        this.setState({
          numDislikes: this.state.numDislikes + 1,
          dislikedIds: [...this.state.dislikedIds, postId]
        });
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(REACTION_ERROR);
      });
  }

  render() {
    const { name, date, content, images, tags, posting_id: postId } = this.props;
    const { numLikes, numDislikes, likedIds, dislikedIds } = this.state;

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
        <div className="post__reactions">
          <Tooltip title="Like">
            <Icon
              className="post__react"
              type="like"
              theme={likedIds.includes(postId) ? "filled" : "outlined"}
              onClick={e => this.handlePostLike(e, postId, likedIds)}
            />
          </Tooltip>
          <span className="post__react--count">{numLikes}</span>
          <Tooltip title="Dislike">
            <Icon
              className="post__react"
              type="dislike"
              theme={dislikedIds.includes(postId) ? "filled" : "outlined"}
              onClick={e => this.handlePostDislike(e, postId, dislikedIds)}
            />
          </Tooltip>
          <span className="post__react--count">{numDislikes}</span>
        </div>
      </div>
    )
  }
}

export default Post;