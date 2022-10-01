import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import LogoImg from '../../assets/images/hookpupslogo.png';
import Logo from '../../components/Logo.js';
import CustomInput from '../../components/SignIn/CustomInput.js'
import CustomButton from '../../components/SignIn/CustomButton.js';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPressed = () => {
    console.log('click sign in')
  }

  const onForgotPasswordPressed = () => {
    console.warn('forgot password')
  }

  const onGooglePressed = () => {
    console.warn('sing in with google')
  }

  const onApplePressed = () => {
    console.warn('sign in with apple')
  }

  return (
    <View style={styles.container}>
      <Image source={LogoImg} style={styles.logo} resizeMode='contain' />

      <Logo />

      <CustomInput
        placeholder='Username'
        value={username}
        setValue={setUsername}
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
      <CustomButton
        text='Sign In with Google'
        onPress={onGooglePressed}
        bgColor='#FAE9EA'
      />
      <CustomButton
        text='Sign In with Apple'
        onPress={onApplePressed}
        bgColor='#E3E3E3'
      />
    </View>
  )
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    top: 30,
    // backgroundColor: 'green'
  },

  logo: {
    maxWidth: 150,
    maxHeight: 150,
    margin: 20,
    // backgroundColor: 'white'
  }
});
