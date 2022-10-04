import React, { useState } from 'react';
import { Dimensions, Image, StyleSheet, View, Alert, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Text, Card, Button } from '@rneui/themed';
import { AntDesign, Feather } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import CardsSwipe from 'react-native-cards-swipe';

const Dogs = [
  { name: 'Majesty', src: require('../../photos/majesticdog.jpeg'), photos: ['https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRabjk51qPq_AYTpKg-YuDOopdf1WN2XnmqbiXMKH7CliUzkqDqUEJv0v22V5JjHrVGK8A&usqp=CAU'], age: 6, size: 'Large', temperament: 'Calm', bio: 'Loves to play with other dogs. Very friendly with kids'},
  { name: 'Hero', src: require('../../photos/hero_dog.png') },
  { name: 'Cutie', src: require('../../photos/cutedog.jpeg') },
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


export default function CardSwipe () {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentCard, setCurrentCard] = useState({});
  const [visible, setIsVisible] = useState(true);
  const [images, setImages] = useState([]);
  const width = Dimensions.get('window').width;

  _renderItem = ({item, index}) => {
    return (
        <View style={styles.slide}>
            <Text style={styles.title}>{ item.title }</Text>
        </View>
    );
  }

  function handlePress (card) {
    setModalVisible(true);
    setCurrentCard(card);
    console.log(currentCard.photos)

    // setImages(card.photos.map((photo) => {
    //   return ({uri: photo});
    // }))

    // console.warn(images);
  };

  return (
    <>
    <View style={styles.container}>
      <CardsSwipe
        cards={Dogs}
        cardContainerStyle={styles.cardContainer}
        onSwipedLeft={handleLeft}
        onSwipedRight={handleRight}
        renderCard={(card) => (
          <View style={styles.card}>
            <Text style={styles.h1} onPress={() => handlePress(card)}>{card.name}</Text>
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
            <Text style={styles.modalText}>Age: {currentCard.age}</Text>
            <Text style={styles.modalText}>Size: {currentCard.size}</Text>
            <Text style={styles.modalText}>Temperament: {currentCard.temperament}</Text>
            <Text style={styles.modalText}>Bio: {currentCard.bio}</Text>
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
  },
  cardContainer: {
    width: '92%',
    height: '75%',
    backgroundColor: '#f2f2f2',
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
    marginTop: 22
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    height: '85%',
    width: '100%',
    margin: 0,
    backgroundColor: "white",
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    backgroundColor: "#2196F3",
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
  }
});