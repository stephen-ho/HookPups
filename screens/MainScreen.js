import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventMain from '../events/EventMain.js';
import Requests from '../components/Requests/requests.js';
import CardSwipe from '../components/Home/cardSwipe.js';
import ProfileScreen from '../screens/Profiles/ProfileScreen.js'
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { Entypo, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainScreen = (props) => {
  const route = useRoute();
  const owner_name = route.params.user;
  const [dogInfo, setDogInfo] = useState({});
  const [isLoading, setLoading] = useState(true);

  // async function fetchData () {
  //   const results = await axios.get('http://54.219.129.63:3000/description/unmatched/:user_name/:dog_name')
  //   await setDogs(results.data);
  //   setLoading(false);
  // }

  // useEffect(() => {
  //   setLoading(true);
  //   fetchData();
  // }, [])

  // async function fetchData() {
  //   const results = await axios.get(`http://54.219.129.63:3000/description/${owner_name}`);
  //   await setDogInfo(results.data[0]);
  // }

  useEffect(() => {
    axios.get(`http://54.219.129.63:3000/description/${owner_name}`)
    .then((results) => {
      console.log('=== RESULTS ===', results.data[0]);
      setDogInfo(results.data[0]);
      setLoading(false)
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);

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

if (isLoading === true) {
  return (
    <>
      <Text>Loading</Text>
    </>
  )
}
  return (
    <>
    <Tab.Navigator style={styles.navBar} screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={CardSwipe}
        initialParams={{ user: owner_name, dog: dogInfo }}
        options={{ tabBarIcon: renderHome, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
      />
      <Tab.Screen
        name="Events"
        component={EventMain}
        initialParams={{ user: owner_name, dog: dogInfo }}
        options={{ tabBarIcon: renderEvents, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
      />
      <Tab.Screen
        name="Matches"
        component={Requests}
        initialParams={{ user: owner_name, dog: dogInfo }}
        options={{ tabBarIcon: renderMatches, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ user: owner_name, dog: dogInfo }}
        options={{ tabBarIcon: renderProfile, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
      />
    </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  navBar: {
    borderRadius: 20,
  },
  // adBar: {
  //   padding: 20,
  //   flexDirection: 'row',
  //   justifyContent: 'center'
  // }
})

export default MainScreen;