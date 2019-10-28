import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { tokenRefresh } from './redux/action';
import './App.css';

import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import SignupRoot from './components/SignupRoot/SignupRoot';
import Home from './components/Home/Home';
import ForgotPassword from './components/PasswordReset/ForgotPassword';

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  console.log(isAuthenticated);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated.id ? (
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
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignupRoot} />
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
