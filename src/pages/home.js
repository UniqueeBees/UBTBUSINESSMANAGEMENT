
import { Button } from 'native-base';
import React from 'react';  
import { TouchableOpacity ,PermissionsAndroid } from 'react-native';
import {Text, View,StatusBar,Alert} from 'react-native';
import PushNotification from "react-native-push-notification";

function Home (){ 
      
    const handleNotification=(tabName)=>{  
        PushNotification.getChannels(function (channel_ids) {
         
            console.log(`createChannel returned '${channel_ids}'`)
          });
       
   
        PushNotification.localNotification({
          channelId:"push-channel",
          title:"Now you are in "+tabName+" page",
          message:"Welcome to " +tabName + "page",
        })
        PushNotification.getDeliveredNotifications(function (deliverd) { 
            console.log(`getDeliveredNotifications returned '${deliverd}'`)
          });
      }
    return (
        
       
     <View style={{backgroundColor:"#33FFE3", height:'100%'}}>
    <Text>Home1</Text>  
    <TouchableOpacity onPress={()=>handleNotification("Home")}>
        <Text>Sent Notification1</Text>
        </TouchableOpacity>
     </View>
     
     
    )
}
export default Home;