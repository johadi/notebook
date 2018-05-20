import React, { Component, createRef } from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableHighlight, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from 'moment';
import { MenuIcon } from '../../common';
import { getNotes, updateLoadMoreStatus, getNotesByRefresh } from "../../actions";

class DashboardContainer extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Dashboard',
      headerLeft: <MenuIcon navigation={navigation}/>
    }
  };

  state = {
    refreshing: false
  };

  flatList = createRef();

  componentDidMount() {
    this.props.getNotes();
  }

  navigateToViewNoteScreen = (note) => {
    this.props.navigation.navigate('ViewNote', {
      note, scrollDashboardScreenToTop: this.scrollDashboardScreenToTop
    });
  };

  scrollDashboardScreenToTop = () => {
    this.flatList.current.scrollToIndex({index: 0});
  };

  navigateToAddNoteScreen = () => {
    this.props.navigation.navigate('AddNote')
  };

  formatNoteDate(date) {
    const noteMomentDate = moment(date);

    if(noteMomentDate.isSame(moment(), 'day')) {
      return noteMomentDate.format('LT');
    }

    return noteMomentDate.format('llll')
  }

  handleLoadMore = () => {
    const { isLoadingMoreNotes, perPageNotesAndMetaData, notes } = this.props.noteState;
    const { current_page, next_page_url } = perPageNotesAndMetaData;

    if(next_page_url && !isLoadingMoreNotes) {
      this.props.getNotes(current_page + 1, [...notes]);
    }
  }

  handleRefresh = () => {
    this.props.getNotesByRefresh();
  }

  renderFooter = () => {
    const { isLoadingMoreNotes } = this.props.noteState;
    return isLoadingMoreNotes ? <ActivityIndicator size={'large'}/> : null
  }

  render(){
    const { username, avatar_path } = this.props.authState.userDetail || {};
    const defaultAvatar = require('../../../assets/images/jimoh.jpg');
    const { isRefreshingNotes, notes } = this.props.noteState;

    return (
      <View style={styles.container}>
        <View style={styles.userSection}>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={avatar_path ?
              { uri: avatar_path } : defaultAvatar}/>
            <Text style={styles.userSectionText}>{username}</Text>
          </View>
        </View>

        <FlatList
          ref={this.flatList}
          keyExtractor={(item) => item.id.toString()}
          data={notes}
          onEndReached={() => this.handleLoadMore()}
          onEndReachedThreshold={0}
          refreshing={isRefreshingNotes}
          onRefresh={this.handleRefresh}
          renderItem={({item})=>(
            <TouchableHighlight onPress={() => this.navigateToViewNoteScreen(item)}>
              <View style={styles.notesSection}>
                <View style={styles.singleNoteSection}>
                  <View style={styles.noteHeaderSection}>
                    <Text style={styles.noteHeaderText}>{item.title}</Text>
                    <Image style={styles.indicator} source={require('../../../assets/images/indicator3x.png')} />
                  </View>
                  <Text style={styles.noteText} numberOfLines={1}>{item.body}</Text>
                  <View style={styles.noteFooterSection}>
                    <Text style={styles.footerText}>{item.category}</Text>
                    <Text style={styles.noteTime}>{this.formatNoteDate(item.updated_at)}</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          )}
          ListFooterComponent={this.renderFooter}
        />
        <TouchableOpacity onPress={this.navigateToAddNoteScreen} style={styles.addNoteIcon}>
          <Text style={styles.addNoteIconText}>+</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const mapStateToProps = ({noteState, authState}) => {
  return { noteState, authState }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getNotes, updateLoadMoreStatus, getNotesByRefresh }, dispatch);
};
export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

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
    fontSize: 12
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
