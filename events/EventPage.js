import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import EventPanel from './EventPanel.js';
import eventData from './eventTestData.js';
import styles from './styles.js';
import { useState } from 'react';

/*
  TODO:
    Add "Add an event" at the bottom of the page
      Preferably keep it in view no matter where the scroll is
*/

const EventPage = (props) => {
  const [show, setShow] = useState(false);

  const handleShow = (day) => {
    //{"dateString": "2022-10-29", "day": 29, "month": 10, "timestamp": 1667001600000, "year": 2022}
    console.log(day);
    setShow(!show)
  }

  const renderNames = () => {
    return props.events.map((event, index) => (
      <EventPanel
      event={event}
      key={event.event + index}
      />
    ))
  }

  return (
    <ScrollView style={styles.eventPage}>
      {renderNames()}
      {/* <StatusBar style="auto" /> */}
    </ScrollView>
  );
}

export default EventPage;