import { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Image } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export default function Chat ({ toggleChat }) {
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
      <View style={styles.banner}>
        <Ionicons name="chevron-back" size={30} color="black" onPress={toggleChat} style={styles.back}/>
        <View style={styles.profile}>
          <Image
            rounded
            style={styles.profileImg}
            source={{uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/small-white-dog-breeds-cover-1560293099.jpg'}}
          />
          <Text style={{fontSize: 10}}>Mochi</Text>
        </View>
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
