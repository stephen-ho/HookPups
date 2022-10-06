import React from 'react';
import { Pressable, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomButtonSmall = ({ onPress, text, type = 'PRIMARY', bgColor }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {}
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomButtonSmall;

const styles = StyleSheet.create({
  container: {
    width: '45%',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
  },
  container_PRIMARY: {
    backgroundColor: '#FFAFCC'
  },
  container_EMPTY: {
    width: '45%',
  },
  text: {
    fontWeight: 'bold',
    color: '#716F81'
  }
})