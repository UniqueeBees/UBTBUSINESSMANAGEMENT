import React, { useEffect, useState, useRef } from "react";
 
import { View,Text, TouchableOpacity,TouchableWithoutFeedback ,PermissionsAndroid} from "react-native";
import { HStack ,Button,ButtonIcon, VStack} from "@gluestack-ui/themed";
import {  Disc ,PlayCircle , StopCircle } from 'lucide-react-native';
import Geolocation from '@react-native-community/geolocation';

function travelRecord (){
  const [location,setLocation]=useState(
    {"coords": {"accuracy": 0, "altitude": 0, "heading": 0, "latitude": 0, "longitude": 0, "speed": 0}, 
    "extras": {"networkLocationType": "cell"}, "mocked": false, "timestamp": 0});
  const [watchId,setWatchId]=useState(0);

  Geolocation.setRNConfiguration({
    authorizationLevel: 'always', // Request "always" location permission
    skipPermissionRequests: false, // Prompt for permission if not granted
  }); 
    onStartTavel=()=>{
      const wId = Geolocation.watchPosition(
        position => {
          //console.log(position);
          // Send the position data to the server
          setLocation(position);
        },
        error => {
          console.log(error);
        },
        {
          distanceFilter: 100, // 10Minimum distance (in meters) to update the location
          interval: 900000, // 900000Update interval (in milliseconds), which is 15 minutes
          fastestInterval:300000 , // 300000 Fastest update interval (in milliseconds)
          accuracy: {
            android: 'highAccuracy',
            ios: 'best',
          },
          showsBackgroundLocationIndicator: true,
          pausesLocationUpdatesAutomatically: false,
          activityType: 'fitness', // Specify the activity type (e.g., 'fitness' or 'other')
          useSignificantChanges: false,
          deferredUpdatesInterval: 0,
          deferredUpdatesDistance: 0,
          foregroundService: {
            notificationTitle: 'Tracking your location',
            notificationBody: 'Enable location tracking to continue', // Add a notification body
          },
        }
      );
      setWatchId(wId);
    }
    onEndTavel=()=>{
      Geolocation.clearWatch( watchId);
    }
    return (
        <View>
            <Text> Travel Recorder Latitude :{location.coords.latitude} || Longitude :{location.coords.longitude}</Text>     
            <Text> LAst REcorder : {location.timestamp}</Text>
            <VStack> 
            <Button
              mt="$1"
              mr="$1"
              size="md"
              variant="solid"
              action="primary"
              onPress={e => onStartTavel()}
            >
              <ButtonIcon size={20} as={Disc} />
            </Button>
            <Text> End Travel</Text>
            <Button
              mt="$1"
              mr="$1"
              size="md"
              variant="solid"
              action="primary"
              onPress={e => onEndTavel()}
            >
              <ButtonIcon size={20} as={StopCircle} />
            </Button> 
            </VStack>       
        </View>
    )
}

export default travelRecord;