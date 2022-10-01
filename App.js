import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './components/Home/home.js';
import Swipe from './components/Home/swipe.js';
import CardSwipe from './components/Home/cardSwipe.js';

export default function App() {
  return (
    <View style={styles.container}>
      <CardSwipe/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
