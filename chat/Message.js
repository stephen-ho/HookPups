import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

export default function Message ({ message }) {

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'left',
  },
})