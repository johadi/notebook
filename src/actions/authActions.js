import actionTypes from '../actionTypes';

export const getUsers = (userDetails) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: userDetails

      });
    }, 3000);
  }
};
