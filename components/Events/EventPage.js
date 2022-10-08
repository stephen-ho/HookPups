import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import EventPanel from './EventPanel.js';
import styles from './styles.js';
import { useState } from 'react';
import EventInput from './EventInput.js';
import { Button } from '@rneui/base';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';
import { useFonts, Peralta_400Regular  } from '@expo-google-fonts/peralta'

const EventPage = (props) => {
  const [showInput, setShowInput] = useState(false);
  let [fontsLoaded] = useFonts({
    Peralta_400Regular
  });

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
        key={event.event_id}
        getDayEvents={props.getDayEvents}
      />
    ))
  }
  if (fontsLoaded) {

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
        {!showInput && <View style={styles.header}>
          <AntDesign name="caretleft" size={24} color="black" style={styles.headerBack}onPress={props.handleBackPress}/>
          <Text style={styles.headerText}>Events</Text>
        </View>
        }
        {/* {!showInput && <Button style={styles.buttons} title="Close" onPress={props.handleBackPress} />} */}
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
          {!showInput && <Button color='#FFAFCC' style={styles.buttons} title='Add an Event' onPress={handleShow} />}
        </View>
      </>
    );
  }
}

export default EventPage;