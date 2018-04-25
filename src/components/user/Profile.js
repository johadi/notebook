import React, { Component } from 'react';
import {View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Input, Button, MenuIcon } from "../../common";
import ImagePicker from 'react-native-image-picker';

export class Profile extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Profile',
      headerLeft: <MenuIcon navigation={navigation}/>
    }
  };

  state = {
    avatarSource: require('../../../assets/images/jimoh.jpg')
  };

  handleUpdate = () => {
    this.props.navigation.navigate('App');
  };

  showImagePicker = () => {
    // More info on all the options is below in the README...just some common use cases shown here
    const options = {
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity onPress={this.showImagePicker}>
            <Image style={styles.headerText} source={this.state.avatarSource}/>
            <Image style={styles.editImageIcon} source={require('../../../assets/images/imageediticon.png')}/>
          </TouchableOpacity>
        </View>
        <Input placeholder={'Username'}/>
        <Button onPress={this.handleUpdate}>Update Details</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  imageWrapper: {
    marginVertical: 50,
    borderWidth: 1,
    borderColor: '#9013FE',
    borderRadius: 6,
    height: 180,
    width: 180,
    alignSelf: 'center'
  },
  headerText: {
    height: 178,
    width: 178,
    alignSelf: 'center',
    borderRadius: 6,
  },
  editImageIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 21,
    width: 71
  }
});
