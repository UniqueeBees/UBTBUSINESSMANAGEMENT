
import React,{useEffect, useState} from 'react';  
import {Text, View} from 'react-native';
import { Button,ButtonText,Center,HStack,VStack,Heading } from '@gluestack-ui/themed';
import MeetingLayout from './meeting/meetingLayout';
import TaskLayout from './task/taskLayout';
import Header from '../common/header';
import { styles } from '../assets/styles/theme';
import { useSelector,useDispatch } from 'react-redux';
import { setPage } from '../slices/initialPageSlice';
import { navigationRoutes } from '../common/navigation';

function Dashboard (props){
    const [isMeeting,setIsMeeting]=useState(true);
    const companyState = useSelector((state) => state.company)
    const hasUser = useSelector((state) => state.user.hasUser)
    const dashboardLanguageDTO=useSelector((state)=>state.language.dashboardLanguageDTO)
    const dispatch=useDispatch();
    const onMeetingPress=()=>{
        setIsMeeting(true);
    }
    const onTasksPress=()=>{
        setIsMeeting(false);
    }
   useEffect(()=>{
    console.log('hasUser',hasUser)
    if(!hasUser){
        dispatch(setPage(navigationRoutes.login))
    }
   })
    const meetingBgColor=isMeeting ? {}:{bgColor:'$whitesmoke'}
    const taskBgColor=!isMeeting ? {}:{bgColor:'$whitesmoke'}
    return (
     <View  style={styles.fieldSetContainer}>
        <VStack>
        <Heading style={styles.pageTitle} >{companyState.company.name}</Heading>
          
            <Center>
            <HStack pt="$4" pb="$4">
                <Button ml='auto' size="md" variant="solid" action="primary" {...meetingBgColor} style={styles.buttonGeneral} onPress={onMeetingPress}>
                    <ButtonText color={isMeeting?'$white':'$black'}  >
                        {dashboardLanguageDTO.meetings}
                    </ButtonText >
                </Button>
                <Button ml='auto' size="md" variant="solid" action="primary" style={styles.buttonGeneral} {...taskBgColor} onPress={onTasksPress}>
                    <ButtonText color={!isMeeting?'$white':'$black'}  >
                        {dashboardLanguageDTO.tasks}
                    </ButtonText >
            </Button>
            </HStack>
            </Center>
                {isMeeting ?<MeetingLayout/> : <TaskLayout/>} 
            </VStack>
     </View>
    )
}
export default Dashboard;