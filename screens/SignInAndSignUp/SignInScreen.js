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
// import DogProfileInputScreen from '../Profiles/DogProfileInputScreen.js'

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {


  }, [])

  const onSignInPressed = () => {

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        // const user = userCredential.user;
        console.log('sign in');
        console.log(res);
        //navigate to main screen
        // setIsSignedIn(true);
        navigation.navigate('MainScreen', { email });
        // navigation.navigate('ProfileInputScreen');
      })
      .catch((error) => {
        console.log(error.message);
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  }

  const onForgotPasswordPressed = () => {
    console.warn('forgot password')
  }

  const onCreateAccountPressed = () => {
    navigation.navigate('Register');
  }

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
