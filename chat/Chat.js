import { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import Message from './Message.js';

export default function Chat () {
  const [messageList, setMessageList] = useState([])
  const [text, setText] = useState('')
  useEffect(() => {
    setMessageList([
      {
        _id: 5,
        text: 'no',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 5,
          name: 'React Client',
          avatar: 'https://placeimg.com/140/140/any',
        },
      }
    ])
  }, [])
  // connect to websocket
  // create handleTextInput function to handle typing
  // create send function
  const onSend = useCallback((messageList = []) => {
    setMessageList(previousMessages => GiftedChat.append(previousMessages, messageList))
  })

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#DCB4DB',
            marginBottom: 5,
          },
          left: {
            backgroundColor: '#FFAFCC',
            marginBottom: 5,
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
          <IconButton icon="send-circle" size={32} color="#DCB4DB" />
        </View>
      </Send>
    );
  }

  return (
    <>
      <View style={styles.profile}>
        <Text>profile goes here</Text>
      </View>
      <GiftedChat
        timeTextStyle={{ left: { color: 'white' }}}
        messages={messageList}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          avatar: 'https://placeimg.com/140/140/any'
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        alwaysShowSend
        showUserAvatar
      />
      <View style={styles.navbar}>
        <Text>Navbar goes here</Text>
      </View>
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
