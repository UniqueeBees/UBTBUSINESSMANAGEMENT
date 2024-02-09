import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import {
    Center, AlertDialog, AlertDialogBackdrop, AlertDialogContent, Divider,
    AlertDialogBody, Text,

} from '@gluestack-ui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { showContextMenu } from '../../slices/listEditContextMenuSlice';
import { getTaskByIdFromList } from '../../slices/taskSlice';
import { getMeetingByIdFromList } from '../../slices/meetingSlice';
import { useNavigation } from '@react-navigation/native';
const ListEditContextMenu = (props) => {
    const showAlertDialog = useSelector((state) => state.listContextMenu.show)
    const position = useSelector((state) => state.listContextMenu.position)
    const settings = useSelector((state) => state.listContextMenu.settings)
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const menuAction = (action) => {
        dispatch(showContextMenu(false));
        if (settings) {
            if (action === 'edit') {
                if (settings.type === 'meeting') {
                    dispatch(getMeetingByIdFromList({ id: settings.id }));
                    navigation.navigate("meetingSetup");
                }
                else if (settings.type === 'task') {
                    dispatch(getTaskByIdFromList({ id: settings.id, launchSource: settings.launchSource }));
                    navigation.navigate("taskSetup");
                }
                else if (settings.type === 'contact') {

                }
                else if (settings.type === 'business') {

                }
            }
        }
    }
    return (
        <AlertDialog
            isOpen={showAlertDialog}

            onClose={() => {
                dispatch(showContextMenu(false));
            }}
            width={100}

        >
            <AlertDialogBackdrop style={{ backgroundColor: "transparent" }} width={500} />
            <AlertDialogContent style={(showAlertDialog && position.y && position.x) ? { top: (position.y + -300), left: position.x - 85, } : {}}>

                <AlertDialogBody bg="$white" >
                    <TouchableOpacity
                        activeOpaticy={1}
                        onPress={() => menuAction('edit')}>
                        <Text size="sm">
                            Edit
                        </Text>
                    </TouchableOpacity>
                    <Divider my="$0.5" w={100} />
                    <TouchableOpacity
                        activeOpaticy={1}
                        onPress={() => menuAction('delete')}>
                        <Text size="sm">
                            Delete
                        </Text>
                    </TouchableOpacity>
                </AlertDialogBody>

            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ListEditContextMenu;
