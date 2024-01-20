import React, { useEffect } from "react"
import { Dimensions } from 'react-native';
import { FlatList, TouchableOpacity } from "react-native";
import {
    VStack,
    Heading, Box, HStack, Badge, BadgeText, Icon, MailIcon, PhoneIcon, Text,View

} from "@gluestack-ui/themed";
import { MoveLeft } from "lucide-react-native";
import { styles } from '../../assets/styles/theme'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { getBusinessListItems, setBusinessSelectFromForm } from '../../slices/businessSlice';


function BusinessSelectList() {
    const businessListItems = useSelector((state) => state.business.businessList);
    const token = useSelector((state) => state.login.token)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const selectItem = (item) => {
        dispatch(setBusinessSelectFromForm({ business: item }));
        navigation.goBack();
    }
    useEffect(() => {

        if (businessListItems.length === 0) {
            dispatch(getBusinessListItems(token))
        }
    }, [])

    function createList() {
        return (
            <VStack width="100%" mx="3" style={styles.tabPageContent} >
                <VStack width="100%" mx="3" style={styles.pageHeader} >
                    <HStack space="4xl" height="$20" alignItems='center'>
                        <Icon as={MoveLeft} size="xl" onPress={() => navigation.goBack()} />
                        <Text style={[styles.pageTitle, { textAlign: "center" }]} >BUSINESSES</Text>
                    </HStack>
                </VStack>
                <FlatList showsVerticalScrollIndicator={false}
                    data={businessListItems}
                    renderItem={({ item }) => <Box style={[styles.listContentItem,styles.boxShadow]}  m="$1" p="$2" pl="$5">
                        <View  > 
                        <VStack>
                            <TouchableOpacity
                                activeOpaticy={1}
                                onPress={() => selectItem(item)}>
                                <HStack justifyContent="space-between">
                                    <HStack justifyContent="right" space="lg"   >
                                        <VStack>
                                            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.listHeadingMedium} >{item.name}</Text>
                                            <Text style={styles.listSubDescription} >{item.country}</Text>
                                        </VStack> 
                                    </HStack>  
                                </HStack>
                                <HStack>
                                    <HStack justifyContent="flex-start">
                                        {item.email ? <Icon as={MailIcon} m="$1" w="$3" h="$3" ml="$0" /> : ""}<BadgeText style={[{ textTransform: 'capitalize', paddingTop: 0 }, styles.listSubHeading]}>{item.email}</BadgeText>
                                    </HStack>
                                    <HStack justifyContent="left">
                                        {item.phone ? <Icon as={PhoneIcon} w="$3" h="$3" ml={item.email?"$3":"$0"} /> : ""}<BadgeText style={[{ textTransform: 'capitalize', paddingTop: 0 }, styles.listSubHeading]}>{item.phone}</BadgeText>
                                    </HStack>
                                </HStack>
                            </TouchableOpacity>
                        </VStack>
                        </View>
                    </Box>}
                />


            </VStack>

        )
    }
    return (

        <VStack>
            {createList()}
        </VStack>
    )
}

export default BusinessSelectList;