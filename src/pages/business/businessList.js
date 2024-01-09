import { React, useState, useEffect } from "react"

import {
  Button, VStack, Center, ButtonText, ButtonIcon,
  Heading, Text, Image,FlatList,Box,HStack,Badge,BadgeText,Icon ,ArrowLeftIcon,MailIcon,PhoneIcon 
   
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
      <HStack space="xs" pr="$10"><Icon  size="xl"
       onPress={()=>{}}
         on as={ArrowLeftIcon} ml="$5" mt="$2" w="$4" h="$4" style={{cursor: 'pointer'}}  />
       <Heading textAlign="center" width="100%" > BUSINESSES</Heading>
               
        
      </HStack>
     
      <FlatList style={{height:"84%"}}
        data={businessListItems}
        renderItem={({ item }) => <Box style={{ borderRadius: 5 }} bgColor="$white" m="$2" p="$2" pl="$5">
          <VStack>
            <Heading size="md" >{item.name}</Heading> 
            <VStack  pt="$2" >
              <Badge variant="solid"  action="muted">
              {item.email?<Icon as={MailIcon} m="$2" w="$4" h="$4" />:""}<BadgeText style={{textTransform: 'capitalize'}}>{item.email}</BadgeText>
              </Badge>
              </VStack>
              <VStack>
              <Badge variant="solid" action="muted"  >
              {item.phone?<Icon as={PhoneIcon} m="$2" w="$4" h="$4" />:""}<BadgeText style={{textTransform: 'capitalize'}}>{item.phone}</BadgeText>
              </Badge>
            </VStack>
          </VStack>
        </Box>}
      />    
       
        <Button 
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        
        style={styles.shortButton }

        onPress={()=>navigation.navigate("businessDetails")}

      >
     <ButtonText >Add</ButtonText>    
      </Button>
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