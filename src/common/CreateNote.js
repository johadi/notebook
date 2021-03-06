import React from 'react';
import { TextInput, StyleSheet, Picker, KeyboardAvoidingView, ScrollView, View } from 'react-native';

export const CreateNote = (props) => {
  const {
    handleTitleInputChange,
    handleBodyInputChange,
    pickerSelectedValue,
    handlePickerValueChange,
    titleText,
    bodyText,
  } = props;

  return (
    <KeyboardAvoidingView style={styles.keyboardView} behaviour={'padding'}>
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <TextInput
            onChangeText = {handleTitleInputChange}
            value={titleText}
            style={[styles.input, styles.titleInput]}
            multiline={true}
            autoFocus={true}
            autoCorrect={false}
            underlineColorAndroid = 'transparent'
            placeholder={'Type your note title'}/>
          <TextInput
            onChangeText = {handleBodyInputChange}
            value={bodyText}
            style={styles.input}
            multiline={true}
            autoCorrect={false}
            underlineColorAndroid = 'transparent'
            placeholder={'Type your note body'}/>
        </View>

        <Picker
          style={styles.picker}
          itemStyle={styles.pickerItem}
          selectedValue = {pickerSelectedValue}
          onValueChange={handlePickerValueChange}
        >
          <Picker.Item label={'Uncategorised'} value={'uncategorised'}/>
          <Picker.Item label={'Work'} value={'work'}/>
          <Picker.Item label={'Personal'} value={'personal'}/>
          <Picker.Item label={'Family affair'} value={'family affair'}/>
          <Picker.Item label={'Study'} value={'study'}/>
          <Picker.Item label={'Sport'} value={'sport'}/>
          <Picker.Item label={'Travel'} value={'travel'}/>
        </Picker>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between'
  },
  input: {
    marginTop: 10,
    paddingVertical: 10,
    marginHorizontal: 20
  },
  picker: {
    borderTopWidth: 1,
    backgroundColor: '#fcfcfc',
    borderColor: '#D8D8D8',
  },
  pickerItem: {
    fontSize: 16
  },
  titleInput: {
    borderBottomWidth: 2,
    borderColor: '#D8D8D8'
  }
});
