import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import styles from './styles.js';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCalendar from './EventCalendar.js';
import EventPage from './EventPage.js';
import eventData from './eventTestData.js';

/*
  TODO:
    Markers for events in calendar already
      Axios call for all relevant events on component load?
*/

const EventMain = (props) => {
  console.log('what is in Event main: ', props.route.params)
  const [showPage, setShowPage] = useState(false); // Show event page once a date is pressed
  const [events, setEvents] = useState(eventData); // Store initial axios GET events here
  const [markedDays, setMarkedDays] = useState({}); // Mark calendar with relevant days once GET request done
  const [dayEvents, setDayEvents] = useState([]);  // Store events for the pressed date here

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // fetchEvents();
    markDates(); //take out when axios implemented; move to fetchEvents
  }, []);

  const fetchEvents = async () => {
    const results = await axios.get('/');
    //parse results first?
    setEvents(results);
    markDates();
  }

  const markDates = () => {
    let tempMarkedDays = {};
    for (let i = 0; i < eventData.length; i++) {
      tempMarkedDays[eventData[i].date] = {selected: true};
    }
    setMarkedDays(tempMarkedDays);
  }

  const handleDayPress = (day) => {
    let date = day.dateString;
    let tempEvents = [];
    for (let i = 0; i < events.length; i++) {
      if (events[i].date === date) {
        tempEvents.push(events[i]);
      }
    }
    setDayEvents(tempEvents);
    setShowPage(true);
  }

  const handleBackPress = () => {
    setShowPage(false);
    setDayEvents([]);
  }

  return (
    <View style={styles.phone}>
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Calendar</Text>
        {showPage && <Text onPress={handleBackPress}>GO BACK!!!</Text>}
      </View>
      {!showPage && <EventCalendar
        markedDays={markedDays}
        handleDayPress={handleDayPress}
      />}
      {showPage && <EventPage
        events={dayEvents}
        handleBackPress={handleBackPress}
      />}
      <View style={styles.navBar}><Text>NAV BAR</Text></View>
    </View>
  )
};

export default EventMain;