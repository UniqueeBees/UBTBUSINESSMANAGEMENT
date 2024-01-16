import { React, useState, useEffect } from "react"
import {Dimensions,View} from 'react-native';
import {
  Button, VStack, Center, ButtonText, ButtonIcon,
  Heading, Text, Image,FlatList,Box,HStack,Badge,BadgeText,Icon ,ArrowLeftIcon,MailIcon,PhoneIcon ,AddIcon
   
} from "@gluestack-ui/themed";
import { styles } from '../../assets/styles/theme'
import { Building2, ArrowRight, PenIcon, DeleteIcon } from 'lucide-react-native';
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
      <VStack>
      <HStack space="xs" textAlign="center">
       <Heading textAlign="center" width="100%" fontSize={16} >BUSINESSES</Heading> 
      </HStack>
     
      <FlatList style={styles.tabPageContent} showsVerticalScrollIndicator={false}
        data={businessListItems}
        renderItem={({ item }) => <Box style={styles.listContentItem}  bgColor="$white" m="$2" p="$2" pl="$5">
          <VStack>
            <HStack style={{width:100}}>
            
            <Heading size="md" >{item.name}</Heading> 
          
            <HStack justifyContent="right" space="lg" style={{width:20}} > 
            <Icon as={DeleteIcon} m="$2" w="$4" h="$4" />
            <Icon as={PenIcon} m="$2" w="$4" h="$4" />
            </HStack>
            </HStack>
            <VStack    >
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
     <ButtonText ><Icon color="$white" as={AddIcon} m="$2" w="$4" h="$4" /></ButtonText>    
      </Button>
      </VStack>
      
       
    )
  }
  return (

    <View style={{height:'100%'}}>
      {businessListItems.length === 0 ? <BusinessCreate /> : createList()}
    </View>
  )
}

export default BusinessList;