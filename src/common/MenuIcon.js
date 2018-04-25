import React from 'react';
import {StyleSheet} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const MenuIcon = ({navigation}) => {
  return (
    <FeatherIcon
      name="menu"
      style={styles.icon}
      size={25} color="#fff"
      onPress={() => navigation.navigate('DrawerToggle')} />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 15
  }
});
