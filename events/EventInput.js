import { StyleSheet, Image, Text, View, ScrollView, TextInput } from 'react-native';
import styles from './styles.js';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@rneui/base';
import matchedDogsData from './matchedDogsTestData.js';

const EventInput = (props) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(props.date);
  const [event, setEvent] = useState('');
  const [location, setLocation] = useState('');
  const [open, setOpen] = useState(false);
  const [matchedDogs, setMatchedDogs] = useState([]);

  useEffect(() => {
    // fetchMatchedDogs();
  }, [])

  const fetchMatchedDogs = async () => {
    const dogs = await axios.get('');
  }

  const handleSubmit = () => {
    const data = {
      name: '',
      date: '',
      event: '',
      location: '',
    };
    axios.post('/', data);
  }

  const handleDateChange = (e, date) => {
    // console.log(e);
    console.log(date);
    //Figure out how to parse data?
  }

  const handleStateCheck = () => {
    console.log('NAME: ', name);
    console.log('DATE: ', date);
    console.log('EVENT: ', event);
    console.log('MATCHED DOGS: ', matchedDogs);
  }
  return (
    <View>
      <Button title='Close' onPress={props.handleShow}></Button>
      <TextInput
        style={{height: 40, width: 100, backgroundColor: 'white'}}
        onChangeText={(e) => setEvent(e)}
        placeholder='Event'
        />
      <TextInput
        style={{height: 40, width: 100, backgroundColor: 'white'}}
        onChangeText={(e) => setLocation(e)}
        placeholder='Location'
        />
      <DateTimePicker
        style={{width: 200, height: 100}}
        value={date}
        onChange={handleDateChange}
        disabled={props.disabled}
      />
      <Text>Popup for all matched dogs for this user?</Text>
      <Button title="Check State" onPress={handleStateCheck}/>
      <Button
        title="Submit Event"
        onPress={props.handleShow}
      />
    </View>
  )
};

export default EventInput;