import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Button, Image,StyleSheet,TouchableOpacity,Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import Constants from "expo-constants"
const DriverRegisterScreenSelfie = () => {
  const [image, setImage] = useState(null);
  const navigation = useNavigation('');
  async function pickImage(isCamera) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);

    if (status !== 'granted') {
      alert('Sorry, we need camera roll and camera permissions to make this work!');
      return;
    }

    let result;
    if (isCamera) {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    }

    if (!result.cancelled) {
      setImage(result.uri);
      uploadImage(result.uri);
    }
  }
  async function uploadImage(uri) {
    const formData = new FormData();
    formData.append('file', { uri, name: 'image.jpg', type: 'image/jpeg' });
    try {
        const res = await axios.post('https://your-server-url.com/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(res.data);
    } catch (err) {
      navigation.navigate('Upload Vehichle');
      // console.log(uri)
        console.log(err);
    }
}
  return (
    <View style={styles.container}>
      <View style={styles.buttonInputContainer}>
            <TouchableOpacity
            onPress={() => pickImage(true)}
            style={styles.button}
            >
                <Text style={styles.buttonText} >Take A Selfie</Text>
            </TouchableOpacity>
        </View>
      {/* <Button style={styles.button} title="Pick Image" onPress={pickImage} /> */}
      {/* <Button title="Take a photo" onPress={() => pickImage(true)} /> */}
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

export default DriverRegisterScreenSelfie;
const styles = StyleSheet.create({
  container :{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
  },
  input:{
      borderColor:"#888",
      borderWidth:1,
      },
  inputContainer:{
      width:"95%",
      top:15,
      },
  button:{
      backgroundColor:"#0782F9",
      width:"100%",
      padding:15,
      borderRadius:10,
      alignItems:'center',
      marginTop:40,
      },
  buttonText:{
  color:"white",
  fontWeight:"700",
  fontSize:16
  },
  map: {
      width: '100%',
      height: '90%',
      top:30
    },
  textview:{
      position:'absolute',
  },
  searchContainer:{
      position:'absolute',
      width:"90%",
      backgroundColor:"white",
      shadowColor:"black",
      shadowOffset:{width:2, height:2},
      shadowOpacity:0.5,
      shadowRadius:4,
      elevation:4,
      padding:8,
      borderRadius:8,
      top:Constants.statusBarHeight,

  }
});