import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from './CustomButton.js';

  const SocialSignInButtons = ({ googleSignIn, appleSignIn }) => {

    const onGooglePressed = () => {
      console.warn('sign in with google')
      // googleSignIn();
    }

    const onApplePressed = () => {
      console.warn('sign in with apple')
      // appleSignIn();
    }

    return (
      <>
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
      </>
    )
  }

  export default SocialSignInButtons;