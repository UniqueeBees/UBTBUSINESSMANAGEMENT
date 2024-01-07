import { React, useState, useEffect } from "react"

import {
  Button, VStack, Center, ButtonText, ButtonIcon,
  Heading, Text, Image,FlatList,Box,HStack,Badge,BadgeText
} from "@gluestack-ui/themed";
import { styles } from '../../assets/styles/theme'
import { Building2, ArrowRight } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import BusinessDetails from "./businessDetails";
import BusinessCreate from "./businessCreate";
import { useSelector,useDispatch } from 'react-redux';
import { getBusinessListItems } from '../../slices/businessSlice';
 

function BusinessList(props) {
  const businessListItems = useSelector((state) => state.business.businessList);
  const token = useSelector((state) => state.login.token)
  const dispatch = useDispatch()
  const navigation = useNavigation();


  useEffect(() => {
    dispatch(getBusinessListItems(token))
  }, [token])

  function createList() {
    console.log("businessList",businessListItems)
    return (
      <VStack width="100%" mx="3" style={styles.pageHeader} >
      <HStack space="xs">
       <Heading > Business List</Heading>
       
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}

            style={styles.shortButton}

            onPress={()=>navigation.navigate("businessDetails")}

          >
            <ButtonText >Add</ButtonText>
           
          </Button>
        
      </HStack>
     
      <FlatList
        data={businessListItems}
        renderItem={({ item }) => <Box style={{ borderRadius: 5 }} bgColor="$white" m="$2" p="$2" pl="$5">
          <VStack>
            <Heading size="md" >{item.name}</Heading> 
            <HStack space="md" justifyContent="flex-end">

              <Badge size="md" variant="solid" borderRadius="$xl" action="muted" >
                <BadgeText>{item.email}</BadgeText>
              </Badge>
              <Badge size="md" variant="solid" borderRadius="$xl" action="muted" >
                <BadgeText >{item.phone}</BadgeText>
              </Badge>
            </HStack>
          </VStack>
        </Box>}
      />
       </VStack>
    )
  }
  return (

    <VStack>
      {businessListItems.length === 0 ? <BusinessCreate /> : createList()}
    </VStack>
  )
}

export default BusinessList;