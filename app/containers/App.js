import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';
import {requestLogout, requestCategoriesWithNoEmpty} from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    const {dispatch} = this.props;
    dispatch(requestLogout('/'));
  }

  render() {
    return (
      <div>
        <Header logout={this.logout} />
        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.PropTypes = {
  children: PropTypes.node,
  logout: PropTypes.Func
};

function mapStateToProps(state) {
  const {errorMessage} = state;
  return {
    errorMessage
  };
}

export default connect(mapStateToProps)(App);