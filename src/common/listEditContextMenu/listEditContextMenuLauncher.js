import React, { useRef } from 'react';
import { Pressable, Text, Icon, AddIcon } from '@gluestack-ui/themed';
import { MoreVertical } from 'lucide-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { showContextMenu } from '../../slices/listEditContextMenuSlice';
function ListEditContextMenuLauncher(props) {
    const showContext = useSelector((state) => state.listContextMenu.show)
    const dispatch = useDispatch();
    const pressableRef = useRef()
    const handleOnPress = () => {
        if (showContext) {
            dispatch(showContextMenu({ show: false }))
        }
        this.ref.measure((originX, originY, width, height, pageX, pageY) => {
            dispatch(showContextMenu({ 
                show: true, 
                position: { x: pageX, y: pageY },
                settings:{type:props.type,id:props.id,launchSource:props.source}, 
            }))
        })
    }
    return (
        <Pressable
            ref={(ref) => { this.ref = ref; }}
            onPress={handleOnPress}>
            <Icon as={MoreVertical} ml='$1' w="$5" h="$4" color='#171717' />
        </Pressable>
    )
}

export default ListEditContextMenuLauncher;