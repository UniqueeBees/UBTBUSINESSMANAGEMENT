import React,{useEffect,useRef} from "react"
import {
  VStack,HStack,
  FormControl,
  Input,
  Center,Icon ,ArrowRightIcon,Button,Heading,Box
} from "@gluestack-ui/themed"
import {FlatList, StyleSheet, Text, View,TouchableOpacity,TouchableHighlight} from 'react-native';
import { getLanguage,getLanguageLabel } from "../common/apiCalls";
import {storeObjectData,storageKeyTypes,getObjectData} from '../common/localStorage'
import {  navigationRoutes } from '../common/navigation'
import { useSelector, useDispatch } from 'react-redux'
import { setLanguage } from '../slices/languageSlice'
import { setPage} from '../slices/initialPageSlice'
import { styles } from '../assets/styles/theme'
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
    <VStack bgColor="$white" height="100%">
    <Heading size="lg" style={styles.langugeHeading}>Choose Language</Heading>
    <VStack space="md"  width="100%" pl={65}  pr={65} >
      <VStack space="md" bgColor="#F0FFFF" width="100%"  pt="$1" >
      <FlatList 
        data={languageData}
        renderItem={({item}) =>
        <TouchableHighlight onPress={()=>{SetLanguage(item.code)}} underlayColor="white">
         <HStack mb="$1" alignItems="center" height={60} backgroundColor="$white" borderRadius={30}  textAlign="left"><Text style={{width:"90%",textAlign:"left",fontSize:16}} >{item.name}</Text>
       <Icon id={item.code} size="xl"   
         on as={ArrowRightIcon} m="$2" w="$4" h="$4" style={{cursor: 'pointer'}}  />
         </HStack></TouchableHighlight>
        }
      />
      </VStack>
      </VStack>

    </VStack>

    
   
  )
} 
export default Language;
