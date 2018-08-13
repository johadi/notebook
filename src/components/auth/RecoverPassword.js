import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from '../../common/index';

export class RecoverPassword extends Component {
  handlePress = () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Notebook</Text>
        <Input placeholder={'Type Email used during registration'}/>
        <Button>Recover Password</Button>
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
    color: '#092035',
  },
});
