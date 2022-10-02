import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import LogoImg from '../../assets/images/hookpupslogo.png';
import Logo from '../../components/Logo.js';
import CustomInput from '../../components/SignIn/CustomInput.js'
import CustomButton from '../../components/SignIn/CustomButton.js';
import SocialSignInButtons from '../../components/SignIn/SocialSignInButtons.js';

const SignInScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPressed = () => {
    console.log('click sign in')
  }

  const onForgotPasswordPressed = () => {
    console.warn('forgot password')
  }

  const onCreateAccountPressed = () => {
    console.warn('create account')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
