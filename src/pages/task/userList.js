import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { styles } from '../../assets/styles/theme'
import { HStack, VStack, Box, Badge, BadgeText, Heading, Text,Icon, MailIcon, PhoneIcon, MessageCircleIcon } from "@gluestack-ui/themed";
function UserList(props) {
    return (

        <FlatList showsVerticalScrollIndicator={false}
            data={props.userItemList}
            renderItem={({ item }) => <Box style={[styles.listContentItem,styles.boxShadow]} m="$1" p="$2" pl="$5">
                <VStack>
                    <TouchableOpacity
                        activeOpaticy={1}
                        onPress={() => props.selectItem(item)}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.listHeading} >{item.name}</Text>
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
            </Box>}
        />

    )
}

export default UserList;