
import React, { useEffect } from 'react';
import { View } from 'react-native';
import MeetingList from './meetingList';
import CreateMeeting from './createMeeting';
import { useSelector, useDispatch } from 'react-redux';
import { getMeetingListByUser, getPurposeList } from '../../slices/meetingSlice';
import {
    VStack
} from "@gluestack-ui/themed";
function MeetingLayout(props) {

    const meetingListItems = useSelector((state) => state.meeting.listItems);
    const purposeList = useSelector((state) => state.meeting.purposeList);
    const token = useSelector((state) => state.login.token)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPurposeList(token));
        dispatch(getMeetingListByUser(token))
    }, [token])


    return (


        <VStack space="md" width="100%" bgColor="$white">
            {meetingListItems.length === 0 ? <CreateMeeting purposeList={purposeList} /> : 
            <MeetingList 
             purposeList={purposeList}
            meetingListItems={meetingListItems} />}
        </VStack>

    )
}
export default MeetingLayout;