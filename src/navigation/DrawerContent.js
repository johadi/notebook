import React, { Component } from 'react';
import {StyleSheet, ScrollView, View, Image, Text} from "react-native";
import { DrawerItems, SafeAreaView } from 'react-navigation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class DrawerContentContainer extends Component {
  render() {
    const { avatar_path, username, email } = this.props.userDetail || {};

    return this.props.renderDrawerStatus && (
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={styles.drawerHeader}>
            <Image style={styles.headerImage} source={avatar_path ?
              {uri: avatar_path} : require('../../assets/images/jimoh.jpg')}/>
            <View style={styles.headerUserDetailWrapper}>
              <Text style={styles.headerUserDetailText}>{username}</Text>
              <Text style={styles.headerUserDetailText}>{email}</Text>
            </View>
          </View>
          <DrawerItems {...this.props} />
        </SafeAreaView>
      </ScrollView>
    )
  }
}

const mapStateToProps = ({authState, userState}) => {
  return {
    userDetail: authState.userDetail,
    renderDrawerStatus: userState.renderDrawerStatus
  }
};

export const DrawerContent = connect(mapStateToProps)(DrawerContentContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginVertical: 10,
  },
  headerUserDetailWrapper: {
    alignItems: 'center'
  },
  headerUserDetailText: {
    color: '#ffffff',
    fontWeight: 'bold'
  }
});
