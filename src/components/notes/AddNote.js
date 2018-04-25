import React, { Component } from 'react';
import { CreateNote, CheckIcon } from '../../common';
import {Alert} from "react-native";

export class AddNote extends Component {

  static navigationOptions = ({navigation}) => {
    const { handleAddNote } = navigation.state.params || {};

    return {
      title: 'New note',
      headerRight: <CheckIcon onPress={handleAddNote}/>
    }
  };

  state = {selectedValue: 'Uncategorised', text: ''};

  componentDidMount() {
    this.props.navigation.setParams({ handleAddNote: this.handleAddNote })
  }

  handlePickerValueChange = (itemValue, itemIndex) => {
    this.setState({selectedValue: itemValue})
  };

  handleTextInputChange = (text) => {
    this.setState({text});
  };

  handleAddNote = () => {
    Alert.alert('New Note added');
  };

  render(){
    return (
      <CreateNote
        handlePickerValueChange={this.handlePickerValueChange}
        handleTextInputChange = {this.handleTextInputChange}
        inputText={this.state.text}
        pickerSelectedValue={this.state.selectedValue}
      />
    )
  }
}
