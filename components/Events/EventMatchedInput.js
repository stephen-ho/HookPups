import { StyleSheet, Image, Text, View, ScrollView, TextInput } from 'react-native';
import styles from './styles.js';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@rneui/base';
import { Overlay, Avatar, ListItem } from '@rneui/themed';

const EventMatchedInput = ({handleSelect, dog}) => {
  const checkPress = () => {
    handleSelect(dog);
  }

  return (
    <ListItem containerStyle={styles.overlayItems} onPress={checkPress}>
      <Avatar rounded source={{uri: dog.dog2_photos[0]}}/>
      <ListItem.Content>
        <ListItem.Title>Dog: {dog.dog2_dog}</ListItem.Title>
        <ListItem.Subtitle>Owner: {dog.dog2_owner_display_name}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
};

export default EventMatchedInput;