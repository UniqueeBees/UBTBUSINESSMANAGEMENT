import React,{useEffect,useRef} from "react"
import {
  VStack,HStack,
  FormControl,
  Input,
  Center,Icon ,ArrowRightIcon,Button,Heading,Box
} from "@gluestack-ui/themed"
import {FlatList, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import { getLanguage,getLanguageLabel } from "../common/apiCalls";
import {storeObjectData,storageKeyTypes,getObjectData} from '../common/localStorage'
import {  navigationRoutes } from '../common/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { setLanguage } from '../slices/languageSlice'
import { setPage} from '../slices/initialPageSlice'
function Language (props) {
  const dispatch = useDispatch()
  const languageState = useSelector((state) => state.language)
  const companyId=useSelector((state)=>state.company.company.id)
  const hasLogin=useSelector((state)=>state.login.loginState)
  const isInitialMount = useRef(true);
  useEffect(()=>{
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else 
   {
    if(languageState.language){
      
      if(companyId === -1){
        dispatch(setPage(navigationRoutes.company))
      }
      else
      {
        if(hasLogin){
          dispatch(setPage(navigationRoutes.navigationTab))
        }
        else{
          dispatch(setPage(navigationRoutes.login))
        }

      }
      
    }
  }
  },[languageState.language])
  

  const [languageData, setData] = React.useState()
  
  const fetchInfo = async() => {
   const response= await getLanguage();
   setData(response.languages)    
    
  }

  const SetLanguage = async(code) => {
    
    const response= await getLanguageLabel(code);
    
    const data={code:code,translations:response.translations}
  
    storeObjectData(storageKeyTypes.language,data)
    dispatch(setLanguage(data));
        
  }
  React.useEffect(() => {
    fetchInfo();
  }, []);
  
  return (
    <VStack>
    <Heading size="lg" style={{textAlign:"center",paddingBottom:50,paddingTop:50,width:"100%"}}>Choose Language</Heading>
    
      <VStack space="2xl" height="100%" >
      
      
      <FlatList 
        data={languageData}
        renderItem={({item}) =>
         <HStack onPress={()=>{SetLanguage(item.code)}} mt="$5" pl="$10" bgColor="$white" textAlign="left"><Text style={{width:"80%",textAlign:"left",fontSize:16}} onPress={()=>{SetLanguage(item.code)}}>{item.name}</Text>
       <Icon id={item.code} size="xl"
       onPress={()=>{SetLanguage(item.code)}}
         on as={ArrowRightIcon} m="$2" w="$4" h="$4" style={{cursor: 'pointer'}}  />
         </HStack>
        }
      />
      </VStack>
    </VStack>

    
   
  )
} 
export default Language;
