import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
<<<<<<< HEAD
// import EventPage from './events/EventPage.js';
import EventMain from './events/EventMain.js';
=======
=======
>>>>>>> 28f8cfe74bf4f03ca323376a8f12b0f479663237
import CardSwipe from './components/Home/cardSwipe.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
<<<<<<< HEAD
>>>>>>> 7a7a1fb47cbc3eac3bfcb05924d13f4bd1726097
=======
>>>>>>> 28f8cfe74bf4f03ca323376a8f12b0f479663237

export default function App() {

  function renderHome () {
    return <Entypo name="home" size={24} color="black" />;
  }

  function renderMap () {
    return <FontAwesome name="map-marker" size={24} color="black" />;
  }

  function renderEvents () {
    return <MaterialIcons name="event-note" size={24} color="black" />;
  }

  function renderMatches () {
    return <MaterialCommunityIcons name="heart-multiple" size={24} color="black" />;
  }

  function renderProfile () {
    return <MaterialIcons name="account-box" size={24} color="black" />;
  }

  return (
<<<<<<< HEAD
<<<<<<< HEAD
    <View style={styles.container}>
      <StatusBar style="auto" />
      <EventMain />
    </View>
=======
=======
>>>>>>> 28f8cfe74bf4f03ca323376a8f12b0f479663237
    // <View style={styles.container}>
    //   <CardSwipe/>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Map"
          component={CardSwipe}
          options={{ headerShown: false, tabBarIcon: renderMap, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
        />
        <Tab.Screen
          name="Events"
          component={CardSwipe}
          options={{ headerShown: false, tabBarIcon: renderEvents, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
        />
        <Tab.Screen
          name="Home"
          component={CardSwipe}
          options={{ headerShown: false, tabBarIcon: renderHome, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
        />
        <Tab.Screen
          name="Matches"
          component={CardSwipe}
          options={{ headerShown: false, tabBarIcon: renderMatches, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
        />
        <Tab.Screen
          name="Profile"
          component={CardSwipe}
          options={{ headerShown: false, tabBarIcon: renderProfile, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
<<<<<<< HEAD
>>>>>>> 7a7a1fb47cbc3eac3bfcb05924d13f4bd1726097
=======
>>>>>>> 28f8cfe74bf4f03ca323376a8f12b0f479663237
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
