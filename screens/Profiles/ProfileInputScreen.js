import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DogProfileInputScreen from './DogProfileInputScreen.js';
import OwnerProfileInputScreen from './OwnerProfileInputScreen.js';

function ProfileInputScreen() {

  const Stack = createNativeStackNavigator();

  return (

    // <View style={styles.container}>
    //   <OwnerProfileInputScreen />
    // </View>

  <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OwnerProfile" component={OwnerProfileInputScreen} />
        <Stack.Screen name="DogProfile" component={DogProfileInputScreen} />
      </Stack.Navigator>
  </NavigationContainer>

  );
}

export default ProfileInputScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDE0FE',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});