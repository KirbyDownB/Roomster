import React, { Component } from 'react';
import './Feed.css';
import Post from './Post/Post';
import Filter from './Filter/Filter';
import { Button, Icon, Popover, Input, Modal, Select, Form, Upload } from 'antd';
import spinner from '../../../assets/tail-spin.svg';
import {
  showSuccessMessage,
  showErrorMessage,
  postTags,
  dummyRequest,
  BASE_URL,
  NEW_POST_SUCCESS,
  NEW_POST_ERROR,
  FEED_ERROR,
  FEED_SEARCH_ERROR,
  FILTER_SUBMIT_ERROR,
  sortOptions,
  ethnicities,
  durations,
  genders,
} from '../../../constants';
import { mockPosts, mockLikedIds, mockDislikedIds, mockLocations, mockPriceRange } from '../../../mocks';

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
    isFeedSearchLoading: false,
    sortBy: sortOptions[0],
    postsToNumReactions: [],
    ethnicities: [],
    locations: [],
    durations: [],
    priceMin: null,
    priceMax: null
  }

  componentDidMount = () => {
    // this.setState({
    //   posts: mockPosts,
    //   likedIds: mockLikedIds,
    //   dislikedIds: mockDislikedIds
    // });
    this.setState({ isFeedSearchLoading: true });
    const token = localStorage.getItem("token");

    fetch(`${BASE_URL}/api/posting/all/`, {
      headers: {
        "Authorization": token
      },
      method: "POST",
    })
      .then(response => response.json())
      .then(({ postings, likedIds, dislikedIds, locations, durations, ethnicities, priceMin, priceMax }) => {
        console.log("Got Feed data in componentDidMount", postings, likedIds, dislikedIds, locations, durations, ethnicities, priceMin, priceMax);
        const postsToNumReactions = postings.map(posting => ({ posting_id: posting.posting_id, likes: posting.likedEmails.length, dislikes: posting.dislikedEmails.length }));
        this.setState(prevState => ({
          isFeedSearchLoading: false,
          posts: postings,
          likedIds,
          dislikedIds,
          postsToNumReactions,
          ethnicities,
          locations,
          durations,
          priceMin,
          priceMax
        }));
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(FEED_ERROR);
        this.setState({ isFeedSearchLoading: false });
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
    const postsToNumReactions = [...this.state.postsToNumReactions];
    const matchedPostIndex = postsToNumReactions.findIndex(item => item.posting_id === postId);
    const updatedPost = postsToNumReactions[matchedPostIndex];
    
    updatedPost.likes += 1;
    postsToNumReactions[matchedPostIndex] = updatedPost;

    this.setState(prevState => ({
      likedIds: [...prevState.likedIds, postId],
      postsToNumReactions
    }));
  }

  addDislikedId = postId => {
    const postsToNumReactions = [...this.state.postsToNumReactions];
    const matchedPostIndex = postsToNumReactions.findIndex(item => item.posting_id === postId);
    const updatedPost = postsToNumReactions[matchedPostIndex];

    updatedPost.dislikes += 1;
    postsToNumReactions[matchedPostIndex] = updatedPost;

    this.setState(prevState => ({
      dislikedIds: [...prevState.dislikedIds, postId],
      postsToNumReactions
    }));
  }

  handleSortByChange = sortBy => {
    const sortedPosts = [...this.state.posts];

    if (sortBy === "Most Recent") {
      sortedPosts.sort((a, b) => a.date < b.date ? -1 : 1);
    } else if (sortBy === "Most Tags") {
      sortedPosts.sort((a, b) => a.tags.length > b.tags.length ? -1 : 1); 
    } else if (sortBy === "Longest") {
      sortedPosts.sort((a, b) => a.content.length > b.content.length ? -1 : 1);
    }

    this.setState({ posts: sortedPosts });
  };

  handleFilterSubmit = options => {
    console.log("Submitting filter with options", options);

    this.setState({ isFeedSearchLoading: true });

    fetch(`${BASE_URL}/api/filter/`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({ ...options })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Received response after submitting FILTER", data);
        this.setState({ isFeedSearchLoading: false });
      })
      .catch(error => {
        console.error(error);
        showErrorMessage(FILTER_SUBMIT_ERROR);
        this.setState({ isFeedSearchLoading: false });
      })
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
              <Search
                onSearch={this.handleFeedSearch}
                placeholder="Search your feed..."
              />
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              {<Popover
                content={
                  <Filter
                    locationOptions={this.state.locations}
                    ethnicityOptions={this.state.ethnicities}
                    genderOptions={genders}
                    durationOptions={durations}
                    priceMin={this.state.priceMin}
                    priceMax={this.state.priceMax}
                    handleFilterSubmit={this.handleFilterSubmit}
                  />
                }
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
              </Popover>}
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
            <div className="col-8">
              <Select
                defaultValue={sortOptions[0]}
                onChange={this.handleSortByChange}
                className="feed__sort"
              >
                {sortOptions.map(sortOption => <Option value={sortOption}>{sortOption}</Option>)}
              </Select>
            </div>
          </div>
          <div className="row">
            {
              this.state.isFeedSearchLoading && 
              <div className="col-12">
                <div className="feed__loading--container">
                  <img src={spinner} alt=""/>
                </div>
              </div>
            }
            {
              !this.state.isFeedSearchLoading && this.state.posts.length > 0 && this.state.posts.map(post => {
                const hasLiked = this.state.likedIds.includes(post.posting_id);
                const hasDisliked = this.state.dislikedIds.includes(post.posting_id);
                
                const matchedPost = this.state.postsToNumReactions.find(item => item.posting_id === post.posting_id);
                const { likes, dislikes } = matchedPost;

                console.log("Mapping post with likes and dislikes", post, likes, dislikes);

                return (
                  <div className="col-6">
                    <Post
                      likes={likes}
                      dislikes={dislikes}
                      likedIds={this.state.likedIds}
                      dislikedIds={this.state.dislikedIds}
                      hasLiked={hasLiked}
                      hasDisliked={hasDisliked}
                      addLikedId={this.addLikedId}
                      addDislikedId={this.addDislikedId}
                      {...post}
                    />
                  </div>
                )
              })
            }
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