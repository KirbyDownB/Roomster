import React, { Component } from 'react';
import './Feed.css';
import Post from './Post/Post';
import { Button, Icon, Popover, Input, Modal, Select, Form, Upload } from 'antd';
import {
  showSuccessMessage,
  showErrorMessage,
  postTags,
  dummyRequest,
  BASE_URL,
  NEW_POST_SUCCESS,
  NEW_POST_ERROR,
  FEED_ERROR,
  FEED_SEARCH_ERROR
} from '../../../constants';
import { mockPosts, mockLikedEmails, mockDislikedEmails } from '../../../mocks';

const { Option } = Select;
const { Item } = Form;
const { TextArea, Search } = Input;
const { Dragger } = Upload;

class Feed extends Component {
  state = {
    isFilterOpen: false,
    isNewPostModalOpen: false,
    selectedTags: [],
    isNewPostLoading: false,
    images: [],
    posts: [],
    likedIds: [],
    dislikedIds: [],
    isFeedLoading: false,
    isFeedSearchLoading: false
  }

  componentDidMount = () => {
    // this.setState({
    //   posts: mockPosts,
    //   likedEmails: mockLikedEmails,
    //   dislikedEmails: mockDislikedEmails
    // });
    this.setState({ isFeedLoading: true });
    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/api/posting/all/`, {
      headers: {
        "Authorization": token
      },
      method: "POST",
    })
      .then(response => response.json())
      .then(({ postings, likedIds, dislikedIds }) => {
        console.log("Got Feed data in componentDidMount", postings, likedIds, dislikedIds);
        this.setState(prevState => ({
          isFeedLoading: false,
          posts: postings,
          likedIds,
          dislikedIds
        }));
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(FEED_ERROR);
        this.setState({ isFeedLoading: false });
      });
  }

  showFilter = e => {
    e.preventDefault();
    this.setState({ isFilterOpen: true });
  }

  hideFilter = () => this.setState({ isFilterOpen: false });

  handleVisibleChange = isFilterOpen => {
    this.setState({ isFilterOpen });
  }

  handleNewPostClick = e => {
    e.preventDefault();
    this.setState({ isNewPostModalOpen: true });
  }

  closeNewPostModal = () => this.setState({ isNewPostModalOpen: false });

  handleNewPostSubmit = e => {
    e.preventDefault();
    this.setState({ isNewPostLoading: true });

    const content = e.target.content.value;
    const tags = this.state.selectedTags;
    const images = this.state.images;

    const formData = new FormData();
    formData.append("content", content);
    formData.append("tags", tags);
    images.forEach(image => formData.append("images", image));

    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/api/posting/add/`, {
      headers: {
        "Authorization": token
      },
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log("Got response after submitting post", data);
        this.setState({
          isNewPostLoading: false,
          isNewPostModalOpen: false,
          images: [],
          selectedTags: []
        });
        showSuccessMessage(NEW_POST_SUCCESS);
      })
      .catch(error => {
        console.error(error);
        this.setState({
          isNewPostLoading: false,
          isNewPostModalOpen: false
        });
        showErrorMessage(NEW_POST_ERROR);
      })
  }

  handleTagSelect = selectedTags => this.setState({ selectedTags });

  handlePostImageUpload = info => {
    const { file: { status, name }, fileList } = info;
    const images = fileList.map(({ originFileObj }) => originFileObj);

    if (status === 'done') {
      showSuccessMessage(`${name} has successfully been uploaded!`);
      this.setState({ images });
    } else if (status === 'error') {
      showErrorMessage(`${name} couldn't be uploaded.`);
    }
  }

  handleFeedSearch = query => {
    this.setState({ isFeedSearchLoading: true });

    fetch(`${BASE_URL}/api/search/content_and_tags/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        content_and_tags_data: query
      })
    })
      .then(response => response.json())
      .then(({ results }) => {
        console.log("Response after SEARCHING FEED", results);
        this.setState({
          isFeedSearchLoading: false,
          posts: []
        });
        console.log(results);
        this.setState(prevState => ({ posts: [...results] }));
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(FEED_SEARCH_ERROR);
        this.setState({ isFeedSearchLoading: false });
      })
  }

  addLikedId = postId => {
    this.setState(prevState => ({ likedIds: [...prevState.likedIds, postId] }))
  }

  addDislikedId = postId => {
    this.setState(prevState => ({ dislikedIds: [...prevState.dislikedIds, postId] }))
  }

  render() {
    return (
      <div className="feed__container">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-2">
              <h2 className="feed__title">Feed</h2>
            </div>
            <div className="col-10">
              <Search onSearch={this.handleFeedSearch} loading enterButton />
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <Popover
                content={<a onClick={this.hideFilter}>Close</a>}
                trigger="click"
                visible={this.state.isFilterOpen}
                placement="bottom"
                onVisibleChange={this.handleVisibleChange}
              >
                <Button
                  type="default"
                  className="feed__filter--button"
                  onClick={this.showFilter}
                >
                  <Icon type="control" />
                  Filter
                </Button>
              </Popover>
            </div>
            <div className="col-2">
              <Button
                type="primary"
                className="feed__newPost--button"
                onClick={this.handleNewPostClick}
              >
                <Icon type="plus-circle" theme="filled"/>
                New Post
              </Button>
            </div>
          </div>
          <div className="row">
            {this.state.posts.length > 0 && this.state.posts.map(post => {
              console.log("Mapping post", post);

              const hasLiked = this.state.likedIds.includes(post.posting_id);
              const hasDisliked = this.state.dislikedIds.includes(post.posting_id);

              return (
                <div className="col-6">
                  <Post
                    likes={post.likedEmails.length}
                    dislikes={post.dislikedEmails.length}
                    {...post}
                    likedIds={this.state.likedIds}
                    dislikedIds={this.state.dislikedIds}
                    hasLiked={hasLiked}
                    hasDisliked={hasDisliked}
                    addLikedId={this.addLikedId}
                    addDislikedId={this.addDislikedId}
                  />
                </div>
              )
            })}
          </div>
          <Modal
            visible={this.state.isNewPostModalOpen}
            onOk={this.handleOk}
            onCancel={this.closeNewPostModal}
            footer={null}
            centered
          >
            <Form onSubmit={this.handleNewPostSubmit}>
              <div className="newPost__title">New Post</div>
              <Item>
                <div className="newPost__caption">Tags</div>
                <Select
                  mode="tags"
                  style={{ width: '100%' }}
                  placeholder="Tags Mode"
                  onChange={this.handleTagSelect}
                >
                  {postTags.map(postTag => <Option key={postTag}>{postTag}</Option>)}
                </Select>
              </Item>
              <Item>
                <div className="newPost__caption">Post</div>
                <TextArea
                  rows={4}
                  name="content"
                  placeholder="Type your post here..."
                  autoSize={{ maxRows: 5 }}
                />
              </Item>
              <Item>
                <div className="newPost__caption">Upload Images</div>
                <Dragger
                  name="file"
                  onChange={this.handlePostImageUpload}
                  customRequest={dummyRequest}
                  listType="picture"
                  accept=".jpg, .JPG, .png, .PNG"
                >
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="newPost__upload--description">
                    Drag and drop a maximum of 5 images.
                  </p>
                </Dragger>
              </Item>
              <Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="newPost__submit"
                  loading={this.state.isNewPostLoading}
                >
                  SUBMIT
                </Button>
              </Item>
            </Form>
          </Modal>
        </div>
      </div>
    )
  }
}

export default Feed;