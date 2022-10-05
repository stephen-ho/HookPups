// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SignInScreen from './screens/SignInAndSignUp/SignInScreen.js';
// import RegisterScreen from './screens/SignInAndSignUp/RegisterScreen.js';

// export default function App() {

//   const Stack = createNativeStackNavigator();

//   return (
//     // <View style={styles.container}>
//     <NavigationContainer >
//       <Stack.Navigator>
//         <Stack.Screen options={{ headerShown: false}} name="SignIn" component={SignInScreen} />
//         <Stack.Screen options={{ headerShown: false}} name="Register" component={RegisterScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//     // </View>

//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#BDE0FE',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });
import EventMain from './events/EventMain.js';
import Requests from './components/Requests/requests.js';
import CardSwipe from './components/Home/cardSwipe.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Entypo, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

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
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Map"
          component={CardSwipe}
          options={{ headerShown: false, tabBarIcon: renderMap, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
        />
        <Tab.Screen
          name="Events"
          component={EventMain}
          options={{ headerShown: false, tabBarIcon: renderEvents, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
        />
        <Tab.Screen
          name="Home"
          component={CardSwipe}
          options={{ headerShown: false, tabBarIcon: renderHome, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
        />
        <Tab.Screen
          name="Matches"
          component={Requests}
          options={{ headerShown: false, tabBarIcon: renderMatches, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
        />
        <Tab.Screen
          name="Profile"
          component={CardSwipe}
          options={{ headerShown: false, tabBarIcon: renderProfile, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

