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
  mockPosts
} from '../../../constants';

const { Option } = Select;
const { Item } = Form;
const { TextArea } = Input;
const { Dragger } = Upload;

class Feed extends Component {
  state = {
    isFilterOpen: false,
    isNewPostModalOpen: false,
    selectedTags: [],
    isNewPostLoading: false,
    images: [],
    posts: [],
    isFeedLoading: false
  }

  componentDidMount = () => {
    this.setState({ isFeedLoading: true });
    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/api/posting/all/`, {
      headers: {
        "Authorization": token
      },
      method: "POST",
    })
      .then(response => response.json())
      .then(({ postings }) => {
        console.log("Got Feed data in componentDidMount", postings);
        this.setState({
          isFeedLoading: false,
          posts: postings
        });
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

  render() {
    return (
      <div className="feed__container">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-2">
              <h2 className="feed__title">Feed</h2>
            </div>
            <div className="col-10">
              <Input
                prefix={<Icon type="search"/>}
                placeholder="Search for posts"
                className="feed__search-input"
                onPressEnter={this.handleSearch}
              />
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
              return (
                <div className="col-6">
                  <Post {...post} />
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