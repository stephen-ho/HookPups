import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Dimensions, Image, StyleSheet, View, Alert, Modal, Pressable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import { AntDesign, Feather } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import CardsSwipe, {CardsSwipeRefObject} from 'react-native-cards-swipe';
import { useRoute } from '@react-navigation/native';

export default function CardSwipe (props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState({});
  const [visible, setIsVisible] = useState(true);
  const [images, setImages] = useState([]);
  const width = Dimensions.get('window').width;
  const [dogs, setDogs] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const swiper = useRef(null);
  // const [currentUser, setCurrentUser] = useState({});

  console.log('what is in card swip: ', props.route.params);

  const owner_name = props.route.params.user;
  const dogName = props.route.params.dog.dog_name;

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

  async function fetchData () {
    const results = await axios.get(`http://54.219.129.63:3000/description/unmatched/${owner_name}/${dogName}`)
    await setDogs(results.data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [])

  _renderItem = ({item, index}) => {
    return (
        <View style={styles.slide}>
            <Text style={styles.title}>{ item.title }</Text>
        </View>
    );
  }


  async function handleRight (index) {
    console.log('Index: ', index);
    console.log('Current Owner Name: ', dogs[index].owner_name);
    console.log('Current User: ', currentUser);
    await axios.post('http://54.219.129.63:3000/matches', {
      dog1_name: dogName,
      dog2_name: dogs[index].dog_name,
      owner1_name: owner_name,
      owner2_name: dogs[index].owner_name,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
    fetchData();
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

if (isLoading === false && dogs.length !== 0) {

  return (
    <>
    <View style={styles.container}>
      <CardsSwipe
        ref={swiper}
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

        {/* <Button type="clear" onPress={handleNext}>
          <Feather style={styles.icon} name="x-circle" size={50} color="#937DC2"/>
        </Button> */}
        <TouchableOpacity
          onPress={() => {
            if (swiper.current) swiper.current.swipeLeft();
          }}
        >
          <Feather style={styles.icon} name="x-circle" size={50} color="#937DC2"/>
        </TouchableOpacity>
        {/* <Button type="clear" onPress={handleLike}>
          <AntDesign style={styles.icon} name="heart" size={50} color="#FFAFCC"/>
        </Button> */}
        <TouchableOpacity
          onPress={() => {
            if (swiper.current) swiper.current.swipeRight();
          }}
        >
          <AntDesign style={styles.icon} name="heart" size={50} color="#FFAFCC"/>
        </TouchableOpacity>
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
  return (
    <View style={styles.errorScreen}>
      <Image source={{ uri: 'https://brokeassstuart.com/wp-content/pictsnShit/2014/08/Sad-Dog-Cute-Broke-Ass-Stuart-NYC-1200x800.jpg' }} style={styles.errImg}/>
      <Text style={styles.errText}>Sorry, we can't find any unmatched dogs in your area</Text>
    </View>
  )
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
    padding: 15,
  },
  icon: {
    paddingHorizontal: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d9edff'
  },
  cardContainer: {
    width: '92%',
    height: '75%',
    backgroundColor: '#d9edff'
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
  },
  errorScreen: {
    backgroundColor: '#d9edff',
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
  },
  errImg: {
    height: 200,
    width: '90%',
    borderRadius: 15,
  },
  errText: {
    fontSize: 20,
    fontWeight: '700',
    padding: 20,
  }
});