import { StyleSheet, Image, Text, View, ScrollView, SafeAreaView } from 'react-native';
import styles from './styles.js';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EventCalendar from './EventCalendar.js';
import EventPage from './EventPage.js';
import moment from 'moment';

const EventMain = (props) => {
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
  }, []);

  const fetchEvents = async () => {
    const results = await axios.get(`http://54.219.129.63:3000/events/${currentUser}/${currentDog.dog_name}`);
    selectDates(results.data);
  }

  const selectDates = (results) => {
    let tempSelectedDates = {};
    for (let i = 0; i < results.length; i++) {
      let formattedDate = moment(results[i].date).format('YYYY-MM-DD');
      tempSelectedDates[formattedDate] = {selected: true};
    }
    setEvents(results);
    setSelectedDates(tempSelectedDates);
  }

  const sortEvents = (a, b) => {
    return new Date(a.date) - new Date(b.date);
  };

  const handleDayPress = async (day) => {
    let date = day.dateString;
    const results = await axios.get(`http://54.219.129.63:3000/events/${currentUser}/${currentDog.dog_name}`);

    let tempEvents = [];
    for (let i = 0; i < results.data.length; i++) {
      if (moment(results.data[i].date).format('YYYY-MM-DD') === date) {
        tempEvents.push(results.data[i]);
      }
    }
    tempEvents = tempEvents.sort(sortEvents);
    setDayEvents(tempEvents);
    setShowPage(true);
    setSelectedDay(new Date(day.year, day.month - 1, day.day, 12));
  }

  const handleBackPress = () => {
    setShowPage(false);
    setDayEvents([]);
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#a2d2ff'}}>
      <View style={styles.phone}>
        {!showPage && <EventCalendar
          selectedDates={selectedDates}
          handleDayPress={handleDayPress}
          currentUser={currentUser}
          currentDog={currentDog}
          fetchEvents={fetchEvents}
        />}
        {showPage && <EventPage
          events={dayEvents}
          handleBackPress={handleBackPress}
          selectedDay={selectedDay}
          currentUser={currentUser}
          currentDog={currentDog}
          fetchEvents={fetchEvents}
          getDayEvents={handleDayPress}
        />}
      </View>
    </SafeAreaView>
  )
};

export default EventMain;