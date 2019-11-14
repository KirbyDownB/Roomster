import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { tokenRefresh } from './redux/action';
import './App.css';

import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import ForgotPassword from './components/PasswordReset/ForgotPassword';
import Friends from './components/Home/Friends/Friends';

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        true === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

class App extends Component {
  componentDidMount = () => {
    this.props.tokenRefresh();
  };

  render() {
    console.log(this.props.user)
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing}>
              <Redirect to="/login"/>
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/friends" component={Friends} />
            <PrivateRoute
              path="/home"
              component={Home}
              isAuthenticated={this.props.user}
            />
            <Route path="/reset/:token" component={ForgotPassword} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  tokenRefresh: () => dispatch(tokenRefresh()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
