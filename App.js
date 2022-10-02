import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignInScreen from './screens/SignInAndSignUp/SignInScreen.js';
import RegisterScreen from './screens/SignInAndSignUp/RegisterScreen.js';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <SignInScreen /> */}
      <RegisterScreen />
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
