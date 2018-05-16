import React, { Component, createRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Platform } from 'react-native';
import PropTypes from 'prop-types';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import ToolTip from 'react-native-tooltip';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {register, clearRegistrationErrors, authenticate} from '../../actions';
import { Input, Button } from '../../common';
import { setAuthorizationHeader } from '../../environment';

export class RegisterContainer extends Component {
  state = {
    userDetails: {
      username: '',
      email: '',
      password: '',
      password_confirmation: ''
    },
    isTyping: null
  };

  static propTypes = {
    authState: PropTypes.object,
    navigation: PropTypes.object,
    clearRegistrationErrors: PropTypes.func,
    register: PropTypes.func,
    authenticate: PropTypes.func,
  };

  tooltips = {
    username: createRef(),
    email: createRef(),
    password: createRef(),
    password_confirmation: createRef()
  };

  async componentDidUpdate() {
    const { isAuthenticated, userDetail } = this.props.authState;

    if (isAuthenticated && await setAuthorizationHeader() && userDetail) {
      this.props.navigation.navigate('App');
      return;
    }

    if (isAuthenticated && await setAuthorizationHeader()) {
      this.props.authenticate();
    }
  }

  componentWillUnmount() {
    this.props.clearRegistrationErrors();
  }

  /**
   * Handles change of text input
   * @param inputName - the input field name
   * @param inputValue - the input field value
   */
  handleChangeText = (inputName, inputValue) => {
    const userDetails = this.state.userDetails;
    userDetails[inputName] = inputValue;
    this.setState({userDetails});
  };

  /**
   * Handles the registration of users to the application
   */
  handleRegistration = () => {
    this.props.register(this.state.userDetails);
  }

  /**
   * Shows the loader that indicates registration is in process
   */
  showLoader() {
    return (
      <ActivityIndicator size={0} color={'#fff'}/>
    );
  }

  /**
   * Shows registration failure messages such as "user already exists"
   * @param failureMessage
   */
  showRegistrationFailureMessage(failureMessage) {
    failureMessage && Alert.alert(
      'Registration Failed',
      failureMessage,
      [{text: 'OK', onPress: () => this.props.clearRegistrationErrors()}]
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
   return (
     <TouchableOpacity onPress = {() => this.showErrorIconTooltipText(iconCategoryName)}>
       <ToolTip
         ref={this.tooltips[iconCategoryName]}
         actions={[
           {text: errorMessage}
         ]}
       >
         <FontAwesomeIcon style={iconStyle} color={'red'} size={20} name={'exclamation-circle'}/>
       </ToolTip>
     </TouchableOpacity>
   )
  }

  /**
   * Renders the component
   * @return {jsx}
   */
  render() {
    const {
      registrationIsLoading,
      registrationValidationErrors,
      registrationFailure
    } = this.props.authState;

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Notebook</Text>
        {this.showRegistrationFailureMessage(registrationFailure)}

        <Input
          autoFocus={true}
          placeholder={'Username'}
          icon={registrationValidationErrors['username'] ?
              iconStyle => this.showErrorIcon(iconStyle,
                registrationValidationErrors['username'][0], 'username') : null}
          onChangeText={value => this.handleChangeText('username', value)}/>
        {this.showValidationErrorMessage(registrationValidationErrors['username'])}

        <Input
          placeholder={'Email'}
          icon={registrationValidationErrors['email'] ?
            iconStyle => this.showErrorIcon(
              iconStyle, registrationValidationErrors['email'][0], 'email') : null}
          onChangeText={value => this.handleChangeText('email', value)}/>
        {this.showValidationErrorMessage(registrationValidationErrors['email'])}

        <Input
          placeholder={'Password'}
          icon={registrationValidationErrors['password'] ?
            iconStyle => this.showErrorIcon(
              iconStyle, registrationValidationErrors['password'][0], 'password') : null}
          onChangeText={value => this.handleChangeText('password', value)}/>
        {this.showValidationErrorMessage(registrationValidationErrors['password'])}

        <Input
          placeholder={'Confirm Password'}
          icon={registrationValidationErrors['password_confirmation'] ?
            iconStyle => this.showErrorIcon(
              iconStyle, registrationValidationErrors['password_confirmation'][0],
              'password_confirmation') : null}
          onChangeText={value => this.handleChangeText('password_confirmation', value)}/>
        {this.showValidationErrorMessage(registrationValidationErrors['password_confirmation'])}

        <Button onPress={this.handleRegistration}>
          {registrationIsLoading ? this.showLoader() : 'Register'}
        </Button>
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
  return bindActionCreators({register, clearRegistrationErrors, authenticate}, dispatch)
};

export const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);

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
  validationError: {
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: 'red'
  },
  validationErrorText: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5
  }
});
