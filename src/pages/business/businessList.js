import { React, useState, useEffect } from "react"
import {Dimensions,View} from 'react-native';
import {
  Button, VStack, Center, ButtonText, ButtonIcon,
  Heading, Text, Image,FlatList,Box,HStack,Badge,BadgeText,Icon ,ArrowLeftIcon,MailIcon,PhoneIcon ,AddIcon,
  EditIcon
} from "@gluestack-ui/themed";
import { styles } from '../../assets/styles/theme'
import { Building2, ArrowRight, PenIcon, DeleteIcon, TrashIcon ,MoveLeft, AlignCenter} from 'lucide-react-native';
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
    const shadowStyle={
      shadowOpacity:1
    }
    return (
      <VStack style={styles.tabPageContent}>
        <VStack width="100%" mx="3" style={styles.pageHeader} >
        
         <Text style={[styles.pageTitle,{ textAlign:"center"}]} >BUSINESSES</Text>
         
        </VStack> 
        
      <FlatList  showsVerticalScrollIndicator={false}
        data={businessListItems}
        renderItem={({ item }) =>
        
         <Box style={[styles.listContentItem,styles.boxShadow]}   m="$2" p="$2" pl="$5">
          <View  > 
          <VStack>
            <HStack   justifyContent="space-between"> 
              <HStack justifyContent="right" space="lg"   > 
              <VStack>
              <Text style={styles.listHeadingMedium} >{item.name}</Text>  
              <Text style={styles.listSubDescription} >{item.country}</Text> 
              </VStack>
             
              </HStack> 
              <HStack justifyContent="right" space="lg"   > 
              <Icon as={TrashIcon} m="$2" w="$4" h="$4" />
              <Icon as={EditIcon} m="$2" w="$4" h="$4" />
              </HStack>
            </HStack>
            <HStack> 
              <HStack justifyContent="flex-start">
              {item.email?<Icon as={MailIcon} m="$1" w="$3" h="$3" />:""}<BadgeText  style={[{textTransform: 'capitalize',paddingTop:0},styles.listSubHeading]}>{item.email}</BadgeText>
              </HStack>
              <HStack justifyContent="left">
              {item.phone?<Icon as={PhoneIcon} m="$1" w="$3" h="$3" />:""}<BadgeText style={[{textTransform: 'capitalize',paddingTop:0},styles.listSubHeading]}>{item.phone}</BadgeText>
              </HStack>
            </HStack>
          </VStack>
          </View>
        </Box>
      
        }
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

    <View  >
      {businessListItems.length === 0 ? <BusinessCreate /> : createList()}
    </View>
  )
}

export default BusinessList;