import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { deleteNote, resetDeleteNoteStatus } from '../../actions';
import FeatherIcon from 'react-native-vector-icons/Feather';

class ViewNoteContainer extends Component {

  static navigationOptions = ({navigation}) => {
    const { handleDeleteNote } = navigation.state.params || {};

    return {
      title: 'Reading',
      headerRight: <FeatherIcon
        name="trash-2"
        size={20}
        color={'#fff'}
        onPress={handleDeleteNote}
        style={{marginRight: 10}}
      />
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ handleDeleteNote: this.handleDeleteNote })
  }

  componentDidUpdate() {
    const { deleteNoteError, deletedNoteStatus } = this.props.noteState;
    if (deleteNoteError) {
      Alert.alert('Delete Note failed', deleteNoteError);
      this.props.resetDeleteNoteStatus();
      return;
    }

    if(deletedNoteStatus) {
      this.props.resetDeleteNoteStatus();
      this.props.navigation.goBack();
    }

  }

  /**
   * Delete the note shown on this screen
   */
  handleDeleteNote = () => {
    const { noteState, deleteNote, navigation } = this.props;
    Alert.alert(
      'DELETE',
      'The note will be deleted',
      [
        {text: 'Cancel'},
        {text: 'Yes', onPress: () => deleteNote(navigation.state.params.note.id, [...noteState.notes])}
      ],
      {cancelable: true, cancelButtonTitle: 'Remove'}
    );
  };

  /**
   * Resets the note displayed on this screen after it was changed and
   * also scrolls the dashboard Screen to Top
   * @param note - the updated note
   * @param scrollToTopStatus - determines whether dashboard screen
   * should scroll to top after note is updated
   */
  resetViewNoteScreenParam = (note, scrollToTopStatus) => {
    const { setParams, state } = this.props.navigation;
    setParams({ note });

    if(scrollToTopStatus) {
      state.params.scrollDashboardScreenToTop();
    }
  };


  /**
   * Handles the navigation to EditNote screen
   */
  navigateToEditNote = () => {
    const { note } = this.props.navigation.state.params;
    this.props.navigation.navigate(
      'EditNote', { note, resetViewNoteScreenParam: this.resetViewNoteScreenParam }
      );
  };

  render() {
    const { note } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={styles.noteHeader}>
          <Text style={styles.noteLabel}>{note.category} - </Text>
          <Text style={styles.noteDate}>{moment(note.updated_at).format('LLLL')}</Text>
        </View>
        <View style={styles.divider}/>
        <View>
          <Text style={styles.noteHeaderText}>{note.title}</Text>
          <Text>{note.body}</Text>
        </View>
        <TouchableOpacity
          style={styles.editIconSection}
          onPress={this.navigateToEditNote}
        >
          <Image style={styles.editIcon} source={require('../../../assets/images/editicon.png')}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = ({noteState}) => {
  return { noteState }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteNote, resetDeleteNoteStatus }, dispatch);
};
export const ViewNote = connect(mapStateToProps, mapDispatchToProps)(ViewNoteContainer);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  noteHeader: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 6,
  },
  noteHeaderText: {
    textAlign: 'center',
    color: '#9013FE',
    fontSize: 15,
    marginVertical: 8
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#d6d6d6',
  },
  noteLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9013FE'
  },
  noteDate: {
    fontSize: 12,
    color: '#9013FE'
  },
  editIconSection: {
    position: 'absolute',
    backgroundColor: '#9013FE',
    height: 60,
    width: 60,
    borderRadius: 30,
    bottom: 40,
    right: 25,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  editIconText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 36,
    textAlign: 'center'
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  deleteIcon: {
    width: 40,
    height: 40
  }
});
