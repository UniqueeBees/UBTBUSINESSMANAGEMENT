import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { HStack, VStack, Box, Badge, BadgeText, Heading, Text } from "@gluestack-ui/themed";
function ContactList(props) {
    return (

        <FlatList style={{ height: "84%" }}
            data={props.contactItemList}
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

    )
}

export default ContactList;