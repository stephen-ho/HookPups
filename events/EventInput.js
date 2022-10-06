import { StyleSheet, Image, Text, View, ScrollView, TextInput, Alert } from 'react-native';
import styles from './styles.js';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '@rneui/base';
import { Overlay, Avatar, ListItem } from '@rneui/themed';
import axios from 'axios';
import EventMatchedInput from './EventMatchedInput.js';
import matchedDogsData from './matchedDogsTestData.js';


const EventInput = (props) => {
  const [date, setDate] = useState(props.date);
  const [event, setEvent] = useState('');
  const [location, setLocation] = useState('');
  const [matchedDogs, setMatchedDogs] = useState([]);
  const [selected, setSelected] = useState(false);
  const [selectedDog, setSelectedDog] = useState({}); //contains dog name+id, owner name+id
  const [openChooser, setOpenChooser] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchMatchedDogs();
  }, [])

  const fetchMatchedDogs = async () => {
    // console.log('USER ', props.currentUser);
    // console.log('DOG ', props.currentDog.dog_name);
    const results = await axios.get(`http://54.219.129.63:3000/matches/${props.currentUser}/${props.currentDog.dog_name}/confirmed`);
    console.log('DATA ', results.data);
    setMatchedDogs(results.data);
  }

  const validateInfo = () => {
    const errors = [];
    if (Object.keys(selectedDog).length < 1) {
      errors.push(`Dog\n`);
    }
    if (event.length < 1) {
      errors.push(`Event\n`);
    }
    if (location.length < 1) {
      errors.push(`Location\n`);
    }
    // Is validating date also possible?
    if (errors.length > 0) {
      errors[errors.length - 1] = errors[errors.length - 1].replace('\n', '');
      const errorMessages = errors.join('');
      Alert.alert(
        `Please input`,
        errorMessages
      );
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = () => {
    if (!validateInfo()) {
      return;
    }
    setSubmitting(true);

    // Figure out what exactly to submit

     // dog1_id should be the id of the current user's dog
    //  dog1_name: props.currentDog.dog_name,
    //  owner1_name: props.currentUser,
    //  dog2_name: selectedDog.dog_name,
    //  owner2_name: selectedDog.owner_name,

    const data = {
      dog1_name: props.currentDog.dog_name,
      owner1_name: props.currentUser,
      dog2_name: selectedDog.dog1_dog,
      owner2_name: selectedDog.dog1_owner,
      event_name: event,
      date: date,
      location: location,
    };
    console.log(data);
    axios.post(`http://54.219.129.63:3000/events`, data)
    .then(() => {
      return props.fetchEvents();
    })
    .then(() => {
      props.handleShow();
      setSubmitting(false);
    })
    .catch((err) => {
      setSubmitting(false);
    })
  };

  const handleDateChange = (e, date) => {
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
    <>
      <Button title='Close' onPress={props.handleShow}></Button>
      <View style={{alignItems: 'center'}}>
        {!selected &&
          <ListItem style={styles.inputChooser} onPress={handleOpenChooser}>
            <Avatar rounded source={{uri: `https://puppyhop.com/images/app/dog-placeholder-muted-500x500.png`}}/>
            <ListItem.Content>
              <ListItem.Title>Select a dog you've matched with!</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        }
        {selected &&
          <ListItem style={styles.inputChooser} onPress={handleOpenChooser}>
            <Avatar rounded source={{uri: selectedDog.dog1_photos[0]}}/>
            <ListItem.Content>
              <ListItem.Title>Dog: {selectedDog.dog1_name}</ListItem.Title>
              <ListItem.Subtitle>Owner: {selectedDog.dog1_owner_display_name}</ListItem.Subtitle>
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
          <Text style={styles.overlayHeader}>Your Matches</Text>
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
        {!submitting && <Button
          title="Submit Event"
          onPress={handleSubmit}
          style={{marginTop: 30}}
        />}
        {submitting && <Button
          title="Submitting..."
          style={{marginTop: 30}}
        />}
      </View>
    </>
  )
};

export default EventInput;