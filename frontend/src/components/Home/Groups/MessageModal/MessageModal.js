import React, { Component } from 'react';
import { Input } from 'antd';
import './MessageModal.css';

const { TextArea } = Input;

class MessageModal extends Component {
  state = {
    from: "",
    to: "",
    body: ""
  }

  handleChange = (e) => {
    this.setState({
      body: e.target.value
    })
  }

  componentDidMount () {
    //add fetching here
    this.setState({
      from: "Ericong18@gmail.com",
      to: "KirbyDownB"
    })
  }

  render(){
    console.log(this.state.body)
    return(
      <div>
        <div className="messagemodal__input-container">
          <Input className="messagemodal__input" value={this.state.from} addonBefore="From: "></Input>
          <Input className="messagemodal__input" value={this.state.to} addonBefore="To: "></Input>
        </div>
        <div>
          <TextArea rows={10} onChange={this.handleChange} />
        </div>
      </div>
    )
  }
}

export default MessageModal;
