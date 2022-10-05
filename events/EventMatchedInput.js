import { StyleSheet, Image, Text, View, ScrollView, TextInput } from 'react-native';
import styles from './styles.js';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@rneui/base';
import { Overlay, Avatar, ListItem } from '@rneui/themed';
import matchedDogsData from './matchedDogsTestData.js';

const EventMatchedInput = ({handleSelect, dog}) => {

  const checkPress = () => {
    handleSelect(dog);
  }

  return (
    <ListItem containerStyle={styles.overlayItems} onPress={checkPress}>
      <Avatar rounded source={{uri: dog.photo}}/>
      <ListItem.Content>
        <ListItem.Title>Owner: {dog.owner}</ListItem.Title>
        <ListItem.Subtitle>Dog: {dog.dog}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
};

export default EventMatchedInput;