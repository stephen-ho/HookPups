import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({ value, setValue, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  )
}

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5
  },
  input: {

  }
})