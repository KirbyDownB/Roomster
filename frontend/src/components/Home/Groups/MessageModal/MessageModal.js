import React, { Component } from 'react';
import { Input } from 'antd';
import './MessageModal.css';

const { TextArea } = Input;

class MessageModal extends Component {
  state = {
    from: "",
    to: ""
  }

  componentDidMount () {
    //add fetching here
    this.setState({
      from: this.props.email,
      to: this.props.name
    })
  }

  render(){
    return(
      <div>
        <div className="messagemodal__input-container">
          <Input className="messagemodal__input" value={this.state.from} addonBefore="From: "></Input>
          <Input className="messagemodal__input" value={this.state.to} addonBefore="To: "></Input>
          <Input className="messagemodal__input" name="subject" onChange={this.props.handleChange} addonBefore="Subject: "></Input>
        </div>
        <div>
          <TextArea rows={10} name="body" onChange={this.props.handleChange} />
        </div>
      </div>
    )
  }
}

export default MessageModal;
