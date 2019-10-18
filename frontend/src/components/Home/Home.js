import React, { Component } from 'react';
import './Home.css';

import Search from './Search/Search';
import Listings from './Listings/Listings';

class Home extends Component {
  render() {
    return (
      <div className="home__container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">hi</div>
            <div className="col-10 home__main">
              <Search />
              <Listings />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;