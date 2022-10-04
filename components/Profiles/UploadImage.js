import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const UploadImage = () => {
  const [image, setImage] = useState(null);

  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={imageUploaderStyles.container}>
      {
        image  && <Image source={{ uri: image }} style={{ width: 130, height: 130 }} />
      }
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
          <Text style={imageUploaderStyles.text}>{image ? 'Edit' : 'Upload'} Image</Text>
          <AntDesign name="camera" size={16} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UploadImage;

const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:130,
        width:130,
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
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    },
    text: {
      fontSize: 13
    }
})