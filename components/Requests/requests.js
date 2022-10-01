import React from 'react';
import { View } from 'react-native';
import { ListItem, Avatar, Text, Tab } from "@rneui/themed";
import styles from './requestStyles.js';
import { AntDesign } from '@expo/vector-icons';

const users = [
  {
    name: 'Brynn',
    avatar: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*',
    breed: 'Golden Retriever',
    personality: 'Calm',
    size: 'Large'
  },
  {
    name: 'Cookie',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRabjk51qPq_AYTpKg-YuDOopdf1WN2XnmqbiXMKH7CliUzkqDqUEJv0v22V5JjHrVGK8A&usqp=CAU',
    breed: 'Labrador Retriever',
    personality: 'Excited',
    size: 'Large'
  },
  {
    name: 'Pudding',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmrmp0yROZQs9h7GQvwizgpXWwNSe9FOtn2Q&usqp=CAU',
    breed: 'Pom',
    personality: 'Excited',
    size: 'Small'
  },
  {
    name: 'Hunter',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxYy4mS5E0-eG5aKeoTPTtkwal628dGFsrgA&usqp=CAU',
    breed: 'German Shepherd',
    personality: 'Mild',
    size: 'Large'
  }
];

//name, breed, personality, size
const Request = (props) => {
  return (
    <View style={styles.requestContainer}>
      <Tab value={0} variant="primary">
        <Tab.Item>Matches</Tab.Item>
        <Tab.Item>Accepted</Tab.Item>
      </Tab>
      {
        users.map((user, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={{uri: user.avatar}} size={60} rounded/>
            <ListItem.Content >
            <View style={styles.buttons}>
              <AntDesign name="closecircle" size={24} color="red" onPress={() => {alert('Declined')}}/>
              <AntDesign name="checkcircle" size={24} color="green" style={styles.closecircle} onPress={() => {alert('Accepted')}}/>
            </View>
              <View style={styles.bio}>
                <ListItem.Title style={styles.name}>{user.name}</ListItem.Title>
                <Text>{user.breed}</Text>
                <Text>{user.personality}</Text>
                <Text>{user.size}</Text>
              </View>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
  )
}

export default Request;