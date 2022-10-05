import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const UploadImages = ({ images, addImage }) => {

  const addPhoto = () => {
    addImage();
  }

  return (
    <View style={imageUploaderStyles.container}>
      {
        images.length !== 0  && <Image source={{ uri: images[images.length - 1] }} style={{ width: 200, height: 200 }} />
      }
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity onPress={addPhoto} style={imageUploaderStyles.uploadBtn} >
          <Text style={imageUploaderStyles.text}>{images.length !== 0 ? 'Add More' : 'Upload Image'}</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UploadImages;

const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:200,
        width:200,
        backgroundColor:'#efefef',
        // backgroundColor:'#FFC8DD',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
        marginBottom: 25
    },
    uploadBtnContainer:{
        opacity:0.5,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'22%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    },
    text: {
      fontSize: 16,
    }
})