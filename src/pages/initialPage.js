
import React from 'react';  
import { useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import {useEffect} from 'react'
import { View,Text} from 'react-native';
import {  navigationRoutes } from '../common/navigation'
function InitialPage (props){
    const initialPage = useSelector((state) => state.initialPage)
    const isFocused = useIsFocused();
  // <Text>{isFocused ? 'focused' : 'unfocused'}</Text>    
    useEffect(()=>{
      if(initialPage.routeParameters){
        props.navigation.navigate(initialPage.page,initialPage.routeParameters) 
      }
      else
      {
      //  props.navigation.navigate(initialPage.page)
       if(initialPage.page === navigationRoutes.navigationTab){
        props.navigation.navigate(initialPage.page,{screen:'dashboard'})
        }
        else
        {
          props.navigation.navigate(initialPage.page)
        } 
      }
        
     })

    return (
     <View style={{ height:'100%'}}>
       <Text>{' '}</Text>    
     </View>
    )
}
export default InitialPage;