import React from 'react';
import { VStack, HStack, Box,  Text } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';
import { styles } from '../../assets/styles/theme'
function GeneralListItem(props) {

    return (
        <Box style={[styles.listContentItem, styles.boxShadow]} m="$1" p="$2" pl="$5">
            <VStack>
                <TouchableOpacity
                    activeOpaticy={1}
                    onPress={() => props.selectItem(props.item)}>
                    <HStack justifyContent='space-between'>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.listHeading} >{props.item[props.listSettings.displayField]}</Text>

                    </HStack>

                </TouchableOpacity>
            </VStack>
        </Box>
    );
}
export default GeneralListItem;