import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../../firebase_config.js';
import { createUserWithEmailAndPassword } from "firebase/auth";
import LogoImg from '../../assets/images/hookpupslogo.png';
import Logo from '../../components/Logo.js';
import CustomInput from '../../components/SignIn/CustomInput.js'
import CustomButton from '../../components/SignIn/CustomButton.js';
import SocialSignInButtons from '../../components/SignIn/SocialSignInButtons.js';
import CustomModal from '../../components/SignIn/CustomModal.js';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [emailRepeat, setEmailRepeat] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [signInModal, setSignInModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [errorCode, setErrorCode] = useState('');

  const navigation = useNavigation();

  const onRegisterPressed = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // const user = userCredential.user;
        // console.warn('Account has been successfully created. Please sign in.');
        // console.log('message in the register screen: ', res);
        setSignInModal(!signInModal);
        navigation.navigate('ProfileInput', { email })
      })
      .catch((error) => {
        // console.warn(error.code);
        setErrorCode(error.code);
        setErrorModal(!errorModal);
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  }

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>

      <CustomInput
        placeholder='Email'
        value={email}
        setValue={setEmail}
      />
       <CustomInput
        placeholder='Confirm Email'
        value={emailRepeat}
        setValue={setEmailRepeat}
      />

      <CustomInput
        placeholder='Password'
        value={password}
        setValue={setPassword}
        secureTextEntry
      />

      <CustomInput
        placeholder='Confirm Password'
        value={passwordRepeat}
        setValue={setPasswordRepeat}
        secureTextEntry
      />
      <CustomButton
        text='Register'
        onPress={onRegisterPressed}
      />

      <SocialSignInButtons />

      <CustomButton
        text="Have an account? Sign in"
        onPress={onSignInPressed}
        type='EMPTY'
      />

      <CustomModal
        modalText={errorCode}
        buttonText='Back To Registration'
        visible={errorModal}
        onPress={() => setErrorModal(!errorModal)}
        />

      <CustomModal
        modalText="Account has been successfully created. Please enter you and your dog's information."
        buttonText='Close'
        visible={signInModal}
        onPress={() => setSignInModal(!signInModal)}
        />
    </View>
    </ScrollView>
  )
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#d9edff',
    height: Dimensions.get('window').height
  },

  title: {
    color: '#937DC2',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 20,
  }
});
