import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet,Text,TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebase';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

const DriverRegisterForm = () =>{
    const navigation = useNavigation();
    const [names, setNames] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone,setPhone] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [idNumber, setIdNumber] = useState('');

    const handlePassengerSignup = ()=> {
        auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCredentials=>{
            createSafiriProfile();
            const user = userCredentials.user;
            navigation.navigate('Driver Dashboard');
            console.log(user.email);
        })
        .catch(error => alert(error.message))
    }
    const createSafiriProfile = (e)=>{
        axios.post('https://kajiadorevenue.info/SupaTribe/registerDriver', {
            fullnames: names,
            phone:phone,
            id_number:idNumber,
            email:email,
            vtype:selectedLanguage
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          //navigate to a error page
            console.log(error);
        });
    }
    return(
        <View
        style={styles.container}
        behavior="padding"
        >
            <View style={styles.inputContainer}>
            <TextInput
                placeholder='Enter Full Names'
                value={ names }
                onChangeText={ text =>setNames(text)}
                style={styles.input}
                />
            <TextInput
                placeholder='Enter Phone Number'
                value={ phone }
                onChangeText={ text =>setPhone(text)}
                style={styles.input}
                />
            <TextInput
                placeholder='Enter ID Number'
                value={ idNumber }
                onChangeText={ text =>setIdNumber(text)}
                style={styles.input}
                />
            <TextInput
                placeholder='Enter Email'
                value={ email }
                onChangeText={ text =>setEmail(text)}
                style={styles.input}
                />
            <TextInput
            placeholder='Password'
            value={ password }
            onChangeText={ text =>setPassword(text)}
            style={styles.input}
            secureTextEntry
            />
            <Text>Select Vehichle Type</Text>
            <Picker
            selectedValue={selectedLanguage}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Truck" value="truck" />
            <Picker.Item label="PickUp" value="pickup" />
            <Picker.Item label="Personal Car" value="psv" />
            <Picker.Item label="Motor Bike" value="motorbike" />
            </Picker>

            </View>
                 
            <View style={styles.buttonInputContainer}>
       
                <TouchableOpacity
                onPress={handlePassengerSignup}
                style={styles.button}
                >
                    <Text style={styles.buttonText} >Driver Register</Text>

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DriverRegisterForm;

const styles = StyleSheet.create({
container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
},
input:{
backgroundColor:"white",
paddingHorizontal:15,
paddingVertical:10,
borderRadius:10,
marginTop:5,
},
inputContainer:{
width:"80%"
},
buttonInputContainer:{
width:"60%",
justifyContent:'center',
alignItems:'center',
marginTop:40,
},
button:{
backgroundColor:"#0782F9",
width:"100%",
padding:15,
borderRadius:10,
alignItems:'center'
},
buttonOutline:{
backgroundColor:"white",
marginTop:5,
borderColor:"#0782F9",
borderWidth:2,
},
buttonOutlineText:{
    color:"#0782F9",
    fontWeight:'700',
    fontSize:16
},
buttonText:{
color:"white",
fontWeight:"700",
fontSize:16
}
});