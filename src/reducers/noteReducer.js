import actionTypes from '../actionTypes';

const initialState = {};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NOTE_SUCCESS:
      return {

      };
    case actionTypes.GET_NOTE_FAILURE:
      return {

      };
    default:
      return state;

  }
}
