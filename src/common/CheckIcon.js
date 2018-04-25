import React from 'react';
import {StyleSheet} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const CheckIcon = ({onPress}) => {
  return (
    <FeatherIcon
      name="check"
      size={22}
      color={'#fff'}
      style={styles.icon}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 15
  }
});
