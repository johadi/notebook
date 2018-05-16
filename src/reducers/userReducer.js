import actionTypes from '../actionTypes';

const initialState = {
  updatedUser: null,
  updateUserFailure: null,
  updateUserIsLoading: false,
  renderDrawerStatus: true
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS:
      return {

      };
    case actionTypes.GET_USER_FAILURE:
      return {

      };
    case actionTypes.UPDATE_USER_VALIDATION_ERROR:
      return {
        ...state,
        updateUserIsLoading: false,
      };
    case actionTypes.UPDATE_USER_SUCCESS:
      return {
        ...state,
        updatedUser: action.payload,
        updateUserIsLoading: false,
      };
    case actionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        updateUserIsLoading: false,
        updateUserFailure: action.payload
      };
    case actionTypes.RESET_UPDATE_USER_STATE:
      return {
        ...state,
        updateUserIsLoading: false,
        updatedUser: null,
        updateUserValidationError: null,
        updateUserFailure: null
      };
    case actionTypes.UPDATE_USER_LOADING:
      return {
        ...state,
        updateUserIsLoading: true,
        updatedUser: null,
        updateUserValidationError: null,
        updateUserFailure: null
      };
    case actionTypes.RERENDER_DRAWER:
      return {
        ...state,
        renderDrawerStatus: action.payload
      };
    default:
      return state;

  }
}
