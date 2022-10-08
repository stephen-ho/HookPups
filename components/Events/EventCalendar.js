import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import styles from './styles.js';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import EventInput from './EventInput.js';
import { Button } from '@rneui/base';
import moment from 'moment';

const EventCalendar = (props) => {
  const [showInput, setShowInput] = useState(false);
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    let currentDay = moment(new Date()).format(`YYYY-MM-DD`);
    setCurrentDay(currentDay);
  }, [])

  const handleShow = () => {
    setShowInput(!showInput);
  }

  return (
    <>
      {!showInput && <View style={styles.header}>
        <Text style={styles.headerText}>Events</Text>
      </View>
      }
      <View>
        {!showInput && <Calendar
          style={styles.calendar}
          theme={styles.calendarTheme}
          onDayPress={props.handleDayPress}
          enableSwipeMonths={true}
          markedDates={({...props.selectedDates, [currentDay]: ({...props.selectedDates[currentDay], marked: true})})}
        />}
        {!showInput && <Button style={({...styles.buttons, marginTop: 5})} onPress={handleShow}>Add an event</Button>}
      </View>
      {showInput &&
        <EventInput
          handleShow={handleShow}
          fetchEvents={props.fetchEvents}
          date={new Date()}
          currentUser={props.currentUser}
          currentDog={props.currentDog}
        />
      }
    </>
  )
};

export default EventCalendar;