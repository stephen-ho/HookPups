import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dimensions, Image, StyleSheet, View, Alert, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import { AntDesign, Feather } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import CardsSwipe from 'react-native-cards-swipe';

// const Dogs = [
//   { name: 'Majesty', src: require('../../photos/majesticdog.jpeg'), photos: ['https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRabjk51qPq_AYTpKg-YuDOopdf1WN2XnmqbiXMKH7CliUzkqDqUEJv0v22V5JjHrVGK8A&usqp=CAU'], age: 6, size: 'Large', temperament: 'Calm', bio: 'Loves to play with other dogs. Very friendly with kids'},
//   { name: 'Hero', src: require('../../photos/hero_dog.png') },
//   { name: 'Cutie', src: require('../../photos/cutedog.jpeg') },
// ]


// function handleRight () {
//   axios.post('http://54.219.129.63:3000/matches', {
//     dog1_name: ,
//     dog2_name: ,
//     owner1_name: ,
//     owner2_name: ,
//   })
// }

// function handleLike () {
//   Alert.alert(
//     "Liked",
//     "",
//     [
//       { text: "OK", onPress: () => console.log("OK Pressed") }
//     ]
//   );
// }

// function handleNext () {
//   Alert.alert(
//     "Next",
//     "",
//     [
//       { text: "OK", onPress: () => console.log("OK Pressed") }
//     ]
//   );
// }


export default function CardSwipe () {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState({});
  const [visible, setIsVisible] = useState(true);
  const [images, setImages] = useState([]);
  const width = Dimensions.get('window').width;
  const [dogs, setDogs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // const [currentUser, setCurrentUser] = useState({});
  const currentUser = {
    "dog_id": 4,
    "owner_name": "Justin",
    "display_name": null,
    "dog_name": "Max",
    "breed": "French Bulldog",
    "size": "Small",
    "age": 6,
    "gender": "Male",
    "personality": "Patient",
    "description": "Max is very calm and patient. He loves to wander and meet new friends!",
    "photos": [
        "https://www.loveyourdog.com/wp-content/uploads/2020/05/French-Bulldog-with-Head-Tilted-900x500.jpg",
        "https://doglime.com/wp-content/uploads/2019/02/French-Bulldogs-Temperament-and-Personality.jpg"
    ],
    "zipcode": 92105,
    "address": "undefined"
  };

  useEffect(() => {
    setLoading(true);
    async function fetchData () {
      const results = await axios.get('http://54.219.129.63:3000/description/unmatched/Justin/Max')
      await setDogs(results.data);
      setLoading(false);
    }
    fetchData();
  }, [])

  _renderItem = ({item, index}) => {
    return (
        <View style={styles.slide}>
            <Text style={styles.title}>{ item.title }</Text>
        </View>
    );
  }

  function handleRight (index) {
    console.log('Index: ', index);
    console.log('Current Dog: ', dogs[index]);
    console.log('Current User: ', currentUser);
    // axios.post('http://54.219.129.63:3000/matches', {
    //   dog1_name: currentUser.dog_name,
    //   dog2_name: currentCard.dog_name,
    //   owner1_name: currentUser.owner_name,
    //   owner2_name: currentCard.user_name,
    // })
    // .then((response) => {
    //   console.log(response);
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
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

  function handlePress (card) {
    setModalVisible(true);
    setCurrentCard(card);
    // console.log(dogs)

    // setImages(card.photos.map((photo) => {
    //   return ({uri: photo});
    // }))

    // console.warn(images);
  };

if (isLoading === true) {
  return (
    <>
      <Text>Loading</Text>
    </>
  )
}

if (isLoading === false) {
  return (
    <>
    <View style={styles.container}>
      <CardsSwipe
        cards={dogs}
        cardContainerStyle={styles.cardContainer}
        onSwipedRight={handleRight}
        renderCard={(card) => (
          <View style={styles.card}>
            <Text style={styles.h1} onPress={() => handlePress(card)}>{card.dog_name}</Text>
            <Image
              style={styles.cardImg}
              source={{ uri: card.photos[0] }}
            />
          </View>
        )}
      />
      <View style={styles.icons}>
        <Button type="clear" onPress={handleNext}>
          <Feather style={styles.icon} name="x-circle" size={50} color="#937DC2"/>
        </Button>
        <Button type="clear" onPress={handleLike}>
          <AntDesign style={styles.icon} name="heart" size={50} color="#FFAFCC"/>
        </Button>
      </View>
    </View>
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>


          <View style={{ flex: 1 }}>
            <Carousel
              loop
              width={width * 0.85}
              height={width / 1.75}
              autoPlay={false}
              data={currentCard.photos}
              scrollAnimationDuration={1000}
              onSnapToItem={(index) => console.log('current index:', index)}
              renderItem={({ item }) => {
                const photo = item
                return (
                  <View
                      style={{
                          flex: 1,
                          justifyContent: 'center',
                      }}
                  >
                    <Image style={styles.carouselImg} source={{ uri: item }}/>
                  </View>
                )
              }}
            />
          </View>


            <Text style={styles.modalName}>{currentCard.name}</Text>
            <Text style={styles.modalText}>Breed: {currentCard.breed}</Text>
            <Text style={styles.modalText}>Age: {currentCard.age}</Text>
            <Text style={styles.modalText}>Size: {currentCard.size}</Text>
            <Text style={styles.modalText}>Personality: {currentCard.personality}</Text>
            <Text style={styles.modalText}>Bio: {currentCard.description}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    </>
  );
  }
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 35,
    padding: 10,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  icon: {
    paddingHorizontal: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#bde0fe'
  },
  cardContainer: {
    width: '92%',
    height: '75%',
    backgroundColor: '#bde0fe'
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    height: '85%',
    width: '100%',
    margin: 0,
    backgroundColor: "#FFC8DD",
    padding: 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -10
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    margin: 20,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#937DC2",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalName: {
    fontSize: 35,
    paddingBottom: 5,
  },
  modalText: {
    fontSize: 20,
    paddingBottom: 5,
  },
  carouselImg: {
    height: '100%',
    borderRadius: 10,
  },
  modalBG: {
    height: '100%',
    backgroundColor: 'gray',
  }
});