
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React, { Component } from 'react';
import RNFetchBlob from 'rn-fetch-blob'
import { Mic, Pause, StopCircle,MicOff ,PlayCircle} from 'lucide-react-native';

import { HStack, Button, ButtonIcon } from '@gluestack-ui/themed';
const Status = {
  none: "none",
  record: "record",
  pause: "pause",
  stop: "stop"
}

class AudioRecordercl extends React.Component {
  audioRecorderPlayer = AudioRecorderPlayer;

  constructor(props) {
    const dirs = RNFetchBlob.fs.dirs;
    super(props);
    this.state = {
      isLoggingIn: false,
      recordSecs: 0,
      recordTime: '00:00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00:00',
      duration: '00:00:00',
      iosFile: 'tsqrecord.m4a',
      androidFile: `${dirs.CacheDir}/tsqrecord.mp4`,
      currentStatus: Status.none,
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
  }
  onStartOrResume=()=>{
    if(this.state.currentStatus===Status.pause){
      this.onResumeRecord();
    }else{
      this.onStartRecord();
    }
  }
  onStartRecord = async () => {

    if (Platform.OS === 'android') {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      try {



        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
          return true;
        }

        const granted = await PermissionsAndroid.request(permission,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the storage');
        } else {
          console.log('permission denied');
          // return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Permissions for write access',
            message: 'Give permission to your storage to write a file',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const path = Platform.select({
      ios: this.state.iosFile,
      android: this.state.androidFile,
      //android:  'hello.mp3',
    });
    /*let audioSet: AudioSet = {
       AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
       AudioSourceAndroid: AudioSourceAndroidType.MIC,
       AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
       AVNumberOfChannelsKeyIOS: 2,
       AVFormatIDKeyIOS: AVEncodingOption.aac,
     };
     console.log('audioSet', audioSet);*/
    const uri = await this.audioRecorderPlayer.startRecorder(path);
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordSecs: e.currentPosition,
        recordTime: this.audioRecorderPlayer.mmssss(Math.floor(e.currentPosition),),
        currentStatus:Status.record,
      });
    });
    console.log(`uri: ${uri}`);
  };

  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
      currentStatus:Status.none
    });
    console.log(result);
  };

  onStartPlay = async () => {
    const path = Platform.select({
      ios: this.state.iosFile,
      android: this.state.androidFile,
    });
    console.log('onStartPlay');
    const msg = await this.audioRecorderPlayer.startPlayer(path);
    console.log(msg);
    this.audioRecorderPlayer.addPlayBackListener((e) => {
      this.setState({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
       // currentStatus:Status.record
      });
      return;
    });
  };

  onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
    //this.setState({ currentStatus:Status.pause});
  };

  onStopPlay = async () => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
   // this.setState({ currentStatus:Status.none});
  };
  onPauseRecord = async () => {
    console.log('on Pause Record');
    await this.audioRecorderPlayer.pauseRecorder();
    this.setState({ currentStatus:Status.pause});
  };
  onResumeRecord = async () => {
    console.log('onResume Record');
    await this.audioRecorderPlayer.resumeRecorder();
    this.setState({ currentStatus:Status.record});
  }



  render() {
  console.log(this.state.currentStatus);
    return (

      <View  >
        <Text>Record Time : {this.state.recordTime}</Text>
        <HStack>
          {(this.state.currentStatus !== Status.record) && <Button
            mt="$1"
            mr="$1"
            size="md"
            variant="solid"
            action="primary"
            disabled={this.state.currentStatus === Status.record}
            onPress={this.onStartOrResume}
          ><ButtonIcon size={20} as={this.state.currentStatus === Status.none? Mic:PlayCircle } /></Button>}
          {this.state.currentStatus === Status.record && <Button
            mt="$1"
            mr="$1"
            size="md"
            variant="solid"
            action="primary"
            onPress={this.onPauseRecord}
          ><ButtonIcon size={20} as={Pause}/></Button>}
           
          <Button
            mt="$1"
            mr="$1"
            size="md"
            variant="solid"
            action="primary"
            onPress={this.onStopRecord}
            disabled={this.state.currentStatus === Status.none}
          ><ButtonIcon size={20} as={StopCircle} /></Button>
        </HStack>
        {
       /* <Text>Play Time :{this.state.playTime}</Text>
        <Text>Duration :{this.state.duration}</Text>
        <Button 
          onPress={this.onStartPlay}
          title='play'
        ></Button>
        <Button 
          onPress={this.onStopPlay}
          title='stop Play'
        ></Button>*/
        }
      </View>

    );
  }

}

export default AudioRecordercl;