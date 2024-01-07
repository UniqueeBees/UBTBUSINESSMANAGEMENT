
import React,{useEffect} from 'react';  
import {View} from 'react-native';
import MeetingList from './meetingList';
import CreateMeeting from './createMeeting';
import { useSelector,useDispatch } from 'react-redux';
import {getMeetingListByUser} from '../../slices/meetingSlice';

function MeetingLayout (){
   
    const meetingListItems=useSelector((state)=>state.meeting.listItems);
    const token = useSelector((state) => state.login.token)
    const dispatch = useDispatch()
    useEffect( ()=>{
        dispatch(getMeetingListByUser(token))
    },[token])

   
    return (
     
          <View>
          {meetingListItems.length === 0 ? <CreateMeeting /> :<MeetingList meetingListItems={meetingListItems}/>}    
         </View> 
    )
}
export default MeetingLayout;