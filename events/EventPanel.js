import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View } from 'react-native';
import styles from './styles.js';
import { Overlay, ListItem, Avatar } from '@rneui/themed'
import { Button } from '@rneui/base';
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const EventPanel = (props) => {
  const [showDelete, setShowDelete] = useState(false);

  const handleShowDelete = () => {
    setShowDelete(!showDelete);
  }

  const handleDelete = () => {
    setShowDelete(!showDelete);

    axios.delete(`http://54.219.129.63:3000/events/${props.event.event_id}`)
    .then(() => {
      console.log('FIRST DELETE SUCCESS');
      return props.fetchEvents();
    })
    .then(() => {
      let dateString = moment(props.event.date).format('YYYY-MM-DD');
      let year = parseInt(moment(props.event.date).format('YYYY'));
      let month = parseInt(moment(props.event.date).format('MM'));
      let day = parseInt(moment(props.event.date).format('DD'));
      console.log('DATESTRING ', dateString);
      console.log('YEAR ', year);
      console.log('MONTH ', month);
      console.log('DAY ', day)
      console.log('SECOND DELETE SUCCESS');
      return props.getDayEvents({ dateString: dateString, year: year, month: month, day: day })
    })
    .catch((err) => console.log(err));
  }

  return (
    <>
      <ListItem bottomDivider containerStyle={styles.eventPanel}>
        <Avatar rounded source={{ uri: props.event.photos[0] }}/>
        <ListItem.Content style={{flex: 5}}>
            <ListItem.Title>{props.event.dog_name}</ListItem.Title>
            <ListItem.Subtitle>{moment(props.event.date).format('LT')}</ListItem.Subtitle>
            <ListItem.Subtitle>{props.event.event_name}</ListItem.Subtitle>
            <ListItem.Subtitle>{props.event.location}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content>
          <Button title='X' color='red' onPress={handleShowDelete}/>
        </ListItem.Content>
      </ListItem>
      <Overlay
        isVisible={showDelete}
        onBackdropPress={handleShowDelete}
      >
        <Text>Do you want to delete this event?</Text>
        <Button title='Yes' onPress={handleDelete}></Button>
        <Button title='No' onPress={handleShowDelete}></Button>
      </Overlay>
    </>
  )
}

export default EventPanel;