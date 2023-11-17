
import { Button } from 'native-base';
import React from 'react';  
import { TouchableOpacity ,PermissionsAndroid } from 'react-native';
import {Text, View,StatusBar,Alert} from 'react-native';
import {sentNotification} from '../notification/appNotification'

function Home (){ 
 
   
    return (
        
       
     <View style={{backgroundColor:"#33FFE3", height:'100%'}}>
    <Text>Home1</Text>  
    <TouchableOpacity onPress={()=>sentNotification("Home")}>
        <Text>Sent Notification</Text>
        </TouchableOpacity>
     </View>
     
     
    )
}
export default Home;