import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View } from 'react-native';
import styles from './styles.js';
// import { Button } from '@rneui/base';

//#cdb4db
//#ffc8dd

/*
  TODO:
    Show dog profile on picture press? (low priority if it's even a thing)
    Show owner profile on panel press? (low priority if it's even a thing)
*/

const EventPanel = (props) => {

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text>{props.event.date}</Text>
        <Image style={styles.photo} source={{uri: props.event.recipient.dog.photo}}/>
        <Text style={styles.name}>{props.event.recipient.dog.name}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text>{props.event.event}</Text>
        <Text>with {props.event.recipient.owner}</Text>
        <Text>at {props.event.location}</Text>
      </View>
    </View>
  )
}

export default EventPanel;