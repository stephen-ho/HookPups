import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Logo from '../../assets/images/hookpupslogo.png';

const InitialScreen = () => {
  const { height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} resizeMode='contain' />
      <Text>HookPups</Text>
    </View>
  )
}

export default InitialScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },

  logo: {
    width: '70%',
    maxWidth: 100,
    maxHeight: 100
    // width: 100,
    // height: 100,
    // top: 100
  }
});