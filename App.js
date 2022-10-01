import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignInScreen from './screens/SignIn/SignInScreen.js'
import InitialScreen from './screens/InitialScreen'

export default function App() {
  return (
    <View style={styles.container}>
      <SignInScreen />
    </View>
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
