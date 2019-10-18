import React, { Component } from 'react';
import './Listings.css';
import { Button, Icon, Modal } from 'antd';

class Listings extends Component {
  state = {
    isFilterOpen: false
  }

  showFilter = e => {
    e.preventDefault();
    
    this.setState({ isFilterOpen: true });
  }
  
  handleOk = e => {
    console.log(e);
    this.setState({
      isFilterOpen: false,
    });
  };

  render() {
    return (
      <div className="listings__container">
        <div className="row justify-content-center">
          <div className="col-10">
            <h2 className="listings__title">Listings</h2>
          </div>
          <div className="col-2">
            <Button
              type="default"
              className="listings__filter--button"
              onClick={this.showFilter}
            >
              <Icon type="control" />
              Filter
            </Button>
          </div>
        </div>
        <Modal
          centered
          visible={this.state.isFilterOpen}
          onOk={this.handleOk}
        />
      </div>
    )
  }
}

export default Listings;