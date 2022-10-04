import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import CustomInput from '../../components/SignIn/CustomInput.js';
import CustomButton from '../../components/SignIn/CustomButton.js';
import CustomDropdownMenu from '../../components/Profiles/CustomDropdownMenu';
import UploadImage from '../../components/Profiles/UploadImage.js'

const OwnerProfileInputScreen = () => {
  const [ownerPic, setOwnerPic] = useState('');
  const [owner_name, setOwnerName] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const genderSelection = ['Male', 'Female'];

  const navigation = useNavigation();

  const checkDuplicate = (value) => {
    // axios request to database to see if username is available
  }

  const saveOwnerProfile = () => {

  }

  const addADog = () => {
    navigation.navigate('DogProfile')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>
          About you
        </Text>

        <UploadImage />

        <CustomInput
          placeholder='Your name'
          value={owner_name}
          setValue={setOwnerName}
          autoCapitalize='none'
        />
        <CustomDropdownMenu
          data={genderSelection}
          defaultButtonText={'Gender'}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            return setGender(selectedItem);
          }}
        />
        <CustomInput
          placeholder='Zip Code'
          value={location}
          setValue={setLocation}
          maxLength={5}
          keyboardType='number-pad'
        />

        <CustomButton
          text='Save'
          onPress={saveOwnerProfile}
        />

        <CustomButton
          text='Add a dog'
          onPress={addADog}
          type='EMPTY'
        />

      </View>
    </ScrollView>
  )
}

export default OwnerProfileInputScreen;

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