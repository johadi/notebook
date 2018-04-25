import React from 'react';
import {TextInput} from 'react-native';

const Input = ({style, ...rest}) => {
  return (
    <TextInput autoCorrect={false} style={[styles.input, style]} {...rest}/>
  )
};

const styles = {
  input: {
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 5,
    marginRight: 15,
    marginLeft: 15,
    marginBottom: 6,
    marginTop: 6,
    borderColor: '#d9d9d9',
    borderRadius: 6,
    height: 40,
    paddingLeft: 10
  }
};

export {Input};
