import axios from 'axios';
import actionTypes from '../actionTypes';
import environment from '../environment';


const {apiUrl} = environment;

/**
 * Action creator for updating a user
 * @param userDetail - the new user detail to update
 * @return {Function}
 */
export const updateUser = (userDetail) => (dispatch) => {
  dispatchAction(actionTypes.UPDATE_USER_LOADING, null, dispatch);

  axios.post(`${apiUrl}/user/update`, userDetail)
    .then((response) => {
      // Let us update the userDetail currently being displayed on the screen
      dispatchAction(actionTypes.AUTHENTICATE_SUCCESS, response.data, dispatch);
      // Let us stop displaying app drawer as changes has been made to it.
      // This allows the profile component to re-render the app drawer thereby reflecting
      // the newly updated user's details
      stopAppDrawerRender(dispatch);
      // Dispatch action that indicates our update was successful
      dispatchAction(actionTypes.UPDATE_USER_SUCCESS, response.data, dispatch);
    })
    .catch(err => {
      const { data, status } = err.response;

      if(status === 400 || status === 422 || status === 409) {
        return dispatchAction(
          actionTypes.UPDATE_USER_FAILURE,
          data['avatar'] ? data['avatar'].toString() : data,
          dispatch
        );
      }

      dispatchAction(actionTypes.UPDATE_USER_FAILURE, 'Server error. Try again', dispatch);
    })
};

/**
 * Resets the update user state to its default
 * @return {Function}
 */
export const resetUpdatedUserState = () => (dispatch) => {
  dispatchAction(actionTypes.RESET_UPDATE_USER_STATE, null, dispatch);
};

export const stopAppDrawerRender = (dispatch) => {
  dispatchAction(actionTypes.RERENDER_DRAWER, false, dispatch);
}

export const rerenderAppDrawer = () => (dispatch) => {
  dispatchAction(actionTypes.RERENDER_DRAWER, true, dispatch);
}

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
