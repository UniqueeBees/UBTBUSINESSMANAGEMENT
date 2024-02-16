import React, { useEffect, useState, useRef } from "react";
import AudioRecorderPlayer, {
    AVEncoderAudioQualityIOSType,
    AVEncodingOption,
    AudioEncoderAndroidType,
    AudioSet,
    AudioSourceAndroidType,
   } from 'react-native-audio-recorder-player';
import { View,Text, TouchableOpacity,TouchableWithoutFeedback ,PermissionsAndroid} from "react-native";
import { HStack ,Button,ButtonIcon, VStack} from "@gluestack-ui/themed";
import {  Disc ,PlayCircle , StopCircle } from 'lucide-react-native';

function AudioRecorder (){
    let audioRecorderPlayer= new AudioRecorderPlayer();
    audioRecorderPlayer.setSubscriptionDuration(0.09);
    console.log("audio player init",audioRecorderPlayer);
     
    const [recordSecs,setRecordSecs]=useState(0);
    const [recordTime,setRecordTime]=useState('00:00:00');
    const [currentPositionSec,setCurrentPositionSec]=useState(0);
    const [currentDurationSec,setCurrentDurationSec]=useState(0);
    const [playTime,setPlayTime]=useState('00:00:00');
    const [duration,setDuration]=useState('00:00:00');
    useEffect(()=>{
        audioRecorderPlayer = new AudioRecorderPlayer();
        audioRecorderPlayer.setSubscriptionDuration(0.09);
    })
 async function permission (){
    if (Platform.OS === 'android') {
        try {
          const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);
      
          console.log('write external stroage', grants);
      
          if (
            grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.RECORD_AUDIO'] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Permissions granted');
          } else {
            console.log('All required permissions not granted');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
  }

  const onStartRecord = async () => {
   
        permission();
        const path = 'hello.mp4';
        const audioSet = {
          AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
          AudioSourceAndroid: AudioSourceAndroidType.MIC,
          AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
          AVNumberOfChannelsKeyIOS: 2,
          AVFormatIDKeyIOS: AVEncodingOption.aac,
        };
        console.log('audioSet', audioSet);
        console.log('audio player',audioRecorderPlayer);
        const uri = await audioRecorderPlayer?.current?.startRecorder(path, audioSet);
        console.log(`uri: ${uri}`);
        audioRecorderPlayer.addRecordBackListener((e) => {
            console.log("record Response");
            setRecordSecs(e.current_position);
            setRecordTime(audioRecorderPlayer.mmssss(
                Math.floor(e.current_position),
              )) 
        });
        console.log(`uri: ${uri}`);
      };

    const  onStopRecord  =async () => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setRecordSecs(0);
        console.log(result);
      };
      async  function onStartPlay  (e) {
        console.log('onStartPlay');
        const path = 'hello.m4a'
        const msg = await audioRecorderPlayer.startPlayer();
        //audioRecorderPlayer.setVolume(1.0);
        console.log(msg);
        audioRecorderPlayer.addPlayBackListener((e) => {
          if (e.current_position === e.duration) {
            console.log('finished');
            audioRecorderPlayer.stopPlayer();
          }

          const [recordSecs,setRecordSecs]=useState(0);
          const [recordTime,setRecordTime]=useState('00:00:00');
          const [currentPositionSec,setCurrentPositionSec]=useState(0);
          const [currentDurationSec,setCurrentDurationSec]=useState(0);
          const [playTime,setPlayTime]=useState('00:00:00');
          const [duration,setDuration]=useState('00:00:00');

          setCurrentPositionSec(e.current_position);
          setCurrentDurationSec(e.duration);
          setPlayTime(audioRecorderPlayer.mmssss(
            Math.floor(e.current_position),
          ));
          duration(audioRecorderPlayer.mmssss(Math.floor(e.duration)))
         
        });
      };

    return (
        <View>
            <Text> Audio Recorder1 </Text>     
            <VStack>
                <Text> Record Time : {duration}</Text>
            <Button
              mt="$1"
              mr="$1"
              size="md"
              variant="solid"
              action="primary"
              onPress={e => onStartRecord()}
            >
              <ButtonIcon size={20} as={Disc} />
            </Button>
            <Text> Record Time : {duration}</Text>
            <Button
              mt="$1"
              mr="$1"
              size="md"
              variant="solid"
              action="primary"
              onPress={e => onStopRecord()}
            >
              <ButtonIcon size={20} as={StopCircle} />
            </Button>
            <Text> Play Time : {playTime}</Text>
            <Button
              mt="$1"
              mr="$1"
              size="md"
              variant="solid"
              action="primary"
              onPress={e => onStartPlay()}
            >
              <ButtonIcon size={20} as={PlayCircle} />
            </Button>
            </VStack>       
        </View>
    )
}

export default AudioRecorder;