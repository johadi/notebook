import React, { Component } from 'react';
import {Alert} from 'react-native';
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {saveNote, clearSaveNoteErrors, clearSavedNote} from '../../actions';
import { CreateNote, CheckIcon } from '../../common';

class AddNoteContainer extends Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired,
    noteState: PropTypes.object.isRequired,
    clearSaveNoteErrors: PropTypes.func.isRequired,
    clearSavedNote: PropTypes.func.isRequired,
    saveNote: PropTypes.func.isRequired,
  };

  static navigationOptions = ({navigation}) => {
    const { handleAddNote } = navigation.state.params || {};

    return {
      title: 'New note',
      headerRight: <CheckIcon onPress={ handleAddNote }/>
    }
  };

  state = {
    note: {
      title: '',
      body: '',
      category: 'Uncategorised'
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ handleAddNote: this.handleAddNote })
  }

  componentDidUpdate() {
    const { saveNoteValidationError, saveNoteFailure, savedNote } = this.props.noteState;

    if (saveNoteValidationError) {
      Alert.alert(
        'New note failed',
        'Your note must have a title and a body',
        [
          {text: 'OK', onPress: this.props.clearSaveNoteErrors}
        ]
      );

      return;
    }

    if (saveNoteFailure) {
      Alert.alert(
        'New note failed',
        saveNoteFailure,
        [
          {text: 'OK', onPress: this.props.clearSaveNoteErrors}
        ]
      );

      return;
    }

    if(savedNote) {
      this.props.clearSavedNote();
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
      });
      this.props.navigation.dispatch(resetAction);
    }
  }

  componentWillUnmount() {
    this.props.clearSaveNoteErrors();
    this.props.clearSavedNote();
  }

  /**
   * Handles the changes in the select picker. This function sets the note category values
   * @param itemValue - the picker value
   */
  handlePickerValueChange = (itemValue) => {
    const {note} = this.state;
    note['category'] = itemValue;
    this.setState({ note });
  };

  /**
   * Handles the input text changes
   * @param inputName - the name of the input
   * @param inputValue - the value of the input as it changes
   */
  handleTextInputChange = (inputName, inputValue) => {
    const { note } = this.state;
    note[inputName] = inputValue;
    this.setState({note});
  };

  /**
   * Triggers the action that handles the add note
   */
  handleAddNote = () => {
    this.props.saveNote(this.state.note);
  };

  render(){
    const { title, body, category } = this.state.note;
    return (
      <CreateNote
        handlePickerValueChange={this.handlePickerValueChange}
        handleTitleInputChange = {value => this.handleTextInputChange('title', value)}
        handleBodyInputChange = {value => this.handleTextInputChange('body', value)}
        titleText={title}
        bodyText={body}
        pickerSelectedValue={category}
      />
    )
  }
}

const mapStateToProps = ({noteState}) => {
  return { noteState }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ saveNote, clearSaveNoteErrors, clearSavedNote }, dispatch);
};
export const AddNote = connect(mapStateToProps, mapDispatchToProps)(AddNoteContainer);
