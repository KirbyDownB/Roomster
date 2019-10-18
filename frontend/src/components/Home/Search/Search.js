import React, { Component } from 'react';
import './Search.css';
import { Form, Input, Icon } from 'antd';

const { Item } = Form;

class Search extends Component {
  handleSearch = e => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="search__container">
        <div className="row justify-content-center">
          <Form onSubmit={this.handleSearch}>
            <Item>
              <Input
                className="search__input"
                name="searchValue"
                size="large"
                placeholder="Search..."
                prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            </Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Search;