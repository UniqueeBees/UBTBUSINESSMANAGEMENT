import React, { useState, useRef } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { HStack, VStack, Box, Badge, BadgeText, Heading, Text, Input, InputField } from "@gluestack-ui/themed";
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
            <FlatList style={{ height: "84%" }} showsVerticalScrollIndicator={false}
                ref={flatListRef}
                data={userList.list}
                renderItem={({ item }) => <Box style={{ borderRadius: 5 }} bgColor="$white" m="$2" p="$2" pl="$5">
                    <VStack>
                        <TouchableOpacity
                            activeOpaticy={1}
                            onPress={() => props.selectItem(item)}>
                            <Heading size="md" >{item.name}</Heading>
                            {item.designation && <Text>{item.designation}</Text>}
                            {item.email && <Text>{item.email}</Text>}
                            <HStack space="md" justifyContent="flex-end">

                                <Badge size="md" variant="solid" borderRadius="$xl" action="muted" >
                                    <BadgeText color="$white">{item.mobile1}</BadgeText>
                                </Badge>
                                <Badge size="md" variant="solid" borderRadius="$xl" action="muted" >
                                    <BadgeText >{item.mobile2}</BadgeText>
                                </Badge>
                            </HStack>
                        </TouchableOpacity>
                    </VStack>
                </Box>}
            />
        </VStack>
    )
}

export default UserList;