import React from 'react';
import { View, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import { AntDesign, Feather } from '@expo/vector-icons';

function Home () {

  const SCREEN_HEIGHT = Dimensions.get('window').height
  const SCREEN_WIDTH = Dimensions.get('window').width

  const photoUrl = '../profile.png';
  const name = 'Fido';

  const Dogs = [
    { id: "1", uri: require('../../photos/majesticdog.jpeg') },
    { id: "2", uri: require('../../photos/hero_dog.png') },
    { id: "3", uri: require('../../photos/cutedog.jpeg') },
  ]

  renderFoods = () => {
    return Dogs.map((item, i) => {
       return (
         <Animated.View
           style={{
             height: SCREEN_HEIGHT - 120,
             width: SCREEN_WIDTH,
             padding: 10
           }}
         >
           <Image
             style={{
               flex: 1,
               height: null,
               width: null,
               resizeMode: "cover",
               borderRadius: 20
             }}
             source={item.uri}
           />
         </Animated.View>
       );
    });
  };

  return (
    <>
      {/* <Card>
        <Text style={styles.h1}>{name}</Text>
          <Image
              source={require('../../photos/majesticdog.jpeg')}
              style={{ width: 300, height: 400 }}
          />
      </Card> */}

      <View style={{ flex: 1 }}>
        <View style={{ height: 60 }} />
        <View style={{ flex: 1 }}>
          <Animated.View
            style={[
              {
                height: SCREEN_HEIGHT - 120,
                width: SCREEN_WIDTH,
                padding: 10
              }
            ]}
          >
            <Image
              style={{
                flex: 1,
                height: null,
                width: null,
                resizeMode: "cover",
                borderRadius: 20
              }}
              source={Dogs}
            />
          </Animated.View>
        </View>
        <View style={{ height: 60 }} />
      </View>


      <View style={styles.icons}>
        <Feather style={styles.icon} name="x-circle" size={50} color="black" />
        <AntDesign style={styles.icon} name="hearto" size={50} color="black" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 35,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    paddingHorizontal: 50,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: '92%',
    height: '70%',
  },
  card: {
    width: '100%',
    height: '100%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.3,
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
  },
});

export default Home;