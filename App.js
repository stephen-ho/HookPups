import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import EventPage from './events/EventPage.js';
import EventMain from './events/EventMain.js';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <EventMain />
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
