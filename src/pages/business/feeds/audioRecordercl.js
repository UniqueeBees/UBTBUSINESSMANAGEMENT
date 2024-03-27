
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

} from 'react-native';

import {
  VStack,
  Center,
  Button,
  ButtonIcon,
  HStack,
  Text, View,
  ButtonText
} from "@gluestack-ui/themed"

import React, { Component } from 'react';
import RNFetchBlob from 'rn-fetch-blob'
import { Mic, Pause, StopCircle, MicOff, PlayCircle, CheckCircle2 } from 'lucide-react-native';
import { styles } from '../../../assets/styles/theme'
import PageHeader from "../../pageHeader";
import CallDetectorManager from 'react-native-call-detection';

const Status = {
  none: "none",
  record: "record",
  pause: "pause",
  stop: "stop",
  play: "play",
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
      isCallListen: false,
      consoleText: "Feeds",
      currentPlayStatus: Status.none
    };

    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
  }
  onStartOrResume = () => {
    if (this.state.currentStatus === Status.pause) {
      this.onResumeRecord();
    } else {
      this.onStartRecord();
    }
  }
  checkPermission = async () => {

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

  }
  listenToCall = async () => {
   
    if (Platform.OS === 'android') {
      
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
          {
            title: 'Permissions for READ_PHONE_STATE',
            message: 'Give permission READ_PHONE_STATE',
            buttonPositive: 'ok',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('READ_PHONE_STATE');
        } else {
          console.log('permission denied');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
    if (this.state.isCallListen) {
      this.callDetector && this.callDetector.dispose();
    } else {
      this.callDetector = new CallDetectorManager((event, phoneNumber) => {
        this.setState({ consoleText: event });
        if (event === 'Incoming') {
          this.onPauseRecord();
          // this.setState({isCallListen:true});eve
        }
      },
        false, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
        () => { }, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
        {
          title: 'Phone State Permission',
          message: 'This app needs access to your phone state in order to react and/or to adapt to incoming calls.'
        } // a custom permission request message to explain to your user, why you need the permission [recommended] - this is the default one
      )
    }
    this.setState({ isCallListen: !this.state.isCallListen });
  }
  onStartRecord = async () => {
    this.checkPermission();
    this.listenToCall();
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
        currentStatus: Status.record,
      });
    });
    console.log(`uri: ${uri}`);
  };

  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0,
      currentStatus: Status.none
    });
    console.log(result);
  };

  onPauseRecord = async () => {
    console.log('on Pause Record');
    await this.audioRecorderPlayer.pauseRecorder();
    this.setState({ currentStatus: Status.pause });
  };
  onResumeRecord = async () => {
    console.log('onResume Record');
    await this.audioRecorderPlayer.resumeRecorder();
    this.setState({ currentStatus: Status.record });
  }


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
        currentPlayStatus: Status.play,
        // currentStatus:Status.record
      });
      return;
    });
  };
  onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
    this.setState({ currentPlayStatus: Status.pause });
  }
  onStopPlay = async () => {
    console.log('onStopPlay');
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
    this.setState({ currentPlayStatus: Status.none });
  };




  render() {
    console.log(this.state.currentStatus);
    return (

      <View  >

        <Center>
          <VStack width="100%" mx="3" style={styles.fieldSetContainer}>
            <PageHeader goBack="feeds" heading="Start Recording" showNotifi={false}></PageHeader>
            <Text style={styles.pageTitleMedium}>Upload a Recording</Text>
            <Center>
              <HStack style={{ marginTop: 50 }}>
                {(this.state.currentStatus !== Status.record) && <Button
                  mt="$1"
                  mr="$1"
                  size="md"
                  variant="solid"
                  action="primary"
                  disabled={this.state.currentStatus === Status.record}
                  onPress={this.onStartOrResume}
                  style={styles.shortButtonCircle}
                ><ButtonIcon size={20} as={this.state.currentStatus === Status.none ? Mic : PlayCircle} /></Button>}
                {this.state.currentStatus === Status.record && <Button
                  mt="$1"
                  mr="$1"
                  size="md"
                  variant="solid"
                  action="primary"
                  onPress={this.onPauseRecord}
                  style={styles.shortButtonCircle}
                ><ButtonIcon size={20} as={Pause} /></Button>}

                <Button
                  mt="$1"
                  mr="$1"
                  size="md"
                  variant="solid"
                  action="primary"
                  onPress={this.onStopRecord}
                  disabled={this.state.currentStatus === Status.none}
                  style={styles.shortButtonCircle}
                ><ButtonIcon size={20} as={StopCircle} /></Button>
              </HStack>
              <Text mt="$10" style={[styles.timerCaptions, { paddingTop: 12 }]}>{this.state.recordTime}</Text>
              <Button
                size="md"
                mt="$7"
                variant="solid"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                style={styles.buttonLong}
              // onPress={() => validateForm() ? setwizStage(wizardStageEnum.advance) : ""}
              >
                <ButtonText style={styles.buttonText}>Sumbit</ButtonText>
                <ButtonIcon ml={"80%"} size={20} as={CheckCircle2} />
              </Button>
              <HStack style={{ marginTop: 100 }}>
                <Button
                  mt="$1"
                  mr="$1"
                  size="md"
                  variant="solid"
                  action="primary"
                  disabled={this.state.recordTime === "00:00:00" ? true : false}
                  onPress={this.onStartPlay}
                  style={styles.shortButtonCircle}
                ><ButtonIcon size={20} as={PlayCircle} /></Button>
                <Button
                  mt="$1"
                  mr="$1"
                  size="md"
                  variant="solid"
                  action="primary"
                  disabled={this.state.currentPlayStatus != Status.play}
                  onPress={this.onStopPlay}
                  style={styles.shortButtonCircle}
                ><ButtonIcon size={20} as={StopCircle} /></Button>

              </HStack>
              <Text mt="$10" style={[styles.timerCaptions, { paddingTop: 12 }]}>{this.state.playTime}</Text>
            </Center>
          </VStack>
        </Center>
      </View>
    );
  }
}
export default AudioRecordercl;