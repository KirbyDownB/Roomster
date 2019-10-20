import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { tokenRefresh } from './redux/action';
import './App.css';

import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Reset from './components/PasswordReset/Reset'

function App() {
  tokenRefresh()

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
          <Route path="/reset/:token" component={Reset}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  tokenRefresh: () => dispatch(tokenRefresh())
})

export default connect(mapDispatchToProps)(App);
