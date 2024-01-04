import React,{useEffect,useState} from "react";
import {
    VStack,HStack,Icon ,ArrowRightIcon,Button,Heading,Box,Badge,BadgeText
  } from "@gluestack-ui/themed";
import { FlatList,View } from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../slices/loginSlice";
import { setPage } from '../slices/initialPageSlice';
import { resetUser } from "../slices/userSlice";
import { navigationRoutes } from '../common/navigation';

function Settings(){
const items=['language','company','user'];
const[selectedItem,setSelectedItem]=useState('');
const loginState = useSelector((state) => state.login.loginState)
const dispatch=useDispatch();
useEffect(()=>{
    if(!loginState){
        dispatch(setPage(navigationRoutes.login))
    }
  },[loginState])
const actionEvent=(item)=>{
if(item === "user"){
    dispatch(logout());
    dispatch(resetUser());
    setSelectedItem(item)

}
}
return(
    <View>
<FlatList 
        data={items}
        renderItem={({item}) => <Box style={{borderRadius:5}}  bgColor="$white" m="$2" p="$2" pl="$5">
          <VStack>
            <HStack>
          <Heading size="md" >{item}</Heading>
          <Icon id={item.code} size="xl"
             onPress={()=>{actionEvent(item)}}
             on as={ArrowRightIcon} m="$2" w="$4" h="$4" style={{cursor: 'pointer'}}  />
         </HStack>
       </VStack>
       </Box>}
      />
      </View>
);
}
export default Settings;