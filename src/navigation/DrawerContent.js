import React from 'react';
import {StyleSheet, ScrollView, View, Image, Text} from "react-native";
import { DrawerItems, SafeAreaView } from 'react-navigation';

export const DrawerContent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <Image style={styles.headerImage} source={require('../../assets/images/jimoh.jpg')}/>
        <View style={styles.headerUserDetailWrapper}>
          <Text style={styles.headerUserDetailText}>Johadi</Text>
          <Text style={styles.headerUserDetailText}>jimoh.hadi@gmail.com</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

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
