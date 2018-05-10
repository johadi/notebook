import actionTypes from '../actionTypes';

const initialState = {
  notes: [],
  saveNoteValidationError: null,
  savedNote: null,
  saveNoteFailure: null,
  updateNoteValidationError: null,
  updatedNote: null,
  canScrollTopAfterNoteUpdate: false,
  updateNoteFailure: null
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload
      };
    case actionTypes.SAVE_NOTE_VALIDATION_ERROR:
      return {
        ...state,
        saveNoteValidationError: action.payload
      };
    case actionTypes.SAVE_NOTE_SUCCESS:
      return {
        ...state,
        savedNote: action.payload,
        saveNoteValidationError: null
      };
    case actionTypes.SAVE_NOTE_FAILURE:
      return {
        ...state,
        saveNoteValidationError: null,
        saveNoteFailure: action.payload
      };
    case actionTypes.CLEAR_SAVE_NOTE_ERRORS:
      return {
        ...state,
        saveNoteValidationError: null,
        saveNoteFailure: null
      };
    case actionTypes.CLEAR_SAVED_NOTE:
      return {
        ...state,
        savedNote: null,
        saveNoteValidationError: null,
        saveNoteFailure: null
      };
    case actionTypes.UPDATE_NOTE_VALIDATION_ERROR:
      return {
        ...state,
        updateNoteValidationError: action.payload
      };
    case actionTypes.UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        updatedNote: action.payload.updatedNote,
        canScrollTopAfterNoteUpdate: action.payload.canScrollTop,
        updateNoteValidationError: null
      };
    case actionTypes.UPDATE_NOTE_FAILURE:
      return {
        ...state,
        updateNoteValidationError: null,
        updateNoteFailure: action.payload
      };
    case actionTypes.CLEAR_UPDATE_NOTE_ERRORS:
      return {
        ...state,
        updateNoteValidationError: null,
        updateNoteFailure: null
      };
    case actionTypes.CLEAR_UPDATED_NOTE:
      return {
        ...state,
        canScrollTopAfterNoteUpdate: false,
        updatedNote: null,
        updateNoteValidationError: null,
        updateNoteFailure: null
      };
    default:
      return state;

  }
}
