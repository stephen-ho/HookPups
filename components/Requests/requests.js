import React from 'react';
import { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { ListItem, Avatar, Text, Tab, TabView} from "@rneui/themed";
import styles from './requestStyles.js';
import Chat from '../../chat/Chat.js';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

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
  const [isChat, setIsChat] = useState(false);
  const [pending, setPending] = useState([]);
  const [accepted, setAccepted] = useState([]);

  const toggleChat = () => {
    setIsChat(!isChat);
  }

  useEffect(() => {
    axios.get('http://54.219.129.63:3000/matches/Tina/Peanut/pending')
      .then((response) => { console.log('Getting pending: ', response.data); setPending(response.data) })
      .catch((err) => {console.log('Error getting pending matches')})

    axios.get('http://54.219.129.63:3000/matches/Justin/Max/confirmed')
    .then((response) => { setAccepted(response.data)} )
    .catch((err) => {console.log('Error getting confirmed matches')})
  }, [])

  const confirmMatch = () => {
    const match = {"dog1_name": "Max", "owner1_name": "Justin", "dog2_name": "Coco", "owner2_name": "Alex"}
    axios.post('http://54.219.129.63:3000/matches', match)
      .catch((err) => {console.log('Error confirming match')})
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#d9edff'}}>
      {isChat ? <Chat toggleChat={toggleChat} /> :
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
              data={pending}
              renderItem={({item}) => (
                <ListItem bottomDivider>
                  <Avatar rounded source={{uri: item.photos[0]}} size={60} />
                  <ListItem.Content>
                    <ListItem.Title style={styles.name}>{item.dog_name}</ListItem.Title>
                    <ListItem.Subtitle>{item.breed}</ListItem.Subtitle>
                    <ListItem.Subtitle>{item.personality}</ListItem.Subtitle>
                    <ListItem.Subtitle>{item.size}</ListItem.Subtitle>
                  </ListItem.Content>
                  <View style={styles.buttons}>
                    <AntDesign name="closecircle" size={24} color="#FF5733" onPress={() => {alert('Declined')}}/>
                    <AntDesign name="checkcircle" size={24} color="#0BDA51" style={styles.closecircle} onPress={confirmMatch}/>
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
                    <ListItem.Subtitle onPress={() =>{toggleChat()}}>{item.message}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              )}
            />
          </TabView.Item>
        </TabView>
      </View>
      }
    </SafeAreaView>
  )
}

export default Request;