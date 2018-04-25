import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import { MenuIcon } from '../../common';

export class Dashboard extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Dashboard',
      headerLeft: <MenuIcon navigation={navigation}/>
    }
  };

  navigateToViewNoteScreen = (note) => {
    this.props.navigation.navigate('ViewNote');
    // const resetAction = NavigationActions.reset({
    //   index: 0,
    //   actions: [NavigationActions.navigate({ routeName: 'ViewNote' })],
    // });
    //
    // this.props.navigation.dispatch(resetAction);
  };

  navigateToAddNoteScreen = () => {
    this.props.navigation.navigate('AddNote')
  };

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.userSection}>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={require('../../../assets/images/jimoh.jpg')}/>
            <Text style={styles.userSectionText}>Johadi</Text>
          </View>
        </View>

        <TouchableHighlight onPress={() => this.navigateToViewNoteScreen('good')}>
          <View style={styles.notesSection}>
            <View style={styles.singleNoteSection}>
              <View style={styles.noteHeaderSection}>
                <Text style={styles.noteHeaderText}>Miss You Already</Text>
                <Image style={styles.indicator} source={require('../../../assets/images/indicator3x.png')} />
              </View>
              <Text style={styles.noteText}>
                I came to suddenly realized how the week went by with every incident that happen that day...
              </Text>
              <View style={styles.noteFooterSection}>
                <Text style={styles.footerText}>school</Text>
                <Text style={styles.noteTime}>9:15 AM</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>

        <View style={styles.notesSection}>
          <View style={styles.singleNoteSection}>
            <View style={styles.noteHeaderSection}>
              <Text style={styles.noteHeaderText}>Miss You Already</Text>
              <Image style={styles.indicator} source={require('../../../assets/images/indicator3x.png')} />
            </View>
            <Text style={styles.noteText}>
              I came to suddenly realized how the week went by with every incident that happen that day...
            </Text>
            <View style={styles.noteFooterSection}>
              <Text style={styles.footerText}>school</Text>
              <Text style={styles.noteTime}>9:15 AM</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={this.navigateToAddNoteScreen} style={styles.addNoteIcon}>
          <Text style={styles.addNoteIconText}>+</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6e6e6'
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#9013FE'
  },
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#c1c1c1',
    backgroundColor: '#ffffff',
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginBottom: 15,
  },
  imageWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userSectionText: {
    marginHorizontal: 8,
    color: '#9013FE',
    fontSize: 14,
    fontWeight: 'bold'
  },
  notesSection: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#C8C7CC'
  },
  noteHeaderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  noteHeaderText: {
    fontSize: 15,
    color: '#9013FE'
  },
  noteText: {
    color: '#8F8E94',
    fontSize: 15,
    marginVertical: 7
  },
  singleNoteSection: {
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  indicator: {
    width: 8,
    height: 13,
  },
  noteFooterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 15
  },
  noteTime: {
    color: '#9013FE',
  },
  footerText: {
    color: '#9013FE',
    fontSize: 12,
    fontWeight: 'bold'
  },
  addNoteIcon: {
    position: 'absolute',
    backgroundColor: '#9013FE',
    height: 60,
    width: 60,
    borderRadius: 30,
    bottom: 40,
    right: 25,
    zIndex: 1,
    justifyContent: 'center'
  },
  addNoteIconText: {
    color: '#ffffff',
    fontSize: 36,
    textAlign: 'center',
  }
});
