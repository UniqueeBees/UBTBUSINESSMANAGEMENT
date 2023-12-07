/**
 * @format
 */

import {AppRegistry} from 'react-native';

import store from './src/store';
import { Provider } from 'react-redux';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";
import providerApp from './src/providerApp';
 

PushNotification.configure({
    // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    //notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  //For local notification not remote firebase
  requestPermissions: Platform.OS === 'ios'
})

AppRegistry.registerComponent(appName, () =>providerApp);
