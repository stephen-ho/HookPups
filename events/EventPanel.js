import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View } from 'react-native';
import styles from './styles.js';
import { ListItem, Avatar } from '@rneui/themed'
import { Button } from '@rneui/base';
import { useState } from 'react';

//#cdb4db
//#ffc8dd

/*
  Delete button on the right?
*/

const EventPanel = (props) => {
  const [showDelete, setShowDelete] = useState(false);

  const handleShowDelete = () => {
    setShowDelete(!showDelete);
  }

  const handleDelete = () => {
    console.log('hi')
    //delete from here
    //"/events/:owner1_name/:dog1_name/:owner2_name/:dog2_name"

    //retrieve events for this day after deletion
  }

  return (
    <View style={styles.eventPanel}>
      <View style={{flexDirection: 'row', backgroundColor: '#f2f2f2', height: 50, width: '85%'}}>
        <View style={{width: '20%', alignItems: 'center', justifyContent: 'center'}}>
          <Avatar rounded source={{ uri: props.event.recipient.dog.photo}} onPress={handleShowDelete}/>
        </View>
        <View style={{width: '80%', justifyContent: 'center'}}>
          <Text onPress={handleShowDelete}>{props.event.event} with {props.event.recipient.dog.name} at {props.event.location}</Text>
        </View>
        {showDelete && <View>
          <Button buttonStyle={{height: 50}} title='X' onPress={handleDelete}></Button>
        </View>}
      </View>
    </View>
  )
}

export default EventPanel;

{/* <ListItem style={styles.eventPanel}>
<ListItem.Content style={styles.eventPanelLeft}>
  <Avatar
    source={{uri: props.event.recipient.dog.photo}}
    rounded={true}
  />
  <ListItem.Title>{props.event.recipient.dog.name}</ListItem.Title>
</ListItem.Content>
<ListItem.Content>
  <ListItem.Subtitle>{props.event.event}</ListItem.Subtitle>
  <ListItem.Subtitle>with {props.event.recipient.owner}</ListItem.Subtitle>
  <ListItem.Subtitle>at {props.event.location}</ListItem.Subtitle>
</ListItem.Content>
<ListItem.Content>
  <Button title='Delete Event'></Button>
</ListItem.Content>
</ListItem> */}