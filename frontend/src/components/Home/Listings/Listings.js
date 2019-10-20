import React, { Component } from 'react';
import './Listings.css';
import { Button, Icon, Popover } from 'antd';
import Item from './Item/Item';

class Listings extends Component {
  state = {
    isFilterOpen: false
  }

  showFilter = e => {
    e.preventDefault();
    
    this.setState({ isFilterOpen: true });
  }

  hide = () => {
    this.setState({
      isFilterOpen: false
    })
  }

  handleVisibleChange = isFilterOpen => {
    this.setState({ isFilterOpen });
  }

  render() {
    return (
      <div className="listings__container">
        <div className="row justify-content-center">
          <div className="col-10">
            <h2 className="listings__title">Listings</h2>
          </div>
          <div className="col-2">
            <Popover
              content={<a onClick={this.hide}>Close</a>}
              trigger="click"
              visible={this.state.isFilterOpen}
              placement="bottom"
              onVisibleChange={this.handleVisibleChange}
            >
              <Button
                type="default"
                className="listings__filter--button"
                onClick={this.showFilter}
                size="large"
              >
                <Icon type="control" />
                Filter
              </Button>
            </Popover>
          </div>
        </div>
        <div className="listings__items--container">
          <div className="row">
            <Item />
          </div>
        </div>
      </div>
    )
  }
}

export default Listings;