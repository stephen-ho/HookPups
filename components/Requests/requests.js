import React from 'react';
import { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Avatar, Text, Tab, TabView} from "@rneui/themed";
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
  },
];

const matched = [
  {
    name: 'Mochi',
    avatar: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/small-white-dog-breeds-cover-1560293099.jpg',
    message: 'Hey this is Mochi! Wanna schedule a play date?'
  },
];

const Request = (props) => {
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.requestContainer}>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: '#CDB4DB',
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          containerStyle={(active) => ({
            backgroundColor: active ? '#FFAFCC' : '#FFC8DD',
          })}
        > Matches </Tab.Item>
        <Tab.Item
          containerStyle={(active) => ({
            backgroundColor: active ? '#FFAFCC' : '#FFC8DD',
          })}
        >Accepted</Tab.Item>
      </Tab>

      <TabView value={index} onChange={setIndex} animationType='spring'>
        <TabView.Item style={styles.tabView}>
          <FlatList
            data={users}
            renderItem={({item}) => (
              <ListItem bottomDivider>
                <Avatar rounded source={{uri: item.avatar}} size={60} />
                <ListItem.Content>
                  <ListItem.Title style={styles.name}>{item.name}</ListItem.Title>
                  <ListItem.Subtitle>{item.breed}</ListItem.Subtitle>
                  <ListItem.Subtitle>{item.personality}</ListItem.Subtitle>
                  <ListItem.Subtitle>{item.size}</ListItem.Subtitle>
                </ListItem.Content>
                <View style={styles.buttons}>
                  <AntDesign name="closecircle" size={24} color="#FF5733" onPress={() => {alert('Declined')}}/>
                <AntDesign name="checkcircle" size={24} color="#0BDA51" style={styles.closecircle} onPress={() => {alert('Accepted')}}/>
                </View>
              </ListItem>
            )}
          />
        </TabView.Item >

        <TabView.Item style={styles.tabView}>
        <FlatList
            data={matched}
            renderItem={({item}) => (
              <ListItem bottomDivider>
                <Avatar rounded source={{uri: item.avatar}} size={60} />
                <ListItem.Content>
                  <ListItem.Title style={styles.name}>{item.name}</ListItem.Title>
                  <ListItem.Subtitle>{item.message}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )}
          />
        </TabView.Item>
      </TabView>
    </View>
  )
}

export default Request;