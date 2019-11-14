import React, { Component } from 'react';
import { Modal, Button, Icon, Popconfirm } from 'antd';
import ProfileModal from './ProfileModal/ProfileModal';
import './Cards.css';

class Cards extends Component {
  state = {
    visible: false
  }

  deleteCard = () => {
    this.props.handleDelete(this.props.email)
  }

  handleModal = () => {
    this.setState({
      visible: true
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  render(){
    return(
      <div className="cards__bg">
        <div className="cards__profile-wrapper">
          <img src={this.props.img} className="cards__profile-pic">
          </img>
          <p className="cards__profile-name">{this.props.name}</p>
        </div>
        <div className="cards__profile-title">
          <p className="cards__profile-inner">Student</p>
        </div>
        <div className="cards__footer">
          <Button className="cards__button-left" onClick={this.handleModal} icon="user">Profile</Button>
          <Modal
             title={this.props.name}
             visible={this.state.visible}
             onOk={this.handleOk}
             onCancel={this.handleCancel}
             footer={[
                        <Button key="back" onClick={this.handleCancel}>
                          Return
                        </Button>
                      ]}
          >
            <ProfileModal email={this.props.email} />
           </Modal>
          <div style={{border: '0.5px solid #BEBEBE'}}></div>
          <Popconfirm
            title="Are you sure？"
            onConfirm={this.deleteCard}
            okText="Yes"
            cancelText="No"
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
          >
            <Button className="cards__button-right" icon="user-delete">Delete</Button>
          </Popconfirm>
        </div>
      </div>
    )
  }
}

export default Cards;
