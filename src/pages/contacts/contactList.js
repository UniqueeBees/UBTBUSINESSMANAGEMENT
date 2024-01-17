import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { HStack, VStack, Box, Badge, BadgeText, Heading, Text ,Button,ButtonText,Icon,AddIcon,View} from "@gluestack-ui/themed";
import { styles } from "../../assets/styles/theme";
import { useNavigation } from '@react-navigation/native';
function ContactList(props) {
    const navigation = useNavigation();
    return (
        <VStack>
            <FlatList style={{ height: "90%" }} showsVerticalScrollIndicator={false}
                data={props.contactItemList}
                renderItem={({ item }) => <Box style={[styles.listContentItem,styles.boxShadow]}  m="$2" p="$2" pl="$5">
                    <View>
                    <VStack>
                        <TouchableOpacity
                            activeOpaticy={1}
                            onPress={() => props.selectItem(item)}>
                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.listHeadingMedium} >{item.name}</Text>
                            {item.designation && <Text style={styles.listSubDescription}>{item.designation}</Text>}
                            {item.email && <Text style={styles.listSubDescription}>{item.email}</Text>}
                            <HStack space="md" justifyContent="flex-end">

                                <Badge size="md" variant="solid" borderRadius="$xl" action="muted" >
                                    <BadgeText color="$white" style={styles.listSubHeading}>{item.mobile1}</BadgeText>
                                </Badge>
                                <Badge size="md" variant="solid" borderRadius="$xl" action="muted" >
                                    <BadgeText style={styles.listSubHeading}>{item.mobile2}</BadgeText>
                                </Badge>
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