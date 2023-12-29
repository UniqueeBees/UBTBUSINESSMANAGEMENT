import React,{useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {getMeetingListByUser} from '../../slices/meetingSlice';
import {
    VStack,HStack,Icon ,ArrowRightIcon,Button,Heading
  } from "@gluestack-ui/themed";
  import {FlatList, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
function MeetingList(){
const meetingListItem=useSelector((state)=>state.meeting.listItems);
const token = useSelector((state) => state.login.token)
const dispatch = useDispatch()
useEffect( ()=>{
    console.log('useDispatch',token)
     dispatch(getMeetingListByUser(token))
},[token])
return(

      
      <FlatList 
        data={meetingListItem}
        renderItem={({item}) => <HStack><Text style={{marginLeft:'50px',width:"50%"}}>{item.title}</Text>
       <Icon id={item.id} size="xl"
         on as={ArrowRightIcon} m="$2" w="$4" h="$4" style={{cursor: 'pointer'}}  /></HStack>}
      />
    
    )
}
export default MeetingList;