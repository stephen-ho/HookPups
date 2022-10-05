import { StyleSheet, Image, Text, View, ScrollView, SafeAreaView } from 'react-native';
import styles from './styles.js';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCalendar from './EventCalendar.js';
import EventPage from './EventPage.js';
import eventData from './eventTestData.js';
import moment from 'moment';

// Owner name is actually the owner's email

/*
  TODO:
    Markers for events in calendar already
      Axios call for all relevant events on component load?
*/

const EventMain = (props) => {
  console.log('what is in Event main: ', props.route.params)
  const [showPage, setShowPage] = useState(false); // Show event page once a date is pressed
  const [events, setEvents] = useState(eventData); // Store initial axios GET events here
  const [selectedDates, setSelectedDates] = useState({}); // Mark calendar with relevant days once GET request done
  const [dayEvents, setDayEvents] = useState([]);  // Store events for the pressed date here
  const [selectedDay, setSelectedDay] = useState({});

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // fetchEvents();
    selectDates(); //take out when axios implemented; move to fetchEvents
    // return function cleanUp() {
    //   setShowPage(false);
    // }
  }, []);

  const fetchEvents = async () => {
    const results = await axios.get('/');
    //parse results first?
    setEvents(results);
    selectDates();
  }

  const selectDates = () => {
    let tempSelectedDates = {};
    for (let i = 0; i < eventData.length; i++) {
      // let formattedDate = moment(eventData[i].date).format('YYYY-MM-DD');
      // tempSelectedDates[formattedDate] = {selected: true};
      tempSelectedDates[eventData[i].date] = {selected: true};
    }
    setSelectedDates(tempSelectedDates);
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
    setSelectedDay(new Date(day.year, day.month - 1, day.day, 12));
  }

  const handleBackPress = () => {
    setShowPage(false);
    setDayEvents([]);
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#bde0fe'}}>
    <View style={styles.phone}>
      {!showPage && <EventCalendar
        selectedDates={selectedDates}
        handleDayPress={handleDayPress}
      />}
      {showPage && <EventPage
        events={dayEvents}
        handleBackPress={handleBackPress}
        selectedDay={selectedDay}
      />}
    </View>
    </SafeAreaView>
  )
};

export default EventMain;