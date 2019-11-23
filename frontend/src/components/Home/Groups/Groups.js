import React, { Component } from 'react';
import GroupCards from './GroupCards/GroupCards';
import Reply from './Reply/Reply';
import { Popover, Icon, Popconfirm, Input } from 'antd';
import './Groups.css';

const { Search } = Input;
const eric = require('../../../assets/eric.jpg')
const aditya = require('../../../assets/aditya.jpg')

class Groups extends Component {

  formatTitles = () => {
    //add fetching of groups here
    return(
      <div className="groupcards__title-format">
        <div className="groupcards__title-container">
          <img src={aditya} className="groupcards__title-image"></img>
          <h4 className="groupcards__title-list">Cheese its</h4>
        </div>
        <div className="groupcards__title-container">
          <img src={aditya} className="groupcards__title-image"></img>
          <h4 className="groupcards__title-list">Crackers</h4>
        </div>
      </div>
    )
  }

  render(){
    return(
      <div className="container-fluid groups__container">
      <div className="row">
        <div className="col">
          <div className="groupcards__header">
            <Popover
              placement="bottomLeft"
              content={this.formatTitles()}
              trigger="click"
            >
              <h2 className="groupcards__header-text">KirbyDownB</h2>
            </Popover>
            <div className="groupcards__icon-container">
              <Popover
                placement="right"
                title="Add Members"
                content={
                  <div>
                  <Search
                     placeholder="input username"
                     onSearch={value => this.handleSearch(value)}
                   />
                  </div>
                }
                trigger="click"
              >
                <Icon className="groupcards__icon-button" type="plus-circle" />
              </Popover>
              <Popconfirm
                placement="right"
                title="Delete this group?"
                icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                trigger="click"
              >
                <Icon className="groupcards__icon-button" type="minus-circle" />
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
        <div className="row">
          <div className="col groups__chat-container">
            <div>
              <div className="groups__chat-box">
                <GroupCards />
                <Reply />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Groups;
