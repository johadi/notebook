import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {logout} from '../../actions';

class LogoutContainer extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.logout();
  }

  componentDidUpdate() {
    if (!this.props.authState.isAuthenticated) {
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({logout}, dispatch)
};

const mapStateToProps = ({authState}) => {
  return {authState}
}

export const Logout = connect(mapStateToProps, mapDispatchToProps)(LogoutContainer);
