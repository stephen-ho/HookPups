import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Logo = () => {
  return (
    <View>
      <Text style={styles.logo}>
        HookPups
      </Text>
    </View>
  )
}

export default Logo;

const styles = StyleSheet.create({
  logo: {
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  }
})