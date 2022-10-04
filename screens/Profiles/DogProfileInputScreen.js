import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import CustomInput from '../../components/SignIn/CustomInput.js';
import CustomButton from '../../components/SignIn/CustomButton.js';
import CustomDropdownMenu from '../../components/Profiles/CustomDropdownMenu';
import UploadImage from '../../components/Profiles/UploadImage.js'

const DogProfileInputScreen = () => {
  const [dog_name, setDogName] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState('');
  const [personality, setPersonality ] = useState('');
  const [breedSelection, setBreedSelection] = useState([]);
  const genderSelection = ['Male', 'Female'];
  const sizeSelection = ['Tiny', 'Small', 'Medium', 'Large', 'Huge'];


  useEffect (() => {
    // get breed from api
  }, []);

  const checkDuplicate = (value) => {
    // axios request to database to see if username is available
  }

  const saveOwnerProfile = () => {

  }

  const addADog = () => {

  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>
          About Your Dog
        </Text>

        <UploadImage />

        <CustomInput
          placeholder="Your dog's name"
          value={dog_name}
          setValue={setDogName}
        />

        <CustomDropdownMenu
          data={genderSelection}
          defaultButtonText={'Gender'}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            return setGender(selectedItem);
          }}
        />
        {/* <CustomInput
          placeholder='Zip Code'
          value={zipCode}
          setValue={setZipCode}
          maxLength={5}
          keyboardType='number-pad'
        /> */}

        <CustomButton
          text='Submit'
          onPress={saveOwnerProfile}
        />

      </View>
    </ScrollView>
  )
}

export default DogProfileInputScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    top: 40,
    backgroundColor: '#BDE0FE',
    height: Dimensions.get('window').height
  },
  title: {
    color: '#716F81',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 20,
  }
});