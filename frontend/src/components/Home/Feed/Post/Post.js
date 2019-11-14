import React, { Component } from 'react';
import { Carousel, Tag, Icon, Tooltip} from 'antd';
import './Post.css';
import { BASE_URL, showErrorMessage, REACTION_ERROR } from '../../../../constants';

class Post extends Component {
  state = {
    numLikes: 0,
    numDislikes: 0
  }

  componentDidMount = () => {
    this.setState({
      numLikes: this.props.numLikes,
      numDislikes: this.props.numDislikes
    })
  }

  handlePostLike = (e, posterEmail) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/api/postings/dislike/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      method: "POST"
    })
      .then(response => response.json())
      .then(data => {
        console.log("Response after LIKING post", data);
        this.setState({ numLikes: this.state.numLikes + 1 });
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(REACTION_ERROR);
      })
  }

  handlePostDislike = (e, posterEmail) => {
    e.preventDefault();
    
    if (this.state.numDislikes === 0) {
      return;
    }

    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/api/postings/dislike/`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      method: "POST"
    })
      .then(response => response.json())
      .then(data => {
        console.log("Response after DISLIKING post", data);
        this.setState({ numDislikes: this.state.numDislikes - 1 });
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(REACTION_ERROR);
      })
  }

  render() {
    const { name, date, content, images, tags, poster_email: posterEmail } = this.props;
    const { numLikes, numDislikes } = this.state;

    return (
      <div className="post__container">
        <div className="post__name">{name}</div>
        <div className="post__images">
          {
            images.length > 0 &&
            <Carousel className="post__carousel" afterChange={this.onChange} effect="fade">
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
            <Icon className="post__react" type="like" onClick={e => this.handlePostLike(e, posterEmail)} />
          </Tooltip>
          <span className="post__react--count">{numLikes}</span>
          <Tooltip title="Dislike">
            <Icon className="post__react" type="dislike" onClick={e => this.handlePostDislike(e, posterEmail)} />
          </Tooltip>
          <span className="post__react--count">{numDislikes}</span>
        </div>
      </div>
    )
  }
}

export default Post;