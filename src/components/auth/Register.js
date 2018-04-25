import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from '../../common/index';

export class Register extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Notebook</Text>
        <Input placeholder={'Username'}/>
        <Input placeholder={'Email'}/>
        <Input placeholder={'Password'}/>
        <Input placeholder={'Confirm Password'}/>
        <Button>Register</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  headerText: {
    marginVertical: 50,
    textAlign: 'center',
    fontFamily: 'BradleyHandITCTT-Bold',
    fontSize: 48,
    color: '#9013FE',
  },
});
