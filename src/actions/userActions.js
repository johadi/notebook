import {AsyncStorage} from 'react-native';
import actionTypes from '../actionTypes';

export const getUser = () => async (dispatch) => {
  await AsyncStorage.removeItem('token');
  dispatchAction(actionTypes.LOGOUT_SUCCESS, null, dispatch);
};

const dispatchAction = (actionType, payload, dispatch) => {
  dispatch({
    payload,
    type: actionType
  })
};
