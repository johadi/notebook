import actionTypes from '../actionTypes';

const initialState = {

};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SUCCESS:
      return {

      };
    case actionTypes.GET_USER_FAILURE:
      return {

      };
    default:
      return state;

  }
}
