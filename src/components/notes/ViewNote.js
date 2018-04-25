import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export class ViewNote extends Component {

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

  handleDeleteNote = () => {
    Alert.alert(
      'DELETE',
      'The note will be deleted',
      [
        {text: 'Cancel', onPress: () => console.log('NOTE canceled')},
        {text: 'Yes', onPress: () => console.log('Note Deleted')}
      ],
      {cancelable: true, cancelButtonTitle: 'Remove'}
    );
  };

  navigateToEditNote = () => {
    this.props.navigation.navigate(
      'EditNote',
      {
        note: {
          title: 'Traveling',
          body: 'I love traveling across Africa',
          category: 'travel'
        }
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.noteHeader}>
          <Text style={styles.noteLabel}>School - </Text>
          <Text style={styles.noteDate}>15th April, 2018</Text>
        </View>
        <View style={styles.divider}/>
        <View>
          <Text style={styles.noteHeaderText}>Miss You Already</Text>
          <Text>
            What I don’t know is what you know , I really don’t care.
            Many make such mistake of thinking hard that people care a lot where as in reality,
            we don’t. we don’t give a damn. Is all up to you on what you take and dont take.
            What I don’t know is what you know , I really don’t care.
            Many make such mistake of thinking hard that people care a lot where as in reality,
            we don’t. we don’t give a damn. Is all up to you on what you take and dont take.
          </Text>
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
    fontSize: 13,
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
