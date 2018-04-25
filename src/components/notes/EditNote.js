import React, { Component } from 'react';
import { CheckIcon, CreateNote } from '../../common'
import { Alert } from "react-native";

export class EditNote extends Component {
  state = {
    selectedValue: 'Uncategorised',
    titleText: '',
    bodyText: ''
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
    const { note: {category, title, body} } = params ? params : {};

    this.setState({
      selectedValue: category,
      titleText: title,
      bodyText: body
    });

  }

  handlePickerValueChange = (itemValue, itemIndex) => {
    this.setState({selectedValue: itemValue})
  };

  handleTextInputChange = (text) => {
    this.setState({text});
  };

  handleEditNote = () => {
    Alert.alert('Edited');
  };

  render(){
    return (
      <CreateNote
        handlePickerValueChange={this.handlePickerValueChange}
        handleTextInputChange = {this.handleTextInputChange}
        titleText={this.state.titleText}
        bodyText={this.state.bodyText}
        pickerSelectedValue={this.state.selectedValue}
      />
    )
  }
}
