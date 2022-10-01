import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Requests from './components/Requests/requests.js';

export default function App() {
  return (
    <View>
      <Requests />
    </View>
  );
}

