import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { updateNote, clearUpdateNoteErrors, clearUpdatedNote } from '../../actions';
import { CheckIcon, CreateNote } from '../../common'
import { Alert } from "react-native";

class EditNoteContainer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    noteState: PropTypes.object.isRequired,
    clearUpdateNoteErrors: PropTypes.func.isRequired,
    clearUpdatedNote: PropTypes.func.isRequired,
    updateNote: PropTypes.func.isRequired,
  };

  state = {
    note: {
      title: '',
      body: '',
      category: 'Uncategorised'
    },
    noteId: null
  };


  static navigationOptions = ({navigation}) => {
    const { handleEditNote } = navigation.state.params || {};

    return {
      title: 'Editing',
      headerRight: <CheckIcon onPress={handleEditNote}/>
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ handleEditNote: this.handleEditNote });

    const { params } = this.props.navigation.state;
    const { note: {id, category, title, body} } = params ? params : {};
    const note = { category, title, body };

    this.setState({ note, noteId: id });
  }

  componentDidUpdate() {
    const { updateNoteValidationError, updateNoteFailure, updatedNote } = this.props.noteState;

    if (updateNoteValidationError) {
      Alert.alert(
        'Note update failed',
        'Your note must have a title and a body',
        [
          { text: 'OK', onPress: this.props.clearUpdateNoteErrors }
        ]
      );

      return;
    }

    if (updateNoteFailure) {
      Alert.alert(
        'Note Update failed',
        updateNoteFailure,
        [
          { text: 'OK', onPress: this.props.clearUpdateNoteErrors }
        ]
      );

      return;
    }

    if(updatedNote) {
      this.props.navigation.state.params.resetViewNoteScreenParam(updatedNote);
      this.props.navigation.goBack();
    }
  }

  componentWillUnmount() {
    this.props.clearUpdatedNote();
    this.props.clearUpdateNoteErrors();
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
   * Triggers the action that handles the update note
   */
  handleEditNote = () => {
    const { note, noteId } = this.state;
    this.props.updateNote(note, noteId);
  };

  render() {
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
  return bindActionCreators({ updateNote, clearUpdateNoteErrors, clearUpdatedNote }, dispatch);
};
export const EditNote = connect(mapStateToProps, mapDispatchToProps)(EditNoteContainer);
