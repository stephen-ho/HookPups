import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useRoute } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import CustomInput from '../../components/SignIn/CustomInput.js';
import CustomButton from '../../components/SignIn/CustomButton.js';
import CustomDropdownMenu from '../../components/Profiles/CustomDropdownMenu';
import UploadImages from '../../components/Profiles/UploadImages.js'
import dogBreed from '../../assets/data/dogBreed.js'
const _ = require('lodash');

const DogProfileInputScreen = () => {
  const route = useRoute();
  const [display_name, setDisplayName] = useState('');
  const [dog_name, setDogName] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState('');
  const [age, setAge] = useState('');
  const [personality, setPersonality ] = useState('');
  const [preferrence, setPreferrence ] = useState('');
  const [zipcode, setZipcode] = useState(0);
  const [images, setImages] = useState([]);

  const [breedSelection, setBreedSelection] = useState([]);
  const genderSelection = ['Male', 'Female'];
  const sizeSelection = ['Tiny', 'Small', 'Medium', 'Large', 'Huge'];
  const ageSelection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
  const personalitySelection = ['Adaptable', 'Aggressive', 'Calm', 'Confident', 'Independent', 'Insecure', 'Mild', 'Outgoing'];
  const preferrenceSelection = ['All dog', 'Small Dogs', 'Large Dogs', 'Just People'];

  const navigation = useNavigation();

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

  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setImages((photo) => ([...photo, result.uri]));
    }
  };

  const submitProfile = () => {
    let info = {
      owner_name: route.params.email,
      display_name: display_name,
      dog_name: dog_name,
      breed: breed,
      size: size,
      age: age,
      gender: gender,
      personality: personality,
      description: description,
      zipcode: zipcode,
      photos: images
    }
    console.log('what was enter: ', info);

    // axios request to post data

    // navigation.navigate('MainScreen');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>
          About You and Your Dog
        </Text>

        <UploadImages images={images} addImage={addImage}/>

        <CustomInput
          placeholder='Your name'
          value={display_name}
          setValue={setDisplayName}
          autoCapitalize='none'
        />

        <CustomInput
          placeholder="Your dog's name"
          value={dog_name}
          setValue={setDogName}
        />

        <View style={styles.bioContainer}>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder='Please tell us something about your dog...'
            autoCapitalize="none"
            multiline
            style={styles.input}
          />
        </View>

        <CustomDropdownMenu
          data={genderSelection}
          defaultButtonText={'Gender'}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            return setGender(selectedItem);
          }}
        />
        <CustomDropdownMenu
          data={breedSelection}
          defaultButtonText={'Breed'}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            return setBreed(selectedItem);
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
        <CustomDropdownMenu
          data={ageSelection}
          defaultButtonText={'Age'}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            return setAge(selectedItem);
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
          data={preferrenceSelection}
          defaultButtonText={'We Get Along With'}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            return setPreferrence(selectedItem);
          }}
        />
        <CustomInput
          placeholder='Zip Code'
          value={zipcode}
          setValue={setZipcode}
          maxLength={5}
          keyboardType='number-pad'
        />
        <CustomButton
          text='Submit'
          onPress={submitProfile}
        />
      </View>
    </ScrollView>
  )
}

export default DogProfileInputScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 40,
    marginBottom: 20,
    alignItems: 'center',
    top: 40,
    backgroundColor: '#BDE0FE'
  },
  title: {
    color: '#716F81',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20,
  },
  bioContainer: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    height: 100
  },
  input: {
    textAlignVertical: 'top'
  }
});