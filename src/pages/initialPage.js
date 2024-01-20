
import React from 'react';  
import { useSelector,useDispatch } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import {useEffect} from 'react'
import { View,Text} from 'react-native';
import {  navigationRoutes } from '../common/navigation'
import { setPage } from '../slices/initialPageSlice';
function InitialPage (props){
    const initialPage = useSelector((state) => state.initialPage)
    const isFocused = useIsFocused();
    const dispatch=useDispatch();
  // <Text>{isFocused ? 'focused' : 'unfocused'}</Text>    
    useEffect(()=>{
      if(initialPage.page !== navigationRoutes.none){
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
          console.log('Initial Page', initialPage.page)
          props.navigation.navigate(initialPage.page)
          if(initialPage.page !== navigationRoutes.login)
          dispatch(setPage(navigationRoutes.none))
        } 
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