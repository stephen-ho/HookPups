import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import styles from './styles.js';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useState, useEffect } from 'react';

const EventCalendar = (props) => {
  return (
    <View style={styles.calendar}>
      <Calendar
        onDayPress={props.handleDayPress}
        enableSwipeMonths={true}
        markedDates={props.markedDays}
      />
    </View>
  )
};

export default EventCalendar;