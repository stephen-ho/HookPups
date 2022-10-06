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

const EventMain = (props) => {
  // console.log('what is in Event main: ', props.route.params)
  const [currentUser, setCurrentUser] = useState(props.route.params.user);
  const [currentDog, setCurrentDog] = useState(props.route.params.dog);
  const [showPage, setShowPage] = useState(false); // Show event page once a date is pressed
  const [events, setEvents] = useState([]); // Store initial axios GET events here
  const [selectedDates, setSelectedDates] = useState({}); // Mark calendar with relevant days once GET request done
  const [dayEvents, setDayEvents] = useState([]);  // Store events for the pressed date here
  const [selectedDay, setSelectedDay] = useState({});

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
    // return function cleanUp() {
    //   setShowPage(false);
    // }
  }, []);

  const fetchEvents = async () => {
    const results = await axios.get(`http://54.219.129.63:3000/events/${currentUser}/${currentDog.dog_name}`);
    //parse results first?
    console.log('INITIAL EVENT RESULTS: ', results.data);
    setEvents(results.data);
    selectDates();
  }

  const selectDates = () => {
    let tempSelectedDates = {};
    for (let i = 0; i < events.length; i++) {
      let formattedDate = moment(events[i].date).format('YYYY-MM-DD');
      tempSelectedDates[formattedDate] = {selected: true};
      // tempSelectedDates[eventData[i].date] = {selected: true};
    }
    setSelectedDates(tempSelectedDates);
  }

  const handleDayPress = (day) => {
    let date = day.dateString;
    let tempEvents = [];
    for (let i = 0; i < events.length; i++) {
      if (moment(events[i].date).format('YYYY-MM-DD') === date) {
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
          currentUser={currentUser}
          currentDog={currentDog}
        />}
        {showPage && <EventPage
          events={dayEvents}
          handleBackPress={handleBackPress}
          selectedDay={selectedDay}
          currentUser={currentUser}
          currentDog={currentDog}
          fetchEvents={fetchEvents}
        />}
      </View>
    </SafeAreaView>
  )
};

export default EventMain;