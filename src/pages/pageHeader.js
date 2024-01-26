import React,{useEffect} from "react"
import {
  VStack,
   
  Icon,
   
  HStack,
   
  Text
,Box,
Center
} from "@gluestack-ui/themed"
 
import { styles } from '../assets/styles/theme'
import { useNavigation } from "@react-navigation/native";
 
import { MoveLeft,Camera,MenuSquare } from 'lucide-react-native';
 
export default function PageHeader(props) {
    const navigation = useNavigation();
    return (
        <VStack width="100%" mx="3" style={styles.pageHeader} >
        <HStack space="4xl" style={{marginTop:8}} > 
        {props.goBack && <Center><Icon as={MoveLeft} size="lg"  onPress={()=>props.goBack==="goback"?navigation.goBack():navigation.navigate(props.goBack)}/></Center>}
        <Center><Text style={styles.listHeadingMedium} >{props.heading}</Text></Center>
        {props.showNotifi && <Center style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}} ><Box style={styles.notificationIconContainer}><Center><Icon as={MenuSquare} fill="#FFCC01" size="xl" style={styles.notificationIcon} ></Icon></Center></Box></Center>}
        </HStack> 
        </VStack>
    )
}
