import React, {Component, createRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, KeyboardAvoidingView} from 'react-native';
import PropTypes from 'prop-types';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ToolTip from 'react-native-tooltip';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Input, Button} from '../../common';
import {clearLoginErrors, login, authenticate} from '../../actions';
import {setAuthorizationHeader} from '../../environment';

class LoginContainer extends Component {
  state = {
    userCredentials: {
      email: '',
      password: ''
    },
    loginStatus: null
  };

  static propTypes = {
    authState: PropTypes.object,
    navigation: PropTypes.object,
    clearLoginErrors: PropTypes.func,
    login: PropTypes.func,
    authenticate: PropTypes.func
  };

  tooltips = {
    email: createRef(),
    password: createRef()
  };

  async componentDidUpdate() {
    const {isAuthenticated, userDetail} = this.props.authState;

    if (isAuthenticated && await setAuthorizationHeader() && userDetail) {
      this.props.navigation.navigate('App');
      return;
    }

    if (isAuthenticated && await setAuthorizationHeader()) {
      this.props.authenticate();
    }
  }

  componentWillUnmount() {
    this.props.clearLoginErrors();
  }

  handleLogin = () => {
    this.props.login(this.state.userCredentials);
  };

  /**
   * Handles change of text input
   * @param inputName - the input field name
   * @param inputValue - the input field value
   */
  handleChangeText = (inputName, inputValue) => {
    const userCredentials = this.state.userCredentials;
    userCredentials[inputName] = inputValue;
    this.setState({userCredentials});
  };

  /**
   * Shows the loader that indicates registration is in process
   */
  showLoader() {
    return (
      <ActivityIndicator color={'white'}/>
    );
  }

  /**
   * Shows login failure messages such as "user not found"
   * @param failureMessage
   */
  showLoginFailureMessage(failureMessage) {
    failureMessage && Alert.alert(
      'Login Failed',
      failureMessage,
      [{text: 'OK', onPress: () => this.props.clearLoginErrors()}]
    );
  }

  /**
   * Shows validation error messages like "email field is required"
   * @param errorMessage - the validation error messages
   * @return {null|jsx}
   */
  showValidationErrorMessage = (errorMessage) => {
    return errorMessage && Platform.OS === 'android' ?
      (<Text style={styles.validationErrorText}>{errorMessage}</Text>) : null;
  };

  /**
   * Shows the error icon tooltip text
   * @param iconCategoryName
   */
  showErrorIconTooltipText(iconCategoryName) {
    this.tooltips[iconCategoryName].current.showMenu();
  }

  /**
   * Shows the validation error icon
   * @param iconStyle - the style of the error icon as supplied our callback
   * @param errorMessage - the tooltip error message
   * @param iconCategoryName - the category name of the icon
   * @return {jsx}
   */
  showErrorIcon(iconStyle, errorMessage, iconCategoryName) {
    return Platform.OS === 'ios' ? (
      <TouchableOpacity onPress={() => this.showErrorIconTooltipText(iconCategoryName)}>
        <ToolTip
          ref={this.tooltips[iconCategoryName]}
          actions={[
            {text: errorMessage}
          ]}
        >
          <FontAwesomeIcon style={iconStyle} color={'red'} size={20} name={'exclamation-circle'}/>
        </ToolTip>
      </TouchableOpacity>
    ) :
      <FontAwesomeIcon style={iconStyle} color={'red'} size={20} name={'exclamation-circle'}/>
  }

  /**
   * Navigates user to a specific route
   * @param routeName
   */
  handleNavigation = (routeName) => {
    this.props.navigation.navigate(routeName);
  };

  render() {
    const {
      loginIsLoading,
      loginValidationErrors,
      loginFailure
    } = this.props.authState;

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Notebook</Text>
        <View style={styles.formWrapper}>
          {this.showLoginFailureMessage(loginFailure)}
          <Input
            placeholder={'Email'}
            icon={loginValidationErrors['email'] ?
              iconStyle => this.showErrorIcon(iconStyle,
                loginValidationErrors['email'][0], 'email') : null}
            onChangeText={value => this.handleChangeText('email', value)}
          />
          {this.showValidationErrorMessage(loginValidationErrors['email'])}
          <Input
            placeholder={'Password'}
            secureTextEntry={true}
            icon={loginValidationErrors['password'] ?
              iconStyle => this.showErrorIcon(iconStyle,
                loginValidationErrors['password'][0], 'password') : null}
            onChangeText={value => this.handleChangeText('password', value)}
          />
          {this.showValidationErrorMessage(loginValidationErrors['password'])}
          <Button onPress={this.handleLogin}>{loginIsLoading ?
            this.showLoader() : <Text style={styles.buttonText}>Login</Text>}
          </Button>
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
      </View>
    );
  }
}

const mapStateToProps = ({authState}) => {
  return {authState}
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({clearLoginErrors, login, authenticate}, dispatch);
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
    color: '#092035',
  },
  forgotPasswordWrapper: {
    marginHorizontal: 15,
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between'
  },
  forgotPasswordText: {
    color: '#092035',
    fontWeight: 'bold',
    fontSize: 14
  },
  validationErrorText: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5
  },
  buttonText: {
    fontSize: 18,
    paddingVertical: 3,
    color: '#fff'
  },
  formWrapper: {

  }
});
