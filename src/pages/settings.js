import React,{useEffect,useState} from "react";
import {
    VStack,HStack,Icon ,ArrowRightIcon,Button,Heading,Box,Badge,BadgeText
  } from "@gluestack-ui/themed";
import { FlatList,View } from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../slices/loginSlice";
import { setPage,setPageWithParameters } from '../slices/initialPageSlice';
import { resetUser } from "../slices/userSlice";
import { navigationRoutes } from '../common/navigation';
function Settings(){
  
const dispatch=useDispatch();
const[selectedItem,setSelectedItem]=useState('');
const loginState = useSelector((state) => state.login.loginState)
const companyId = useSelector((state) => state.company.company.id)
const settingsLanguageDTO=useSelector((state)=>state.language.settingsLanguageDTO)

const items=[
  {key:'language',category:1,order:1,label:settingsLanguageDTO.changeLanguage},
  {key:'company',category:2,order:2,label:settingsLanguageDTO.changeCompany},
  {key:'user',category:3,order:3,label:settingsLanguageDTO.logout},
  {key:'helpLine',category:4,order:4,label:settingsLanguageDTO.helpLineNumber},
  {key:'password',category:3,order:5,label:settingsLanguageDTO.changePassword},
];

useEffect(()=>{
    if(!loginState){
        dispatch(resetUser());
        dispatch(setPage(navigationRoutes.login))
    }
  },[loginState])
const actionEvent=(item)=>{
  if(item.key === "user"){
      setSelectedItem("user");
      dispatch(logout());
  }
  else if(item.key === "language"){
    dispatch(setPage(navigationRoutes.language))
  }
  else if(item.key === "company"){
    dispatch(setPageWithParameters({page:navigationRoutes.company,routeParameters:{skipEffectNav:true}}))
  }
}
const getItems=()=>{
  if(loginState){
    return items;
  }
  else
  {
    if(companyId >-1)
    {
      return  items.filter(items=>items.category !== 3)
    }
    else
    {
      return  items.filter(items=>items.category !== 3 && items.category !== 2)
    }
  }
}
return(
    <View>
<FlatList 
        data={getItems()}
        renderItem={({item}) => <Box style={{borderRadius:5}}  bgColor="$white" m="$2" p="$2" pl="$5">
          <VStack>
            <HStack>
          <Heading size="md" >{item.label}</Heading>
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