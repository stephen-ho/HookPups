import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { auth } from '../../firebase_config.js';
import { signInWithEmailAndPassword } from "firebase/auth";
import LogoImg from '../../assets/images/hookpupslogo.png';
import Logo from '../../components/Logo.js';
import CustomInput from '../../components/SignIn/CustomInput.js'
import CustomButton from '../../components/SignIn/CustomButton.js';
import SocialSignInButtons from '../../components/SignIn/SocialSignInButtons.js';
import MainScreen from '../MainScreen.js';
import CustomModal from '../../components/SignIn/CustomModal.js';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const config = require('../../config.js');

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();
  // const provider = new GoogleAuthProvider();

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId: config.GOOGLE_CLIENT_ID,
  //     offlineAccess: false,
  //   });
  // });

  const onSignInPressed = () => {

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        navigation.navigate('MainScreen', { user: email });
      })
      .catch((error) => {
        setErrorCode(error.code); // OR error.message
        setModalVisible(!modalVisible);
      });
  }

  const onForgotPasswordPressed = () => {
    console.warn('forgot password')
  }

  const onCreateAccountPressed = () => {
    navigation.navigate('Register');
  }

  // const logInWithGoogle = () {
  //   const { idToken } = await GoogleSignin.signIn();

  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //   // Sign-in the user with the credential
  //   const user = await auth().signInWithCredential(googleCredential);
  //   console.log(user)
  // }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Image source={LogoImg} style={styles.logo} resizeMode='contain' />
        <Logo />

        <CustomInput
          placeholder='Email'
          value={email}
          setValue={setEmail}
        />
        <CustomInput
          placeholder='Password'
          value={password}
          setValue={setPassword}
          secureTextEntry
        />
        <CustomButton
          text='Sign In'
          onPress={onSignInPressed}
        />
        <CustomButton
          text='Forgot password?'
          onPress={onForgotPasswordPressed}
          type='EMPTY'
        />

        <SocialSignInButtons />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onCreateAccountPressed}
          type='EMPTY'
        />

        <CustomModal
          modalText={errorCode}
          buttonText='Back To Sign In'
          visible={modalVisible}
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>
    </ScrollView>
  )
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: 'center',
    backgroundColor: '#d9edff'
  },

  logo: {
    maxWidth: 150,
    maxHeight: 150,
    margin: 20
  }
});
