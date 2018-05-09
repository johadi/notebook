import React from 'react';
import {TextInput, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Input = ({style,icon, ...rest}) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput autoCorrect={false} style={[styles.input, style]} {...rest}/>
      {icon ? icon(styles.iconStyle) : null}
    </View>
  )
};

const styles = {
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    marginRight: 15,
    marginLeft: 15,
    marginVertical: 6,
    borderColor: '#d9d9d9',
    borderRadius: 6,
    height: 40,
  },
  input: {
    flex: 1,
    padding: 5,
    paddingLeft: 10,
  },
  iconStyle: {
    padding: 2,
  }
};

export {Input};
