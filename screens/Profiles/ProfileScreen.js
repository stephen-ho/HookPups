import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Image, Dimensions, TouchableOpacity, SafeAreaView, Modal, Alert, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Carousel from 'react-native-reanimated-carousel';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import CustomButtonSmall from '../../components/Profiles/CustomButtonSmall.js';
import CustomInput from '../../components/SignIn/CustomInput.js';
import CustomButton from '../../components/SignIn/CustomButton.js';
import CustomDropdownMenu from '../../components/Profiles/CustomDropdownMenu';
import UploadImages from '../../components/Profiles/UploadImages.js';
import dogBreed from '../../assets/data/dogBreed.js';
const axios = require('axios');
const urlLink = 'http://54.219.129.63:3000';
const _ = require('lodash');

const ProfileScreen = (props) => {
  console.log('props on profile screen: ', props.route.params.user);
  console.log('props on profile screen: ', props.route.params.dog);
  const info = props.route.params.dog;
  // const [info, setInfo] = useState(props.route.params.dog);
  const [dog_name, setDogName] = useState(info.dog_name);
  const [description, setDescription] = useState(info.description);
  const [gender, setGender] = useState(info.gender);
  const [breed, setBreed] = useState(info.breed);
  const [size, setSize] = useState(info.size);
  const [age, setAge] = useState(info.age);
  const [personality, setPersonality ] = useState(info.personality);
  const [zipcode, setZipcode] = useState(info.zipcode);
  const [photos, setPhotos] = useState(props.route.params.dog.photos);

  const [modalVisible, setModalVisible] = useState(false);
  const [breedSelection, setBreedSelection] = useState([]);
  const genderSelection = ['Male', 'Female'];
  const sizeSelection = ['Tiny', 'Small', 'Medium', 'Large', 'Huge'];
  const ageSelection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  const personalitySelection = ['Adaptable', 'Aggressive', 'Calm', 'Confident', 'Independent', 'Insecure', 'Mild', 'Outgoing'];

  const navigation = useNavigation();
  const width = Dimensions.get('window').width;

  useEffect (() => {
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
  }, []);

  const clickEdit = () => {
    setModalVisible(true);
  }

  const clickLogOut = () => {
    navigation.navigate('SignIn');
  }

  const clickModalSave = () => {
    console.log('got clicked')
  }

  const addMorePhotos = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setPhotos((photo) => ([...photo, result.uri]));
    }
  }

  const submitChanges = () => {
    console.log('submit changes');
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#d9edff'}}>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
     <Text style={styles.title}>
        My Profile
      </Text>
      <View style={styles.imageContainer}>
      <Carousel
        loop
        width={width * 1}
        // height={width / 1.75}
        autoPlay={false}
        data={info.photos}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ item }) => {
          return (
              <Image style={styles.image} source={{ uri: item }} resizeMode='cover' resizeMethod='auto'/>
          )
        }}
      />
      </View>

      <View><Text>{info.dog_name}</Text></View>
      <View><Text>{info.breed}</Text></View>
      <View><Text>{info.size}  |  {info.age} years old  |   {info.gender}</Text></View>
      <View><Text>{info.personality}</Text></View>
      <View><Text>{info.zipcode}</Text></View>
      <View><Text>{info.description}</Text></View>

      <View style={styles.btnContainer}>
        <CustomButtonSmall
          text='Edit Profile'
          onPress={clickEdit}
        />
        <CustomButtonSmall
          text='Log out'
          bgColor='#FFC8DD'
          onPress={clickLogOut}
        />
      </View>

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
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderContent}></View>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <AntDesign name="closecircleo" size={20} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <UploadImages images={photos} addImage={addMorePhotos} />
              <CustomInput
                value={dog_name}
                setValue={setDogName}
              />
              <View style={styles.bioContainer}>
                <TextInput
                  value={description}
                  onChange={setDescription}
                  autoCapitalize="none"
                  multiline
                  style={styles.input}
                />
              </View>
              <CustomDropdownMenu
                data={genderSelection}
                defaultValue={gender}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                  return setGender(selectedItem);
                }}
              />
              <CustomDropdownMenu
                data={breedSelection}
                defaultValue={breed}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                  return setBreed(selectedItem);
                }}
              />
              <CustomDropdownMenu
                data={sizeSelection}
                defaultValue={size}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                  return setSize(selectedItem);
                }}
              />
              <CustomDropdownMenu
                data={ageSelection}
                defaultValue={age}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                  return setAge(selectedItem);
                }}
              />
              <CustomDropdownMenu
                data={personalitySelection}
                defaultValue={personality}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                  return setPersonality(selectedItem);
                }}
              />
              <CustomInput
                value={zipcode}
                setValue={setZipcode}
                maxLength={5}
                keyboardType='number-pad'
              />
              <CustomButton
                text='Save'
                onPress={submitChanges}
              />
            </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height,
    paddingTop: 20,
    paddingBottom: 30,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#d9edff'
  },
  title: {
    color: '#716F81',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    height: '35%',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%'
  },
  btnContainer: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    height: '88%',
    width: '100%',
    margin: 20,
    backgroundColor: "#EEF1FF",
    borderRadius: 20,
    padding: 20,
    paddingLeft: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalContent: {
    flex: 1,
    alignItems: 'center'
  },
  modalHeader: {
    flexDirection: "row",
  },
  /* The header takes up all the vertical space not used by the close button. */
  modalHeaderContent: {
    flexGrow: 1,
  },
  bioContainer: {
    backgroundColor: 'white',
    width: '70%',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    height: 100
  },
  input: {
    textAlignVertical: 'top'
  }
});