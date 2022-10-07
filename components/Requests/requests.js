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
  const [standard, setStandard] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [currentMatch, setCurrentMatch] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const owner_name = props.route.params.user;
  const dogName = props.route.params.dog.dog_name;
  const userPhoto = props.route.params.dog.photos[0];

  const toggleChat = () => {
    setIsChat(!isChat);
  }

  async function fetchData () {
    const response = await axios.get(`http://54.219.129.63:3000/matches/${owner_name}/${dogName}/pending`)
    setPending(response.data)
    const res = await axios.get(`http://54.219.129.63:3000/matches/${owner_name}/${dogName}/confirmed`)
    filter(res.data);

  }

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, [])

  const filter = (accepted) => {
    let tempStandard = [];
    for (let i = 0; i < accepted.length; i++) {
      if (accepted[i].dog1_owner === owner_name) {
        // setStandard((standard) => [...standard, accepted[i]])
        tempStandard = [...tempStandard, accepted[i]];
      } else {
        const restructure = {'match_id': accepted[i].match_id};

        const temp1 = accepted[i].dog1_id;
        const temp2 = accepted[i].dog1_dog;
        const temp3 = accepted[i].dog1_owner;
        const temp4 = accepted[i].dog1_photos;
        restructure['dog1_id'] = accepted[i].dog2_id;
        restructure['dog2_id'] = temp1;
        restructure['dog1_dog'] = accepted[i].dog2_dog;
        restructure['dog2_dog'] = temp2;
        restructure['dog1_owner'] = accepted[i].dog1_owner;
        restructure['dog2_owner'] = temp3;
        restructure['dog1_photos'] = accepted[i].dog2_photos;
        restructure['dog2_photos'] = temp4;
        // setStandard((standard) => [...standard, restructure]);
        tempStandard = [...tempStandard, restructure];
      }
    }
    setStandard(tempStandard);
  }

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
            .then((response) => { filter(response.data); } )
            .catch((err) => {console.log('Error getting confirmed matches')})
        })
        .catch((err) => {console.log('Error getting pending matches after confirming match')})
      })
      .catch((err) => {console.log('Error confirming match')})
  }

  const declineMatch = (matchInfo) => {
    const match = {
      "dog2_name": matchInfo.dog_name,
      "owner2_name": matchInfo.owner_name
    }

    axios.delete(`http://54.219.129.63:3000/matches/${owner_name}/${dogName}`, match)
      .then(() => {
        axios.get(`http://54.219.129.63:3000/matches/${owner_name}/${dogName}/pending`)
        .then((response) => {
          setPending(response.data)
        })
        .catch((err) => {
          console.log('error fetching pending dogs after deleting')
        })
      })
      .catch((err) => {console.log('Error confirming match')})
  }

  if (!isLoading) {
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
                      <AntDesign name="closecircle" size={24} color="#FF5733" onPress={() => {declineMatch(item)}}/>
                      <AntDesign name="checkcircle" size={24} color="#0BDA51" style={styles.closecircle} onPress={() => {confirmMatch(item)}}/>
                    </View>
                  </ListItem>
                )}
              />
            </TabView.Item >

            <TabView.Item style={styles.tabView}>
            <FlatList
                data={standard}
                renderItem={({item}) => (
                  <ListItem bottomDivider onPress={() => {
                    setCurrentMatch({
                      matchId: item.match_id,
                      userId: item.dog1_id,
                      dogName: dogName,
                      userPhoto: userPhoto,
                      matchedDog: item.dog2_dog,
                      matchedPhoto: item.dog2_photos[0]
                    }); toggleChat();
                  }}>
                    <Avatar rounded source={{uri: item.dog2_photos[0]}} size={60} />
                    <ListItem.Content>
                      <ListItem.Title style={styles.name}>{item.dog2_dog}</ListItem.Title>
                      <ListItem.Subtitle>Test message
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
  } else {
    return (<Text>Loading</Text>)
  }
}

export default Request;
//hello
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
