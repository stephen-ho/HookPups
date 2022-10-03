import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import EventPanel from './EventPanel.js';
import eventData from './eventTestData.js';
import styles from './styles.js';
import { useState } from 'react';
import EventInput from './EventInput.js';

/*
  TODO:
    Add "Add an event" at the bottom of the page
      Preferably keep it in view no matter where the scroll is
*/

const EventPage = (props) => {
  const [showInput, setShowInput] = useState(false);

  const handleShow = () => {
    setShowInput(!showInput);
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
      {!showInput && renderNames()}
      {/* <StatusBar style="auto" /> */}
      {!showInput && <Text onPress={handleShow}>Add an event</Text>}
      {showInput && <EventInput
        handleShow={handleShow}
        date={new Date()}
        disabled={true}
      />}
    </ScrollView>
  );
}

export default EventPage;