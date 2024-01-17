import React, { useEffect } from "react"
import { Dimensions } from 'react-native';
import { FlatList, TouchableOpacity } from "react-native";
import {
    VStack,
    Heading, Box, HStack, Badge, BadgeText, Icon, MailIcon, PhoneIcon, Text

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
            <VStack width="100%" mx="3" style={styles.pageHeader} >
                

                <VStack width="100%" mx="3" style={styles.pageHeader} >
               
                <HStack space="4xl" height="$20" alignItems='center'>
                    <Icon as={MoveLeft} size="xl"  onPress={() =>  navigation.goBack() } />
                <Text style={[styles.pageTitle, { textAlign: "center" }]} >BUSINESSES</Text>
                </HStack>


            </VStack>

                <FlatList style={{ height: Dimensions.get('window').height - 170 }}
                    data={businessListItems}
                    renderItem={({ item }) => <Box style={{ borderRadius: 5 }} bgColor="$white" m="$1" p="$2" pl="$5">
                        <VStack>
                            <TouchableOpacity
                                activeOpaticy={1}
                                onPress={() => selectItem(item)}>
                                <HStack justifyContent="space-between">
                                    <HStack justifyContent="right" space="lg"   >
                                        <VStack>
                                            <Text style={styles.listHeadingMedium} >{item.name}</Text>
                                            <Text style={styles.listSubDescription} >{item.country}</Text>
                                        </VStack>

                                    </HStack>

                                </HStack>
                                <HStack>
                                    <HStack justifyContent="flex-start">
                                        {item.email ? <Icon as={MailIcon} m="$1" w="$3" h="$3" /> : ""}<BadgeText style={[{ textTransform: 'capitalize', paddingTop: 0 }, styles.listSubHeading]}>{item.email}</BadgeText>
                                    </HStack>
                                    <HStack justifyContent="left">
                                        {item.phone ? <Icon as={PhoneIcon} m="$1" w="$3" h="$3" /> : ""}<BadgeText style={[{ textTransform: 'capitalize', paddingTop: 0 }, styles.listSubHeading]}>{item.phone}</BadgeText>
                                    </HStack>
                                </HStack>
                            </TouchableOpacity>
                        </VStack>
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