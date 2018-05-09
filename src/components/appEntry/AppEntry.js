import React, {Component} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {authenticate} from "../../actions";
import {setAuthorizationHeader} from "../../environment";

class AppEntryContainer extends Component {
  static propTypes = {
    authenticate: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    authState: PropTypes.object.isRequired,
  };

  async componentDidMount() {
    this.props.authenticate();
  }

  componentDidUpdate() {
    if (this.props.authState.isAuthenticated) {
      this.props.navigation.navigate('App');
    } else if (!this.props.authState.isAuthLoading) {
      this.props.navigation.navigate('Auth');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={'white'} size={'large'}/>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({authenticate}, dispatch)
};

const mapStateToProps = ({authState}) => {
  return {authState}
};

export const AppEntry = connect(mapStateToProps, mapDispatchToProps)(AppEntryContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9013FE'
  },
  headerText: {
    marginVertical: 50,
    textAlign: 'center',
    fontFamily: 'BradleyHandITCTT-Bold',
    fontSize: 48,
    color: '#fff',
  },
});
