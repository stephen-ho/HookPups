import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import EventPanel from './EventPanel.js';
import eventData from './eventTestData.js';
import styles from './styles.js';
import { useState } from 'react';
import EventInput from './EventInput.js';
import { Button } from '@rneui/base';
import moment from 'moment';

const EventPage = (props) => {
  const [showInput, setShowInput] = useState(false);

  const handleShow = () => {
    setShowInput(!showInput);
  }

  const renderNames = () => {
    return props.events.map((event, index) => (
      <EventPanel
        event={event}
        currentUser={props.currentUser}
        currentDog={props.currentDog}
        fetchEvents={props.fetchEvents}
        key={event.event_id + index}
        getDayEvents={props.getDayEvents}
      />
    ))
  }

  return (
    <>
      {showInput &&
        <EventInput
          handleShow={handleShow}
          fetchEvents={props.fetchEvents}
          date={props.selectedDay}
          currentUser={props.currentUser}
          currentDog={props.currentDog}
          getDayEvents={props.getDayEvents}
        />
      }
      <View style={styles.eventPage}>
        {!showInput &&
          <View style={styles.eventPageHeader}>
            <Text style={styles.eventPageDate}>{moment(props.selectedDay).format('MMMM Do YYYY')}</Text>
            {props.events.length < 1 && <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 15 }}>No events scheduled for this day...</Text>}
          </View>
        }
        <ScrollView>
          {!showInput && renderNames()}
        </ScrollView>
        {!showInput && <Button title='Add an Event' onPress={handleShow} />}
        {!showInput && <Button title="Back to Calendar" onPress={props.handleBackPress} />}
      </View>
    </>
  );
}

export default EventPage;