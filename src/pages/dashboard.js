
import React from 'react';  
import {Text, View,StatusBar} from 'react-native';
import MeetingList from './meeting/meetingList';
import Tabs from '../navigation/tabs';
function Dashboard (){
    return (
     <View style={{backgroundColor:"red", height:'100%'}}>
            <Text>Dashboard</Text>
            <MeetingList/>
     </View>
    )
}
export default Dashboard;