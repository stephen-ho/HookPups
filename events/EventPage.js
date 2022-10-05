import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import EventPanel from './EventPanel.js';
import eventData from './eventTestData.js';
import styles from './styles.js';
import { useState } from 'react';
import EventInput from './EventInput.js';
import { Button } from '@rneui/base';
import moment from 'moment'

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
    <>
      {showInput &&
        <EventInput
          handleShow={handleShow}
          date={props.selectedDay}
        />
      }
      <View style={styles.eventPage}>
        {!showInput &&
          <View>
            <Button title="Back to Calendar" onPress={props.handleBackPress} />
            <Text style={styles.eventPageDate}>{moment(props.selectedDay).format('MMMM Do YYYY')}</Text>
            {props.events.length < 1 && <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 15 }}>No events scheduled for this day...</Text>}
          </View>
        }
        <ScrollView>
          {!showInput && renderNames()}
        </ScrollView>
        {!showInput && <Button title='Add an Event' onPress={handleShow} />}
      </View>
    </>
  );
}

export default EventPage;