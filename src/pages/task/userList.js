import React, { useState, useRef } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { styles } from '../../assets/styles/theme'
import { HStack, VStack, Box, Badge, BadgeText, Heading, Text, Input, InputField,Icon, MailIcon, PhoneIcon, MessageCircleIcon } from "@gluestack-ui/themed";
function UserList(props) {
    const [userList, setUserList] = useState({ list: props.userItemList, search: '' });
    const flatListRef = useRef()
    const searchItems = (text) => {
        let newData = text.length > 0 ? props.userItemList.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;

        }) : props.userItemList;
        setUserList({ list: newData, search: text })
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
    };
    return (
<VStack space="2xl" >

<Input size="lg" borderRadius="$2xl" >
    <InputField
        placeholder={props.languageDTO.executiveSearchPlaceholder}
        value={userList.search}
        onChangeText={value => searchItems(value)}
    />
</Input>
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