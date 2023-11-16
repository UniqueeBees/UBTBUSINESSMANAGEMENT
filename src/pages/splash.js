
import React from 'react';
import {Text, View,StyleSheet,Image,Alert} from 'react-native'; 
import { Button  } from "native-base";

const logo_style = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 66,
      height: 58,
    },
    mediumButton:{
        width:200,
        height:40
    }
  });
 const view_Centered = StyleSheet.create({ 
    centered: { 
      flex: 1, 
      justifyContent: "center", 
      alignItems: "center", 
      backgroundColor: "#ffc2c2", 
    }, 
    title: { 
      fontSize: 18, 
      marginVertical: 2, 
    }, 
    subtitle: { 
      fontSize: 14, 
      color: "#888", 
    }, 
    logo :{
        width:logo_style.tinyLogo.width,
        height:logo_style.tinyLogo.height,
        marginTop:20
    },
    button:{
        width:logo_style.mediumButton.width,
        height:logo_style.mediumButton.height, 
        marginTop:60
    }
  });
  
function Splash (){
    return ( 
       <View style={view_Centered.centered}>
       <Text style={view_Centered.title}>UBT Business Management System</Text>
       <Image 
        style={view_Centered.logo}
        source={ require('../assets/images/home2.png') }
        />
      <Button colorScheme="primary" style={view_Centered.button} onPress={() => Alert.alert("hello world")}>Click Me</Button>
       </View>  
    )
}
export default Splash;