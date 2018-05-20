import actionTypes from '../actionTypes';

const initialState = {
  notes: [],
  saveNoteValidationError: null,
  savedNote: null,
  saveNoteFailure: null,
  updateNoteValidationError: null,
  updatedNote: null,
  scrollToTopStatus: false,
  updateNoteFailure: null,
  deletedNoteStatus: false,
  deleteNoteError: null,
  perPageNotesAndMetaData: null,
  isLoadingMoreNotes: false,
  isRefreshingNotes: false,
};

export const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload.data,
        perPageNotesAndMetaData: action.payload.metaData ? action.payload.metaData : state.perPageNotesAndMetaData
      };
    case actionTypes.UPDATE_REFRESH_NOTES_STATUS:
      return {
        ...state,
        isRefreshingNotes: action.payload
      };
    case actionTypes.UPDATE_LOAD_MORE_NOTES_STATUS:
      return {
        ...state,
        isLoadingMoreNotes: action.payload
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
        scrollToTopStatus: action.payload.scrollToTopStatus,
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
        scrollToTopStatus: false,
        updatedNote: null,
        updateNoteValidationError: null,
        updateNoteFailure: null
      };
    case actionTypes.DELETE_NOTE_SUCCESS:
      return {
        ...state,
        deletedNoteStatus: true,
        deleteNoteError: null
      };
    case actionTypes.DELETE_NOTE_FAILURE:
      return {
        ...state,
        deleteNoteError: action.payload
      };
    case actionTypes.RESET_DELETE_NOTE_STATUS:
      return {
        ...state,
        deletedNoteStatus: false,
        deleteNoteError: null,
      };
    default:
      return state;

  }
}
