import axios from 'axios';
import {AsyncStorage} from 'react-native';
import actionTypes from '../actionTypes';
import environment, { setAuthorizationHeader } from '../environment';

const { apiUrl } = environment;

/**
 * Action creator that handles registration
 * @param userDetails
 * @return {Function}
 */
export const register = userDetails => dispatch => {
  dispatch({ type: actionTypes.REGISTRATION_LOADING });

  axios.post(`${apiUrl}/register`, userDetails)
    .then( async (response) => {
      if (response.status !== 201) {
        return dispatchAction(actionTypes.REGISTRATION_FAILURE, 'Server error, try again', dispatch);
      }

      try {
        await AsyncStorage.setItem('token', response.data.access_token);
        dispatchAction(actionTypes.REGISTRATION_SUCCESS, null, dispatch);
      } catch(e) {
        dispatchAction(actionTypes.REGISTRATION_FAILURE, 'Error occurred, try again', dispatch);
      }
    })
    .catch(err => {
      if(err.response.status === 409) {
        return dispatchAction(actionTypes.REGISTRATION_FAILURE, err.response.data, dispatch);
      }

      dispatchAction(actionTypes.REGISTRATION_VALIDATION_ERROR, err.response.data, dispatch);
    });
};

/**
 * Action creator that clears all registration errors
 * @return {Function}
 */
export const clearRegistrationErrors = () => dispatch => {
  dispatchAction(actionTypes.REGISTRATION_CLEAR_ERRORS, null, dispatch);
};

/**
 * Action creator that handles login
 * @param userCredentials
 * @return {Function}
 */
export const login = userCredentials => dispatch => {
  dispatch({ type: actionTypes.LOGIN_LOADING });

  axios.post(`${apiUrl}/login`, userCredentials)
    .then( async (response) => {
      if (response.status !== 200) {
        return dispatchAction(actionTypes.LOGIN_FAILURE, 'Server error, try again', dispatch);
      }

      try {
        await AsyncStorage.setItem('token', response.data.access_token);
        dispatchAction(actionTypes.LOGIN_SUCCESS, null, dispatch);
      } catch(e) {
        dispatchAction(actionTypes.LOGIN_FAILURE, 'Error occurred, try again', dispatch);
      }
    })
    .catch(err => {
      if(err && err.response.status === 404) {
        return dispatchAction(actionTypes.LOGIN_FAILURE, err.response.data, dispatch);
      }

      dispatchAction(actionTypes.LOGIN_VALIDATION_ERROR, err.response.data, dispatch);
    });
};

/**
 * Action creator that clears all login errors
 * @return {Function}
 */
export const clearLoginErrors = () => dispatch => {
  dispatchAction(actionTypes.LOGIN_CLEAR_ERRORS, null, dispatch);
};

/**
 * Action creators that handles logout
 * @return {Function}
 */
export const logout = () => async (dispatch) => {
  axios.get(`${apiUrl}/logout`)
    .then(async (response) => {
      if (response.status === 200) {
        await AsyncStorage.removeItem('token');
        dispatchAction(actionTypes.LOGOUT_SUCCESS, null, dispatch);
      }
    });
};

/**
 * Action creators that authenticates user
 * @return {Function}
 */
export const authenticate = () => async (dispatch) => {
  await setAuthorizationHeader();

  axios.get(`${apiUrl}/user`)
    .then(response => {
      if(response.status === 200 && response.data) {
        return dispatchAction(actionTypes.AUTHENTICATE_SUCCESS, response.data, dispatch);
      }

      return Promise.reject();
    })
    .catch(() => dispatchAction(actionTypes.AUTHENTICATE_FAILURE, null, dispatch));
};

/**
 * Helper function that dispatches action
 * @param actionType
 * @param payload
 * @param dispatch
 */
const dispatchAction = (actionType, payload, dispatch) => {
  dispatch({
    payload,
    type: actionType
  })
};
