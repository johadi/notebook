import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { updateUser, resetUpdatedUserState, rerenderAppDrawer } from '../../actions';
import { Input, Button, MenuIcon } from "../../common";
import environment from '../../environment';

class ProfileContainer extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Profile',
      headerLeft: <MenuIcon navigation={navigation}/>
    }
  };

  state = {
    selectedAvatarSource: null,
    selectedFileName: null,
    selectedFileUri: null,
    userDetail: {
      username: this.props.authState.userDetail.username,
      avatarUri: null,
    }
  };

  componentDidUpdate() {
    const {
      updatedUser, updateUserFailure
    } = this.props.userState || {};

    if(updateUserFailure) {
      Alert.alert('Profile Update failed',
        updateUserFailure,
        [{ text: 'OK', onPress: () => this.resetUserState() }]);
    }

    if(updatedUser) {
      Alert.alert('Profile Update',
        'Profile updated successfully', [
        { text: 'OK', onPress: () => this.resetUserState() }
      ]);
    }
  }

  resetUserState = () => {
    this.props.resetUpdatedUserState();
    this.props.rerenderAppDrawer();
  }

  handleUpdate = async () => {
    const { userDetail, selectedFileName, selectedFileUri } = this.state;
    const formData = new FormData();
    formData.append('username', userDetail.username);

    if(selectedFileName) {
      const fileExtension = selectedFileName.split('.').pop().toLowerCase();
      const fileMimeType = `image/${fileExtension}`;
      formData.append('avatar', { uri: selectedFileUri, name: selectedFileName, type: fileMimeType });
    }

    this.props.updateUser(formData);
  };

  showImagePicker = () => {
    // More info on all the options is below in the README...just some common use cases shown here
    const options = {
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'}
      ],
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
        const { uri, fileName } = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          selectedFileName: fileName,
          selectedFileUri: uri,
          selectedAvatarSource: {uri}
        });
      }
    });
  };

  /**
   * Shows the loader that indicates registration is in process
   */
  showLoader() {
    return (
      <ActivityIndicator color={'#fff'}/>
    );
  }

  handleTextChange = (value, key) => {
    const { userDetail } = this.state;
    userDetail[key] = value;
    this.setState({ userDetail });
  }
  render() {
    const { updateUserIsLoading } = this.props.userState || {};
    const { baseUrl } = environment;
    const { avatar_path } = this.props.authState.userDetail;
    const userAvatar = avatar_path ? { uri: `${baseUrl}/${avatar_path}` } : require('../../../assets/images/jimoh.jpg');
    const { userDetail, selectedAvatarSource } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <TouchableOpacity onPress={this.showImagePicker}>
            <Image style={styles.headerText} source={selectedAvatarSource ? selectedAvatarSource : userAvatar}/>
            <Image style={styles.editImageIcon} source={require('../../../assets/images/imageediticon.png')}/>
          </TouchableOpacity>
        </View>
        <Input
          onChangeText={(value) => this.handleTextChange(value, 'username')}
          placeholder={'Username'}
          value={userDetail.username}
        />
        <Button onPress={this.handleUpdate}>{updateUserIsLoading ? this.showLoader() : 'Update Details'}</Button>
      </View>
    )
  }
}

const mapStateToProps = ({userState, authState}) => {
  return { userState, authState }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateUser, resetUpdatedUserState, rerenderAppDrawer }, dispatch);
};
export const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);

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
