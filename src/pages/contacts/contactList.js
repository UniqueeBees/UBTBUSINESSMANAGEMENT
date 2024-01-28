import React, { useState, useRef } from "react";
import { FlatList, TouchableOpacity, Pressable } from "react-native";
import { HStack, VStack, Box, Badge, BadgeText, Heading, Text, Button, ButtonText, Icon, AddIcon, Input, InputField } from "@gluestack-ui/themed";
import { styles } from "../../assets/styles/theme";
import { useNavigation } from '@react-navigation/native';
import ListEditContextMenuLauncher from "../../common/listEditContextMenu/listEditContextMenuLauncher";
function ContactList(props) {
    const navigation = useNavigation();
    const [contactList, setContactList] = useState({ list: props.contactItemList, search: '' });
    const flatListRef = useRef()
    const searchItems = (text) => {
        let newData = text.length > 0 ? props.contactItemList.filter(item => {
            const itemData = `${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;

        }) : props.contactItemList;
        setContactList({ list: newData, search: text })
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
    };
    return (
        <VStack space="2xl" >
            <Input size="lg" borderRadius="$2xl" >
                <InputField
                    placeholder={props.languageDTO.contactSearchPlaceholder}
                    value={contactList.search}
                    onChangeText={value => searchItems(value)}
                />
            </Input>

            <FlatList style={{ height: "84%" }} showsVerticalScrollIndicator={false}
                ref={flatListRef}
                data={contactList.list}
                renderItem={({ item }) => <Box style={{ borderRadius: 5 }} bgColor="$white" m="$2" p="$2" pl="$5">
                    <VStack>
                        <TouchableOpacity
                            activeOpaticy={1}
                            onPress={() => props.selectItem(item)}>
                            <HStack>
                                <Heading size="md" width={'93%'} >{item.name}</Heading>
                                <HStack justifyContent="flex-end">
                                    <ListEditContextMenuLauncher type="contact" id={item.id} />

                                </HStack>
                            </HStack>

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
            <Button
                size="md"
                variant="solid"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}

                style={styles.shortButton}

                onPress={() => navigation.navigate("contactSetup")}

            >
                <ButtonText ><Icon color="$white" as={AddIcon} m="$2" w="$4" h="$4" /></ButtonText>
            </Button></VStack>

    )
}

export default ContactList;