import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import CustomButton from './CustomButton.js';

  const SocialSignInButtons = () => {

    const onGooglePressed = () => {
      console.warn('sign in with google')
    }

    const onApplePressed = () => {
      console.warn('sign in with apple')
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