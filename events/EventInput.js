import { StyleSheet, Image, Text, View, ScrollView, TextInput } from 'react-native';
import styles from './styles.js';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@rneui/base';
import { Overlay, Avatar, ListItem } from '@rneui/themed';
import matchedDogsData from './matchedDogsTestData.js';
import EventMatchedInput from './EventMatchedInput.js';

const EventInput = (props) => {
  const [details, setDetails] = useState({});
  const [date, setDate] = useState(props.date);
  const [event, setEvent] = useState('');
  const [location, setLocation] = useState('');
  // const [matchedDogs, setMatchedDogs] = useState([]);
  const [matchedDogs, setMatchedDogs] = useState(matchedDogsData);
  const [selected, setSelected] = useState(false);
  const [selectedDog, setSelectedDog] = useState({}); //contains dog name+id, owner name+id
  const [openChooser, setOpenChooser] = useState(false);

  useEffect(() => {
    // fetchMatchedDogs();
  }, [])

  const fetchMatchedDogs = async () => {
    // const dogs = await axios.get(`/matches`);
  }

  const validateInfo = () => {
    // What to validate?
    // Date?
    // Name?
    // Event?
    // Location?
    // Selected dog? (Do I even need the first name input if this is here?)
    return true;
  }

  const handleSubmit = async () => {
    if (!validateInfo) {
      //return some error?
    }

    // Figure out what exactly to submit

    console.log(details);
    const data = {
      dog1_id: dog, //should be the id of the current user's dog
      dog2_id: dog.dog_id,
      event_name: event,
      date: date,
      location: location,
    };
    await axios.post('/', data);
  }

  const handleDateChange = (e, date) => {
    console.log(date);
    console.log(typeof date);
    setDate(date);
  }

  const handleOpenChooser = () => {
    setOpenChooser(!openChooser);
  }

  const handleSelect = (dog) => {
    setSelected(true);
    setSelectedDog(dog);
    setOpenChooser(!openChooser);
  }

  return (
    <View>
      <Button style={{marginTop: 30}} title='Close' onPress={props.handleShow}></Button>
      {!selected &&
        <ListItem style={styles.inputChooser} onPress={handleOpenChooser}>
          <Avatar source={{uri: `https://res.cloudinary.com/daqlqdhlo/image/upload/v1662607816/c5lyz7wu0n7ie394zg11.jpg`}}/>
          <ListItem.Content>
            <ListItem.Title>Select a dog you've matched with!</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      }
      {selected &&
        <ListItem style={styles.inputChooser} onPress={handleOpenChooser}>
          <Avatar source={{uri: selectedDog.photo}}/>
          <ListItem.Content>
            <ListItem.Title>Owner: {selectedDog.owner}</ListItem.Title>
            <ListItem.Subtitle>Dog: {selectedDog.dog}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      }
      <TextInput
        style={styles.inputTextField}
        onChangeText={(e) => setEvent(e)}
        placeholder='Event'
        />
      <TextInput
        style={styles.inputTextField}
        onChangeText={(e) => setLocation(e)}
        placeholder='Location'
        />
      <DateTimePicker
        mode='datetime'
        style={{width: 200, height: 30}}
        value={date}
        onChange={handleDateChange}
      />
      <Overlay
        isVisible={openChooser}
        overlayStyle={styles.overlay}
        onBackdropPress={handleOpenChooser}
      >
        <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 15 }}>YOUR MATCHES</Text>
        {matchedDogs.length < 1 && <Text style={{ textAlign: 'center' }}>You haven't matched with any dogs yet...</Text>}
        <ScrollView>
          {matchedDogs.map((dog, index) => (
            <EventMatchedInput
              key={index}
              dog={dog}
              handleSelect={handleSelect}
            />
          ))}
        </ScrollView>
      </Overlay>
      <Button
        title="Submit Event"
        onPress={props.handleShow}
      />
    </View>
  )
};

export default EventInput;