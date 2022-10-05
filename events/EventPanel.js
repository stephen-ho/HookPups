import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View } from 'react-native';
import styles from './styles.js';
import { Overlay, ListItem, Avatar } from '@rneui/themed'
import { Button } from '@rneui/base';
import { useState } from 'react';
import moment from 'moment';

const EventPanel = (props) => {
  const [showDelete, setShowDelete] = useState(false);

  const handleShowDelete = () => {
    setShowDelete(!showDelete);
  }

  const handleDelete = () => {
    console.log('Deleted placeholder')
    setShowDelete(!showDelete);
    //delete from here
    //"/events/:owner1_name/:dog1_name/:owner2_name/:dog2_name"

    //retrieve events for this day after deletion
  }

  return (
    <>
      <ListItem bottomDivider containerStyle={styles.eventPanel}>
        <Avatar rounded source={{ uri: props.event.recipient.dog.photo }}/>
        <ListItem.Content style={{flex: 5}}>
            <ListItem.Title>{props.event.recipient.dog.name}</ListItem.Title>
            {/* <ListItem.Subtitle>{moment(props.event.date).format('LT')}</ListItem.Subtitle> */}
            <ListItem.Subtitle>12:00 PM</ListItem.Subtitle>
            <ListItem.Subtitle>{props.event.event}</ListItem.Subtitle>
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