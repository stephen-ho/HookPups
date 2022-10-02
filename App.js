import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './screens/SignInAndSignUp/SignInScreen.js';
import RegisterScreen from './screens/SignInAndSignUp/RegisterScreen.js';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    // <View style={styles.container}>
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false}} name="SignIn" component={SignInScreen} />
        <Stack.Screen options={{ headerShown: false}} name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDE0FE',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
