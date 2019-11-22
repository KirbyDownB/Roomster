import React, { Component } from 'react';
import { Modal, Button, Icon, Popconfirm } from 'antd';
import ProfileModal from './ProfileModal/ProfileModal';
import ReviewForm from './ReviewForm/ReviewForm';
import './Cards.css';

class Cards extends Component {
  state = {
    isProfileModalVisible: false,
    isReviewModalVisible: false,
  }

  deleteCard = () => {
    this.props.handleDelete(this.props.email)
  }

  handleReviewModal = () => this.setState({ isReviewModalVisible: true });

  handleReviewModalCancel = () => this.setState({ isReviewModalVisible: false });

  handleProfileModal = () => {
    this.setState({
      isProfileModalVisible: true
    })
  }

  handleProfileModalCancel = () => {
    this.setState({
      isProfileModalVisible: false
    })
  }

  render(){
    return(
      <div className="cards__bg">
        <div className="cards__profile-wrapper">
          <img src={this.props.pf_pic} className="cards__profile-pic">
          </img>
          <p className="cards__profile-name" onClick={this.handleProfileModal}>{this.props.name}</p>
        </div>
        <div className="cards__profile-title">
          <p className="cards__profile-inner">{this.props.occupation}</p>
        </div>
        <div className="cards__footer">
          <Button className="cards__button-left" onClick={this.handleReviewModal} icon="form">Review</Button>
          <div style={{border: '0.5px solid #BEBEBE'}}></div>
          <Popconfirm
            title="Are you sure"
            onConfirm={this.deleteCard}
            okText="Yes"
            cancelText="No"
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            className="cards__popconfirm"
          >
            <Button className="cards__button-right" icon="user-delete">Delete</Button>
          </Popconfirm>
        </div>
        <Modal
          visible={this.state.isProfileModalVisible}
          onCancel={this.handleProfileModalCancel}
          footer={null}
          width="45vw"
        >
          <ProfileModal {...this.props} />
        </Modal>
        <Modal
          visible={this.state.isReviewModalVisible}
          onCancel={this.handleReviewModalCancel}
          footer={null}
        >
          <ReviewForm friendEmail={this.props.email} closeReviewForm={this.handleReviewModalCancel} />
        </Modal>
      </div>
    )
  }
}

export default Cards;
