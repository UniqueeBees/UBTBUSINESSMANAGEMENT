import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
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
function SessionExpire() {
    const meetingIsAuthInvalid = useSelector((state) => state.meeting.isAuthInvalid);
    const taskIsAuthInvalid = useSelector((state) => state.task.isAuthInvalid);
    const userIsAuthInvalid = useSelector((state) => state.user.isAuthInvalid);
    const [showAlertDialog, setShowAlertDialog] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        if (meetingIsAuthInvalid || taskIsAuthInvalid || userIsAuthInvalid) {
            setShowAlertDialog(true);
        }
    }, [meetingIsAuthInvalid, taskIsAuthInvalid,userIsAuthInvalid])

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
                        <Heading size="lg">Session Expired</Heading>
                        <AlertDialogCloseButton>
                            <Icon as={CloseIcon} />
                        </AlertDialogCloseButton>
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        <Text size="sm">
                            User session expired, please login to continue
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <ButtonGroup space="lg">
                            
                            <Button
                                bg="$error600"
                                action="negative"
                                onPress={() => {
                                    dispatch(logout())
                                    dispatch(setPage(navigationRoutes.login))
                                    setShowAlertDialog(false)
                                }}
                            >
                                <ButtonText>Ok</ButtonText>
                            </Button>
                        </ButtonGroup>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Center>
    )

}

export default SessionExpire;