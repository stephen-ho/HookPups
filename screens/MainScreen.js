import React, { useState, useEffect } from 'react';
import EventMain from '../events/EventMain.js';
import Requests from '../components/Requests/requests.js';
import CardSwipe from '../components/Home/cardSwipe.js';
import ProfileScreen from '../screens/Profiles/ProfileScreen.js'
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { Entypo, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const route = useRoute();
  const owner_name = route.params.email;
  const dog_name = route.params.dog_name;

  console.log('mainscreen - dog name: ', dog_name);

  useEffect (() => {

  })

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
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Map"
        component={CardSwipe}
        initialParams={{ user: owner_name }}
        options={{ tabBarIcon: renderMap, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
      />
      <Tab.Screen
        name="Events"
        component={EventMain}
        initialParams={{ user: owner_name }}
        options={{ tabBarIcon: renderEvents, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
      />
      {/* <Tab.Screen
        name="Home"
        component={CardSwipe}
        initialParams={{ user: owner_name }}
        options={{ tabBarIcon: renderHome, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
      /> */}
      <Tab.Screen
        name="Matches"
        component={Requests}
        initialParams={{ user: owner_name }}
        options={{ tabBarIcon: renderMatches, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ user: owner_name }}
        options={{ tabBarIcon: renderProfile, tabBarActiveTintColor: 'black', tabBarActiveBackgroundColor: '#CDB4DB' }}
      />
    </Tab.Navigator>
  );
}

export default MainScreen;