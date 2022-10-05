import React from 'react';
import { Image, StyleSheet, View, Alert } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import CardsSwipe from 'react-native-cards-swipe';

const Dogs = [
  { src: require('../../photos/majesticdog.jpeg') },
  { src: require('../../photos/hero_dog.png') },
  { src: require('../../photos/cutedog.jpeg') },
]

function handleLeft () {
  Alert.alert(
    "Swiped Left",
    "",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );
}

function handleRight () {
  Alert.alert(
    "Swiped Right",
    "",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );
}

function handleLike () {
  Alert.alert(
    "Liked",
    "",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );
}

function handleNext () {
  Alert.alert(
    "Next",
    "",
    [
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );
}

export default function CardSwipe (props) {
  // const route = useRoute();
  console.log('what is in card swip: ', props.route.params)
  // console.log("what is in cardswip: ", this.props.route.params.value )
  return (
    <View style={styles.container}>
      <CardsSwipe
        cards={Dogs}
        cardContainerStyle={styles.cardContainer}
        onSwipedLeft={handleLeft}
        onSwipedRight={handleRight}
        renderCard={(card) => (
          <View style={styles.card}>
            <Text style={styles.h1}>Dog Name</Text>
            <Image
              style={styles.cardImg}
              source={card.src}
            />
          </View>
        )}
      />
      <View style={styles.icons}>
        <Button type="clear" onPress={handleNext}>
          <Feather style={styles.icon} name="x-circle" size={50} color="#A2D2FF"/>
        </Button>
        <Button type="clear" onPress={handleLike}>
          <AntDesign style={styles.icon} name="hearto" size={50} color="#FFAFCC"/>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 35,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    paddingHorizontal: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: '92%',
    height: '75%',
    backgroundColor: 'white',
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
    borderRadius: 15,
  },
});