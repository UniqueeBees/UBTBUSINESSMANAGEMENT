import React from 'react';
import { VStack, HStack, Box, Icon, Text, MailIcon, PhoneIcon, MessageCircleIcon, CheckCircleIcon } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';
import { styles } from '../../assets/styles/theme'
function UserListItem(props) {
    const item = props.item;
    const source = props.source;
    let hasItem = false;
    const boxSelectedStyle = {};
    if (source === "Filter" && props.selectedList) {
        const index = props.selectedList.findIndex(executive => executive.id === item.id);
        if (index >= 0) {
            hasItem = true;
        }
    }
    if (hasItem) {
        boxSelectedStyle.borderColor = '$blue400';
        boxSelectedStyle.borderWidth = '$2';
    }
    return (
        <Box style={[styles.listContentItem, styles.boxShadow]} {...boxSelectedStyle} m="$1" p="$2" pl="$5">
            <VStack>
                <TouchableOpacity
                    activeOpaticy={1}
                    onPress={() => props.selectItem(item)}>
                    <HStack justifyContent='space-between'>
                        <HStack justifyContent="flex-start">
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.listHeading} >{item.name}</Text>
                        </HStack>
                        {hasItem && <HStack justifyContent='flex-end'>
                            <Icon as={CheckCircleIcon} size='lg' color='$white' fill='$blue400' />
                        </HStack>
                        }
                    </HStack>
                    {item.designation && <Text style={styles.listSubHeading}>{item.designation}</Text>}
                    <HStack justifyContent="flex-start">
                        {item.email ? <Icon as={MailIcon} m="$1" w="$3" h="$3" ml="$0" /> : ""}<Text style={styles.listSubDescription}>{item.email}</Text>
                    </HStack>
                    <HStack justifyContent="space-between"  >
                        <HStack justifyContent="flex-start">
                            {item.mobile1 ? <Icon as={PhoneIcon} m="$1" w="$3" h="$3" ml="$0" /> : ""}<Text style={styles.listSubDescription}>{item.mobile1}</Text>
                        </HStack>
                        <HStack justifyContent="flex-end">
                            {item.mobile2 ? <Icon as={MessageCircleIcon} m="$1" w="$3" h="$3" /> : ""}<Text style={styles.listSubDescription}>{item.mobile2}</Text>
                        </HStack>
                    </HStack>
                </TouchableOpacity>
            </VStack>
        </Box>
    );
}
export default UserListItem;