import React from 'react';
import { Pressable, Text, StyleSheet, TouchableHighlight } from 'react-native';

const CustomButton = ({ onPress, text, type = 'PRIMARY', bgColor }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {}
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  )
}

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center'
  },
  container_PRIMARY: {
    backgroundColor: '#FFAFCC'
  },
  container_EMPTY: {
    width: '100%',
  },
  text: {
    fontWeight: 'bold',
    color: '#716F81'
  }
})