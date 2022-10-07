import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './screens/SignInAndSignUp/SignInScreen.js';
import RegisterScreen from './screens/SignInAndSignUp/RegisterScreen.js';
import MainScreen from './screens/MainScreen.js';
import ProfileScreen from './screens/Profiles/ProfileScreen.js';
import BreedList from './components/Profiles/BreedList.js';
import DogProfileInputScreen from './screens/Profiles/DogProfileInputScreen.js';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const Stack = createNativeStackNavigator();

  return (

    // <View style={styles.container}>
    //   <BreedList />
    // </View>

    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="ProfileInput" component={DogProfileInputScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
