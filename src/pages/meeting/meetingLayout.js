
import React, { useEffect } from 'react';
import { View } from 'react-native';
import MeetingList from './meetingList';
import CreateMeeting from './createMeeting';
import { useSelector, useDispatch } from 'react-redux';
import { getMeetingListByUser } from '../../slices/meetingSlice';
import {
    VStack
} from "@gluestack-ui/themed";
function MeetingLayout() {

    const meetingListItems = useSelector((state) => state.meeting.listItems);
    const token = useSelector((state) => state.login.token)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMeetingListByUser(token))
    }, [token])


    return (


        <VStack space="md">
            {meetingListItems.length === 0 ? <CreateMeeting /> : <MeetingList meetingListItems={meetingListItems} />}
        </VStack>

    )
}
export default MeetingLayout;