
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
    View,Button
  } from 'react-native';
  import React, { Component } from 'react';
import RNFetchBlob from 'rn-fetch-blob'
 
class AudioRecordercl extends React.Component {
    audioRecorderPlayer= AudioRecorderPlayer;
    
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
        androidFile:  `${dirs.CacheDir}/tsqrecord.mp4`,
      };
  
      this.audioRecorderPlayer = new AudioRecorderPlayer();
      this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.1
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
         android:  this.state.androidFile,
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
          });
        });
        console.log(`uri: ${uri}`);
      }; 

      onStopRecord = async () => {
        const result = await this.audioRecorderPlayer.stopRecorder();
        this.audioRecorderPlayer.removeRecordBackListener();
        this.setState({
          recordSecs: 0,
        });
        console.log(result);
      };
      
      onStartPlay = async () => {
        
        const path = Platform.select({
          ios: this.state.iosFile,
         android:  this.state.androidFile, 
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
          });
          return;
        });
      };
      
      onPausePlay = async () => {
        await this.audioRecorderPlayer.pausePlayer();
      };
      
      onStopPlay = async () => {
        console.log('onStopPlay');
        this.audioRecorderPlayer.stopPlayer();
        this.audioRecorderPlayer.removePlayBackListener();
      };
      onPauseRecord=async()=>{
        console.log('on Pause Record');
        await this.audioRecorderPlayer.pauseRecorder();
      };
      onResumeRecord=async()=>{
        console.log('onResume Record');
        await this.audioRecorderPlayer.resumeRecorder();
      }



    render() {
      
      return (
        
            <View  > 
                <Text>Record Time : {this.state.recordTime}</Text>
              <Button
              
                onPress={this.onStartRecord}
                title='start'
              >
                
              </Button>
              <Button
              
              onPress={this.onPauseRecord}
              title='pause'
            >
              
            </Button>
            <Button
              
              onPress={this.onResumeRecord}
              title='Resume'
            >
              
            </Button>
              <Button
              
                onPress={this.onStopRecord}
                title='Stop'
              >
                
              </Button>
              <Text>Play Time :{this.state.playTime}</Text>  
              <Text>Duration :{ this.state.duration}</Text>
              <Button
              
                onPress={this.onStartPlay}
                title='play'
              >
                
              </Button>
              <Button
              
                onPress={this.onStopPlay}
                title='stop Play'
              >
                
              </Button>
              
            </View>
          
      );
    } 
    
  }
  
  export default AudioRecordercl;