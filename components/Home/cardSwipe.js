import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Dimensions, Image, StyleSheet, View, Alert, Modal, Pressable, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import { AntDesign, Feather } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import CardsSwipe, {CardsSwipeRefObject} from 'react-native-cards-swipe';
import { useRoute } from '@react-navigation/native';
import CustomDropdownMenu from '../Profiles/CustomDropdownMenu.js';
import dogBreed from '../../assets/data/dogBreed.js'
const _ = require('lodash');
import { IOS_BANNER, IOS_APP_ID } from '../../config.js'

export default function CardSwipe (props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState({});
  const [visible, setIsVisible] = useState(true);
  const [images, setImages] = useState([]);
  const width = Dimensions.get('window').width;
  const [dogs, setDogs] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [personality, setPersonality ] = useState('');
  const [breed, setBreed] = useState('');
  const [breedSelection, setBreedSelection] = useState([]);
  const [size, setSize] = useState('');

  const swiper = useRef(null);

  // console.log('what is in card swip: ', props.route.params);
  const sizeSelection = ['Tiny', 'Small', 'Medium', 'Large', 'Huge'];
  const personalitySelection = ['Adaptable', 'Aggressive', 'Calm', 'Confident', 'Independent', 'Insecure', 'Mild', 'Outgoing'];

  const owner_name = props.route.params.user;
  const dogName = props.route.params.dog.dog_name;
  // const personality = 'Calm';
  // const breed = 'French Bulldog';
  const params = { personality: personality, breed: breed, size: size }


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

  // async function fetchData () {
  //   const results = await axios.get(`http://54.219.129.63:3000/description/unmatched/${owner_name}/${dogName}`)
  //   await setDogs(results.data);
  //   setLoading(false);
  // }

  async function fetchData () {
    const results = await axios({
      method: 'get',
      url: `http://54.219.129.63:3000/description/unmatched/${owner_name}/${dogName}`,
      params: params
    })
    await setDogs(results.data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchData();

    for (let key in dogBreed) {
      if (dogBreed[key].length === 0) {
        setBreedSelection((list) => ( [...list, _.capitalize(key)] ))
      } else {
        dogBreed[key].forEach((type) => {
          setBreedSelection((list) => (
            [...list, `${_.capitalize(type)} ${_.capitalize(key)}`]
          ))
          });
      }
    }
  }, [])

  _renderItem = ({item, index}) => {
    return (
        <View style={styles.slide}>
            <Text style={styles.title}>{ item.title }</Text>
        </View>
    );
  }

  async function handleRight (index) {
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

  function handlePress (card) {
    setModalVisible(true);
    setCurrentCard(card);
  };

  function handleMenuPress () {
    setMenuModalVisible(true);
  }

  async function handleCloseMenu () {
    setMenuModalVisible(!menuModalVisible);
    setLoading(true);
    await fetchData();
    setLoading(false);
  }

  async function handleResetFilters () {
    await setBreed('');
    await setPersonality('');
    await setSize('');
    setLoading(true);
    setMenuModalVisible(!menuModalVisible);
    await fetchData();
    setLoading(false);
  }

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setMenuModalVisible(!menuModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.menuModalView}>

            <Text style={styles.menuModalText}>Filter Results by Preferences</Text>
            <CustomDropdownMenu
              data={breedSelection}
              defaultButtonText={'Breed'}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                return setBreed(selectedItem);
              }}
            />
            <CustomDropdownMenu
              data={personalitySelection}
              defaultButtonText={'Personality'}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                return setPersonality(selectedItem);
              }}
            />
            <CustomDropdownMenu
              data={sizeSelection}
              defaultButtonText={'Size'}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                return setSize(selectedItem);
              }}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleCloseMenu}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleResetFilters}
            >
              <Text style={styles.textStyle}>Reset Filters</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <CardsSwipe
        ref={swiper}
        cards={dogs}
        cardContainerStyle={styles.cardContainer}
        onSwipedRight={handleRight}
        renderCard={(card) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.h1} onPress={() => handlePress(card)}>{card.dog_name}</Text>
                <Feather style={styles.headerMenu} name="menu" size={30} color="black" onPress={handleMenuPress}/>
              </View>
              <Image
                style={styles.cardImg}
                source={{ uri: card.photos[0] }}
              />
            </View>
          )
        }
      />
      <View style={styles.icons}>

        <TouchableOpacity
          onPress={() => {
            if (swiper.current) swiper.current.swipeLeft();
          }}
        >
          <Feather style={styles.icon} name="x-circle" size={50} color="#937DC2"/>
        </TouchableOpacity>

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
                autoPlay={true}
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
            <View style={styles.profileInfoContainer}>
              <View style={styles.profileInfo}>
                <Text style={styles.infoTitle}>Breed: </Text>
                <Text style={styles.infoDesc}>{currentCard.breed}</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.infoTitle}>Age: </Text>
                <Text style={styles.infoDesc}>{currentCard.age}</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.infoTitle}>Size: </Text>
                <Text style={styles.infoDesc}>{currentCard.size}</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.infoTitle}>Personality: </Text>
                <Text style={styles.infoDesc}>{currentCard.personality}</Text>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.infoTitle}>Bio: </Text>
                <Text style={styles.infoDesc}>{currentCard.description}</Text>
              </View>
            </View>
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
  } else {
  return (
    <View style={styles.errorScreen}>
      <Image source={{ uri: 'https://brokeassstuart.com/wp-content/pictsnShit/2014/08/Sad-Dog-Cute-Broke-Ass-Stuart-NYC-1200x800.jpg' }} style={styles.errImg}/>
      <Text style={styles.errText}>Sorry, we can't find any unmatched dogs in your area</Text>
    </View>
  )
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
  menuIcon: {
    position: 'relative',
    top: 50,
  },
  cardContainer: {
    width: '92%',
    height: '75%',
    backgroundColor: '#d9edff'
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerMenu: {
    padding: 10,
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
  profileInfoContainer: {
    width: '85%',
    paddingBottom: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    paddingBottom: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    paddingRight: 10
  },
  infoDesc: {
    fontSize: 18,
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
  menuModalView: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    height: '55%',
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
  menuModalText: {
    paddingBottom: 15,
    fontSize: 20,
    fontWeight: '500',
  },
  button: {
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    margin: 5,
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