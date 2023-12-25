
import React from 'react';  
import { useSelector } from 'react-redux'
import {useEffect} from 'react'
import { View} from 'react-native';
function InitialPage (props){
    const initialPage = useSelector((state) => state.initialPage.page)

    useEffect(()=>{
        props.navigation.navigate(initialPage)
         
     },[initialPage])
    return (
     <View style={{ height:'100%'}}>
            
     </View>
    )
}
export default InitialPage;