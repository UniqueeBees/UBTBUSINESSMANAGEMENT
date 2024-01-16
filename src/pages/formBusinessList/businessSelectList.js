import  React, {useEffect } from "react"
import { Dimensions } from 'react-native';
import { FlatList, TouchableOpacity } from "react-native";
import {
    VStack,
    Heading, Box, HStack, Badge, BadgeText, Icon, ArrowLeftIcon, MailIcon, PhoneIcon, AddIcon

} from "@gluestack-ui/themed";
import { styles } from '../../assets/styles/theme'
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { getBusinessListItems, setBusinessSelectFromForm } from '../../slices/businessSlice';


function BusinessSelectList(props) {
    const businessListItems = useSelector((state) => state.business.businessList);
    const token = useSelector((state) => state.login.token)
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const selectItem = (item) => {
        dispatch(setBusinessSelectFromForm({business:item}));
        navigation.goBack();
    }
    useEffect(() => {
        
        if (businessListItems.length ===0 ) {
            dispatch(getBusinessListItems(token))
        }
    }, [])

    function createList() {
        return (
            <VStack width="100%" mx="3" style={styles.pageHeader} >
                <HStack space="xs" textAlign="center">
                    <Heading textAlign="center" width="100%" fontSize={16} >BUSINESSES</Heading>


                </HStack>

                <FlatList style={{ height: Dimensions.get('window').height - 170 }}
                    data={businessListItems}
                    renderItem={({ item }) => <Box style={{ borderRadius: 5 }} bgColor="$white" m="$2" p="$2" pl="$5">
                        <VStack>
                            <TouchableOpacity
                                activeOpaticy={1}
                                onPress={() => selectItem(item)}>
                                <HStack >
                                    <Heading size="md" >{item.name}</Heading>
                                </HStack>
                                <VStack pt="$2" >
                                    <Badge variant="solid" action="muted">
                                        {item.email ? <Icon as={MailIcon} m="$2" w="$4" h="$4" /> : ""}<BadgeText style={{ textTransform: 'capitalize' }}>{item.email}</BadgeText>
                                    </Badge>
                                </VStack>
                                <VStack>
                                    <Badge variant="solid" action="muted"  >
                                        {item.phone ? <Icon as={PhoneIcon} m="$2" w="$4" h="$4" /> : ""}<BadgeText style={{ textTransform: 'capitalize' }}>{item.phone}</BadgeText>
                                    </Badge>
                                </VStack>
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