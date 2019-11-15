import React, { Component } from 'react';
import { Carousel, Tag, Icon, Tooltip} from 'antd';
import './Post.css';
import { BASE_URL, showErrorMessage, REACTION_ERROR } from '../../../../constants';

class Post extends Component {
  state = {
    numLikes: 0,
    numDislikes: 0,
    likedEmails: [],
    dislikedEmails: []
  }

  componentDidMount = () => {
    this.setState({
      numLikes: this.props.numLikes,
      numDislikes: this.props.numDislikes,
      likedEmails: this.props.likedEmails,
      dislikedEmails: this.props.dislikedEmails
    });
  }

  handlePostLike = (e, posterEmail, likedEmails) => {
    e.preventDefault();

    if (likedEmails.includes(posterEmail)) {
      return;
    }

    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/api/postings/dislike/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      method: "POST",
      body: JSON.stringify({ posterEmail })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Response after LIKING post", data);
        this.setState({
          numLikes: this.state.numLikes + 1,
          likedEmails: [...this.state.likedEmails, posterEmail]
        });
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(REACTION_ERROR);
      });
  }

  handlePostDislike = (e, posterEmail, dislikedEmails) => {
    e.preventDefault();

    if (dislikedEmails.includes(posterEmail) || this.state.numDislikes === 0) {
      return;
    }

    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/api/postings/dislike/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      method: "POST",
      body: JSON.stringify({ posterEmail })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Response after DISLIKING post", data);
        this.setState({
          numDislikes: this.state.numDislikes - 1,
          dislikedEmails: [...this.state.dislikedEmails, posterEmail]
        });
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(REACTION_ERROR);
      });
  }

  render() {
    const { name, date, content, images, tags, poster_email: posterEmail } = this.props;
    const { numLikes, numDislikes, likedEmails, dislikedEmails } = this.state;

    return (
      <div className="post__container">
        <div className="post__name">{name}</div>
        <div className="post__date">{date}</div>
        <div className="post__images">
          {
            images.length > 0 &&
            <Carousel
              className="post__carousel"
              afterChange={this.onChange}
              effect="fade"
              autoplay
            >
              {images.map(image => <img className="post__image" src={image} alt=""/>)}
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
              theme={likedEmails.includes(posterEmail) ? "filled" : "outlined"}
              onClick={e => this.handlePostLike(e, posterEmail, likedEmails)}
            />
          </Tooltip>
          <span className="post__react--count">{numLikes}</span>
          <Tooltip title="Dislike">
            <Icon
              className="post__react"
              type="dislike"
              theme={dislikedEmails.includes(posterEmail) ? "filled" : "outlined"}
              onClick={e => this.handlePostDislike(e, posterEmail, dislikedEmails)}
            />
          </Tooltip>
          <span className="post__react--count">{numDislikes}</span>
        </div>
      </div>
    )
  }
}

export default Post;