import actionTypes from '../actionTypes';

const initialState = {name: '', age: null};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        name: action.payload
      };
    case actionTypes.LOGIN_FAILURE:
      return {

      };
    default:
      return state;

  }
}
