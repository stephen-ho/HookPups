import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { auth, db } from '../firebase.js';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Image } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function Chat ({ toggleChat, currentMatch }) {
  const [messageList, setMessageList] = useState([])
  const [text, setText] = useState('')

  useLayoutEffect(() => {
    const unsubscribe = db.collection(`room: ${currentMatch.matchId}`)
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => setMessageList(
      snapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      }))
    ));
    return unsubscribe;
  }, [])

  const onSend = useCallback((messageList = []) => {
      setMessageList(previousMessages => GiftedChat.append(previousMessages, messageList))
      const { _id, createdAt, text, user } = messageList[0]
      db.collection(`room: ${currentMatch.matchId}`).add({_id, createdAt, text, user})
    }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#A63CA3',
          },
          left: {
            backgroundColor: '#FF80AE',
          },
        }}
        textStyle={{
          left: {
            color: 'white',
          },
        }}
      />

    );
  };

  const renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderColor: "gray",
          borderWidth: 0.5,
          borderRadius: 20,
          height: 40,
          margin: 5,
        }}
      />
    );
  };

  const renderSend = (props) => {
    return (
      <Send {...props}
        containerStyle={{ borderWidth: 0 }}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={32} color="#A63CA3" />
        </View>
      </Send>
    );
  }

  return (
    <>
      <View style={styles.banner}>
        <Ionicons name="chevron-back" size={30} color="black" onPress={toggleChat} style={styles.back}/>
        <View style={styles.profile}>
          <Image
            rounded
            style={styles.profileImg}
            source={{uri: currentMatch.matchedPhoto}}
          />
          <Text style={{fontSize: 10}}>{currentMatch.matchedDog}</Text>
        </View>
      </View>
      <GiftedChat
        timeTextStyle={{ left: { color: 'white' }}}
        messages={messageList}
        onSend={message => onSend(message)}
        user={{
          _id: currentMatch.userId,
          name: currentMatch.dogName,
          avatar: currentMatch.userPhoto,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        alwaysShowSend
        showUserAvatar
        showAvatarForEveryMessage={true}
      />
    </>

  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'column',
  },

  banner: {
    height: 80,
    backgroundColor: 'rgba(211, 211, 211, 0.3)',
    borderBottomColor: '#A2D2FF',
    borderBottomWidth: 1,
  },

  back: {
    paddingTop: 30,
    zIndex: 3,
  },

  profile: {
    alignItems: 'center',
    top: -40,
  },

  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },

  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  messages: {
    backgroundColor: '#BDE0FE',
    height: 445,
  },

  inputContainer: {
    height: 63.5,
    backgroundColor: '#A2D2FF',
    justifyContent: 'center',
  },

  input: {
    height: 30,
    width: 250,
    backgroundColor: '#FFF',
    borderRadius: 15,
    background: 'transparent',
    shadowColor: '#171717',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },

  navbar: {
    height: 63.5,
    backgroundColor: '#A2D2FF',
    justifyContent: 'center',
  }

});
