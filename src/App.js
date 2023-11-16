
import {React,useEffect}from 'react';
 
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from "native-base";
import Splash from './pages/splash';
import BusinessEdit from './pages/businessEdit'
import Tabs from './navigation/tabs';
import { Alert} from 'react-native'; 
import PushNotification from "react-native-push-notification";
import { PermissionsAndroid } from 'react-native';

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
    "push-channel",
    exists => {
    if (exists) {
    console.log(
    `createChannel already exists`,
    );
    } else {
    PushNotification.createChannel(
      {
        channelId: "push-channel", // (required)
        channelName: "Special messasge", // (required)
        channelDescription: "Notification for special message", // (optional) default: undefined.
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
    }
  })}


function App (){
  useEffect(()=>{
    checkApplicationPermission();
    createChannels();
  },[]); 
    return (
      
      <SafeAreaProvider> 
        <NativeBaseProvider>
        <Tabs/>
       </NativeBaseProvider> 
      </SafeAreaProvider>
    )
}
export default App;