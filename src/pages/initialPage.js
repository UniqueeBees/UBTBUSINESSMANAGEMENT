
import React from 'react';  
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import {useEffect} from 'react'
import { View,Text} from 'react-native';
function InitialPage (props){
    const initialPage = useSelector((state) => state.initialPage.page)
    const isFocused = useIsFocused();
  // <Text>{isFocused ? 'focused' : 'unfocused'}</Text>    
    useEffect(()=>{
        props.navigation.navigate(initialPage) 
     })

    return (
     <View style={{ height:'100%'}}>
       <Text>{' '}</Text>    
     </View>
    )
}
export default InitialPage;