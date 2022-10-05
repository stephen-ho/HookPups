import { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { auth, db } from '../firebase.js';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';

export default function Chat ({toggleChat}) {
  const [messageList, setMessageList] = useState([])
  const [text, setText] = useState('')

  useLayoutEffect(() => {
    const unsubscribe = db.collection('chats')
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => setMessageList(
      snapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user
      }))
    ))
    return unsubscribe;
  }, [])

  const onSend = useCallback((messageList = []) => {
      setMessageList(previousMessages => GiftedChat.append(previousMessages, messageList))
      const { _id, createdAt, text, user } = messageList[0]
      db.collection('chats').add({_id, createdAt, text, user})
    }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#cdb4db',
          },
          left: {
            backgroundColor: '#FFAFCC',
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
          <IconButton icon="send-circle" size={32} color="#cdb4db" />
        </View>
      </Send>
    );
  }

  return (
    <>
      <View style={styles.profile}>
        <Text onPress={toggleChat}>profile goes here</Text>
      </View>
      <GiftedChat
        timeTextStyle={{ left: { color: 'white' }}}
        messages={messageList}
        onSend={message => onSend(message)}
        user={{
          _id: 1,
          name: 'Matt',
          avatar: 'https://placeimg.com/140/140/any'
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

  profile: {
    height: 75,
    backgroundColor: '#8AC6FF',
    justifyContent: 'center',
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
