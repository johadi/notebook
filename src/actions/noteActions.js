import axios from 'axios';
import moment from 'moment';
import actionTypes from '../actionTypes';
import environment from '../environment';

const { apiUrl } = environment;

/**
 * Action creator for getting notes
 * @return {Function}
 */
export const getNotes = () => dispatch => {
  axios.get(`${apiUrl}/notes`)
    .then(response => {
      dispatchAction(actionTypes.GET_NOTES_SUCCESS, response.data, dispatch);
    })
};

/**
 * Action creator for saving note
 * @param note - the details of the note to save
 * @return {Function}
 */
export const saveNote = note => (dispatch) => {
  axios.post(`${apiUrl}/note/create`, note)
    .then(response => {
      dispatchAction(actionTypes.SAVE_NOTE_SUCCESS, response.data, dispatch);
    })
    .catch(err => {
      if(err.response.status === 400) {
        return dispatchAction(actionTypes.SAVE_NOTE_VALIDATION_ERROR, err.response.data, dispatch);
      }

      dispatchAction(actionTypes.SAVE_NOTE_FAILURE, 'Server error, try again', dispatch);
    })
};

/**
 * Clears any error associated to when a note is being saved
 * @return {Function}
 */
export const clearSaveNoteErrors = () => (dispatch) => {
  dispatchAction(actionTypes.CLEAR_SAVE_NOTE_ERRORS, null, dispatch);
};

/**
 * Removes a currently saved note detail if no longer needed
 * @return {Function}
 */
export const clearSavedNote = () => (dispatch) => {
  dispatchAction(actionTypes.CLEAR_SAVED_NOTE, null, dispatch);
};

/**
 * Action creator for updating a note
 * @param note - the new note detail to update
 * @param id - ID of the note to update
 * @param allOldNotes -  the store value for all notes currently being displayed
 * @return {Function}
 */
export const updateNote = (note, id, allOldNotes) => (dispatch) => {
  axios.patch(`${apiUrl}/note/${id}`, note)
    .then(response => {
      // Since we have the updated note returned to us by this update API call,
      // and we have all the old notes , let's just update the all old notes accordingly
      // instead of making a fresh API calls to get all notes that will still end up giving
      // us old notes with this updated note.
      updateAllOldNotes(response.data, allOldNotes, dispatch);
    })
    .catch(err => {
      const { status } = err.response || {};
      if(status === 400) {
        return dispatchAction(actionTypes.UPDATE_NOTE_VALIDATION_ERROR, err.response.data, dispatch);
      }
      if(status === 404) {
        return dispatchAction(actionTypes.UPDATE_NOTE_FAILURE, err.response.data, dispatch);
      }

      dispatchAction(actionTypes.UPDATE_NOTE_FAILURE, 'Server error, try again', dispatch);
    })
};

const updateAllOldNotes = (updatedNote, allOldNotes, dispatch) => {
  const updatedNoteIndex = allOldNotes.findIndex(oldNote => oldNote.id === updatedNote.id);
  let canScrollTop = false;

  if (moment(updatedNote.updated_at).isAfter(allOldNotes[0].updated_at)) {
    allOldNotes.splice(updatedNoteIndex, 1);
    allOldNotes.unshift(updatedNote); // Take note to the top of the array
    canScrollTop = true;
  } else {
    allOldNotes.splice(updatedNoteIndex, 1, updatedNote); // Remove old note and replace with updated one
  }

  dispatchAction(actionTypes.GET_NOTES_SUCCESS, allOldNotes, dispatch);
  // sends a signal that a note was updated
  dispatchAction(actionTypes.UPDATE_NOTE_SUCCESS, { updatedNote, canScrollTop }, dispatch);
};

/**
 * Clears any error associated to when a note is being updated
 * @return {Function}
 */
export const clearUpdateNoteErrors = () => (dispatch) => {
  dispatchAction(actionTypes.CLEAR_UPDATE_NOTE_ERRORS, null, dispatch);
};

/**
 * Removes a currently updated note detail if no longer needed
 * @return {Function}
 */
export const clearUpdatedNote = () => (dispatch) => {
  dispatchAction(actionTypes.CLEAR_UPDATED_NOTE, null, dispatch);
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
