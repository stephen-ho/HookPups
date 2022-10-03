import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import styles from './styles.js';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import EventInput from './EventInput.js';

const EventCalendar = (props) => {
  const [showInput, setShowInput] = useState(false);

  const handleShow = () => {
    setShowInput(!showInput);
  }

  return (
    <View style={styles.calendar}>
      {!showInput && <Calendar
        onDayPress={props.handleDayPress}
        enableSwipeMonths={true}
        selectedDates={new Date()}
        markedDates={props.markedDays}
      />}
      {!showInput && <Text onPress={handleShow}>Add an event</Text>}
      {showInput && <EventInput
        handleShow={handleShow}
        date={new Date()}
        disabled={false}
      />}
    </View>
  )
};

export default EventCalendar;