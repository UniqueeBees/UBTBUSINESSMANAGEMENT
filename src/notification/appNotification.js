import {React,useEffect}from 'react';

import PushNotification from "react-native-push-notification";
import { PermissionsAndroid } from 'react-native';

const _channelId="push-channel"
const checkApplicationPermission = async () => { 
  if (Platform.OS === 'android') { 
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    } catch (error) {
      console.log(error)
    }
  }
};

const createChannels=()=>{ 
  PushNotification.channelExists(
    _channelId,
    exists => {
    if (exists) {
    console.log(
    `createChannel already exists`,
    );
    } else {
    PushNotification.createChannel(
      {
        channelId: _channelId, // (required)
        channelName: "Special messasge", // (required)
        channelDescription: "Notification for special message", // (optional) default: undefined.
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
    }
  })}  
  function AppNotification(){
    useEffect(()=>{
      checkApplicationPermission();
      createChannels();
    },[]); 
  }
  export default AppNotification;

  export const sentNotification=(message,title,channelId)=>{   
    PushNotification.localNotification({
      channelId: channelId?channelId:_channelId,
      title: title?title : "Taswiq",
      message:message,
      picture: require('../assets/images/home.jpg'), // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefine      
      playSound: true, // (optional) default: true
      soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
       
    })
    PushNotification.getDeliveredNotifications(function (deliverd) { 
        console.log(`getDeliveredNotifications returned '${deliverd}'`)
      });
  }
