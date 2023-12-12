import React from "react"
import {
  VStack,HStack,
  FormControl,
  Input,
  Center,Icon ,ArrowRightIcon,Button,Heading
} from "@gluestack-ui/themed"
import {FlatList, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import { getLanguage,getLanguageLabel } from "../common/apiCalls";
import {storeObjectData,storageKeyTypes,getObjectData} from '../common/localStorage'

import { useSelector, useDispatch } from 'react-redux'
import { setLanguage } from '../slices/languageSlice'
import { Box } from "lucide-react-native";
function Language (props) {
  const dispatch = useDispatch()
  const languageState = useSelector((state) => state.language)
  if(languageState.language){
    props.navigation.navigate('Splash')
  }

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
    
     
    <View>
      <Heading size="lg" style={{textAlign:"center",paddingBottom:50,paddingTop:50}}>Choose Language</Heading>
      <FlatList 
        data={languageData}
        renderItem={({item}) => <HStack><Text style={{marginLeft:'50px',width:"50%"}}>{item.name}</Text>
       <Icon id={item.code} size="xl"
       onPress={()=>{SetLanguage(item.code)}}
         on as={ArrowRightIcon} m="$2" w="$4" h="$4" style={{cursor: 'pointer'}}  /></HStack>}
      />
    </View>

    
   
  )
} 
export default Language;
