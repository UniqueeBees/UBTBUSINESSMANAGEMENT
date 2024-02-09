import React, { useState, useRef } from "react";
import { FlatList, TouchableOpacity, Pressable } from "react-native";
import { HStack, VStack, Box, Badge, BadgeText, Heading, Text, Button, ButtonText, Icon, AddIcon, Input, InputField ,View,MailIcon,PhoneIcon,MessageCircleIcon} from "@gluestack-ui/themed";
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

            <FlatList style={{ height: "90%" }} showsVerticalScrollIndicator={false}
                ref={flatListRef}
                data={contactList.list}
                renderItem={({ item }) => <Box style={[styles.listContentItem,styles.boxShadow]}  m="$1" p="$2" pl="$5">
                    <View>
                    <VStack>
                        <TouchableOpacity
                            activeOpaticy={1}
                            onPress={() => props.selectItem(item)}>
                            <HStack>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.listHeadingMedium} width={'93%'} >{item.name}</Text>
                                <HStack justifyContent="flex-end">
                                    <ListEditContextMenuLauncher type="contact" id={item.id} />

                                </HStack>
                            </HStack>

                            {item.designation && <Text style={styles.listSubDescription}>{item.designation}</Text>} 
                            <HStack justifyContent="flex-start">
                                        {item.email ? <Icon as={MailIcon} m="$1" w="$3" h="$3" ml="$0"/> : ""}<Text style={styles.listSubDescription}>{item.email}</Text>
                                    </HStack>
                            <HStack justifyContent="space-between"  >
                                    <HStack  justifyContent="flex-start">
                                        {item.mobile1 ? <Icon as={PhoneIcon} m="$1" w="$3" h="$3" ml="$0"/> : ""}<Text style={styles.listSubDescription}>{item.mobile1}</Text>
                                    </HStack>
                                    <HStack justifyContent="flex-end">
                                        {item.mobile2 ? <Icon as={MessageCircleIcon} m="$1" w="$3" h="$3" /> : ""}<Text style={styles.listSubDescription}>{item.mobile2}</Text>
                                    </HStack>
                                </HStack> 
                           
                        </TouchableOpacity>
                    </VStack>
                    </View>
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
                <ButtonText ><Icon color="$white" as={AddIcon} m="$2" w="$6" h="$6" /></ButtonText>
            </Button></VStack>

    )
}

export default ContactList;