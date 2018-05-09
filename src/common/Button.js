import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export const Button = ({children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#9013FE',
    marginHorizontal: 15,
    marginTop: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#9013FE',
  },
  text: {
    fontSize: 18,
    paddingVertical: 3,
    color: '#fff'
  }
});
