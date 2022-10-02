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
  }
})