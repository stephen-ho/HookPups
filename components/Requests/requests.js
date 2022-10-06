import React from 'react';
import { useState, useEffect } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import { ListItem, Avatar, Text, Tab, TabView} from "@rneui/themed";
import styles from './requestStyles.js';
import Chat from '../../chat/Chat.js';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const Request = (props) => {
  const [index, setIndex] = useState(0);
  const [isChat, setIsChat] = useState(false);
  const [pending, setPending] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [currentMatch, setCurrentMatch] = useState({});
  const owner_name = props.route.params.user;
  const dogName = props.route.params.dog.dog_name;
  const userPhoto = props.route.params.dog.photos[0];

  const toggleChat = () => {
    setIsChat(!isChat);
  }

  useEffect(() => {
    axios.get(`http://54.219.129.63:3000/matches/${owner_name}/${dogName}/pending`)
      .then((response) => { setPending(response.data) })
      .catch((err) => {console.log('Error getting pending matches')})

    axios.get(`http://54.219.129.63:3000/matches/${owner_name}/${dogName}/confirmed`)
      .then((response) => { setAccepted(response.data)} )
      .catch((err) => {console.log('Error getting confirmed matches')})
  }, [])

  const confirmMatch = (matchInfo) => {
    const match = {
      "dog1_name": dogName,
      "owner1_name": owner_name,
      "dog2_name": matchInfo.dog_name,
      "owner2_name": matchInfo.owner_name
    }

    axios.post('http://54.219.129.63:3000/matches', match)
      .then(() => {
        axios.get(`http://54.219.129.63:3000/matches/${owner_name}/${dogName}/pending`)
        .then((response) => {
          setPending(response.data)
          axios.get(`http://54.219.129.63:3000/matches/${owner_name}/${dogName}/confirmed`)
            .then((response) => { setAccepted(response.data)} )
            .catch((err) => {console.log('Error getting confirmed matches')})
        })
        .catch((err) => {console.log('Error getting pending matches after confirming match')})
      })
      .catch((err) => {console.log('Error confirming match')})
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#d9edff'}}>
      {isChat ? <Chat toggleChat={toggleChat} currentMatch={currentMatch} /> :
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
                    <AntDesign name="checkcircle" size={24} color="#0BDA51" style={styles.closecircle} onPress={() => {confirmMatch(item)}}/>
                  </View>
                </ListItem>
              )}
            />
          </TabView.Item >

          <TabView.Item style={styles.tabView}>
          <FlatList
              data={accepted}
              renderItem={({item}) => (
                <ListItem bottomDivider>
                  <Avatar rounded source={{uri: item.photos[0]}} size={60} />
                  <ListItem.Content>
                    <ListItem.Title style={styles.name}>{item.dog_name}</ListItem.Title>
                    <ListItem.Subtitle onPress={() => {
                      setCurrentMatch({
                        matchId: item.match_id,
                        userId: item.dog1_id,
                        dogName: dogName,
                        userPhoto: userPhoto,
                        matchedDog: item.dog_name,
                        matchedPhoto: item.photos[0]
                      }); toggleChat();
                    }}
                    >Test message
                    </ListItem.Subtitle>
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

{/* <FlatList
data={matched}
renderItem={({item}) => (
  <ListItem bottomDivider>
    <Avatar rounded source={{uri: item.avatar}} size={60} />
    <ListItem.Content>
      <ListItem.Title style={styles.name}>{item.name}</ListItem.Title>
      <ListItem.Subtitle onPress={() =>{toggleChat(); setChatData({
          uri: item.avatar,
          name: item.name,

      })}}>{item.message}</ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>
)}
/> */}