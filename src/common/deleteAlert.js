import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/loginSlice';
import { setPage } from '../slices/initialPageSlice';
import { navigationRoutes } from './navigation';
import {
    Center, AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader,
    Heading, AlertDialogCloseButton, AlertDialogBody, Text, AlertDialogFooter, ButtonGroup, Button, ButtonText,
    Icon
}
    from '@gluestack-ui/themed';
import { CloseIcon } from '@gluestack-ui/themed';
import { deleteTask, resetTaskDeleteOptions } from '../slices/taskSlice';
import { requestStatusDTO } from '../dto/statusDTO';
import { deleteMeeting, resetMeetingDeleteOptions } from '../slices/meetingSlice';
import { deleteBusiness, resetBusinessDeleteOptions } from '../slices/businessSlice';
function DeleteAlert() {
    const meetingDeleteOptions = useSelector((state) => state.meeting.deleteOptions);
    const taskDeleteOptions = useSelector((state) => state.task.deleteOptions);
    const businessDeleteOptions = useSelector((state) => state.business.deleteOptions);
    const token = useSelector((state) => state.login.token)
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const [deleteSource, setDeleteSource] = useState('')
    const dispatch = useDispatch();
    useEffect(() => {
        if (meetingDeleteOptions.initiated) {
            setShowAlertDialog(true);
            setDeleteSource('meeting')
        }
    }, [meetingDeleteOptions.initiated])
    useEffect(() => {
        if (taskDeleteOptions.initiated) {
            setShowAlertDialog(true);
            setDeleteSource('task')
        }
    }, [taskDeleteOptions.initiated])
    useEffect(() => {
        if (businessDeleteOptions.initiated) {
            setShowAlertDialog(true);
            setDeleteSource('business')
        }
    }, [businessDeleteOptions.initiated])

    const getDeleteStatus = () => {
        if (deleteSource === 'meeting') {
            return meetingDeleteOptions.status;
        }
        else if (deleteSource === 'task') {
            return taskDeleteOptions.status;
        }
        else if (deleteSource === 'business') {
            return businessDeleteOptions.status;
        }
    }
    const deleteStatus = getDeleteStatus();
    const resetDeleteAction = () => {
        if (deleteSource === 'meeting') {
            dispatch(resetMeetingDeleteOptions())
        }
        else if (deleteSource === 'task') {
            dispatch(resetTaskDeleteOptions())
        }
        else if (deleteSource === 'business') {
            dispatch(resetBusinessDeleteOptions())
        }
    }
    const callDeleteAction = () => {
        if (deleteSource === 'meeting') {
            dispatch(deleteMeeting({ token: token, id: meetingDeleteOptions.id }))
        }
        else if (deleteSource === 'task') {
            dispatch(deleteTask({ token: token, id: taskDeleteOptions.id }))
        }
        else if (deleteSource === 'business') {
            dispatch(deleteBusiness({ token: token, id: businessDeleteOptions.id }))
        }
    }
    const getDeleteMessage = (deleteStatus) => {
        let deleteMessage = '';
        if (deleteStatus === requestStatusDTO.fulfilled) {
            deleteMessage = 'Deleted successfully';
        }
        else if (deleteStatus === requestStatusDTO.rejected) {
            deleteMessage = 'Deletion failed';
        }
        else if (deleteStatus === requestStatusDTO.pending) {
            deleteMessage = 'Deleting..';
        }
        else {
            deleteMessage = 'Are you sure you want to delete ?';
        }
        return deleteMessage;
    }
    return (
        <Center >
            <AlertDialog
                isOpen={showAlertDialog}
                onClose={() => {
                    dispatch(logout())
                    dispatch(setPage(navigationRoutes.login))
                    setShowAlertDialog(false)

                }}
            >
                <AlertDialogBackdrop />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Heading size="lg">Delete</Heading>
                        <AlertDialogCloseButton>
                            <Icon as={CloseIcon} />
                        </AlertDialogCloseButton>
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <Text size="sm">
                            {getDeleteMessage(deleteStatus)}

                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        {(deleteStatus !== requestStatusDTO.fulfilled && deleteStatus !== requestStatusDTO.rejected) && <ButtonGroup space="lg">

                            <Button
                                bg="$error600"
                                action="negative"
                                disabled={deleteStatus === requestStatusDTO.pending}
                                onPress={() => {

                                    callDeleteAction();
                                }}
                            >
                                <ButtonText>Yes</ButtonText>
                            </Button>
                            <Button
                                bg="$error600"
                                action="negative"
                                disabled={deleteStatus === requestStatusDTO.pending}
                                onPress={() => {

                                    setShowAlertDialog(false)
                                    resetDeleteAction()
                                }}
                            >
                                <ButtonText>No</ButtonText>
                            </Button>
                        </ButtonGroup>
                        }
                        {(deleteStatus === requestStatusDTO.fulfilled || deleteStatus === requestStatusDTO.rejected) && <ButtonGroup space="lg">

                            <Button
                                bg="$error600"
                                action="negative"
                                onPress={() => {

                                    setShowAlertDialog(false)
                                    resetDeleteAction()
                                }}
                            >
                                <ButtonText>Ok</ButtonText>
                            </Button>

                        </ButtonGroup>
                        }
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Center>
    )

}

export default DeleteAlert;