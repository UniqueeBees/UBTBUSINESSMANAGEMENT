import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { HStack, VStack, Box, Badge, BadgeText, Heading, Text ,Button,ButtonText,Icon,AddIcon,View,MailIcon,PhoneIcon,MessageCircleIcon} from "@gluestack-ui/themed";
import { styles } from "../../assets/styles/theme";
import { useNavigation } from '@react-navigation/native';
function ContactList(props) {
    const navigation = useNavigation();
    return (
        <VStack>
            <FlatList style={{ height: "90%" }} showsVerticalScrollIndicator={false}
                data={props.contactItemList}
                renderItem={({ item }) => <Box style={[styles.listContentItem,styles.boxShadow]}  m="$1" p="$2" pl="$5">
                    <View>
                    <VStack>
                        <TouchableOpacity
                            activeOpaticy={1}
                            onPress={() => props.selectItem(item)}>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.listHeadingMedium} >{item.name}</Text>
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