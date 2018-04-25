import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Input, Button } from '../../common/index';
import {getUsers} from '../../actions';

class LoginContainer extends Component {
  handleNavigation = (routeName) => {
    this.props.navigation.navigate(routeName);
  };

  handleLogin = () => {
    this.props.getUsers('Jamiu');
    // this.props.navigation.navigate('App');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Notebook {this.props.authState.name}</Text>
        <Input placeholder={'Username or Email'}/>
        <Input placeholder={'Password'}/>
        <Button onPress={this.handleLogin}>Login</Button>
        <View style={styles.forgotPasswordWrapper}>
          <Text
            onPress={() => this.handleNavigation('RecoverPassword')}
            style={styles.forgotPasswordText}>
            Forgot Password?
          </Text>
          <Text
            onPress={() => this.handleNavigation('Register')}
            style={styles.forgotPasswordText}>
            Register
          </Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({authState}) => {
  return {
    authState
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (userDetails) => {
      dispatch(getUsers(userDetails))
    }
  }
};
export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerText: {
    marginVertical: 50,
    textAlign: 'center',
    fontFamily: 'BradleyHandITCTT-Bold',
    fontSize: 48,
    color: '#9013FE',
  },
  forgotPasswordWrapper: {
    marginHorizontal: 15,
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between'
  },
  forgotPasswordText: {
    color: '#9013FE',
    fontWeight: 'bold',
    fontSize: 14
  },
});
