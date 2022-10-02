import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import LogoImg from '../../assets/images/hookpupslogo.png';
import Logo from '../../components/Logo.js';
import CustomInput from '../../components/SignIn/CustomInput.js'
import CustomButton from '../../components/SignIn/CustomButton.js';
import SocialSignInButtons from '../../components/SignIn/SocialSignInButtons.js';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [emailRepeat, setEmailRepeat] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const onRegisterPressed = () => {
    console.warn('create account')
  }

  const onSignInPressed = () => {
    console.warn('back to sign in page')
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
    </View>
    </ScrollView>
  )
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    top: 30,
    // backgroundColor: 'green'
  },

  title: {
    color: '#937DC2',
    fontSize: 25,
    fontWeight: 'bold',
    margin: 20,
    // backgroundColor: 'white'
  }
});
