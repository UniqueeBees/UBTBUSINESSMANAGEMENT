import React  from "react"
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../pages/splash';
import dashboard from '../pages/dashboard';
import language from '../pages/language';
import BusinessEdit from '../pages/businessEdit'
import Login from "../pages/login";
const Stack = createNativeStackNavigator();
export const navigationRoutes={
  company:"company",
  dashboard:"dashboard",
  language:"language",
  login:"login"
}
export const navAction={
  Next:"next",
  Previous:"previous",
  Same:"same"
}
export function navigateTo(props,actionFrom,navAction){
  switch(actionFrom){
    case navigationRoutes.splash :{
      props.navigation.navigate(navigationRoutes.login)
      break;
    }
    case navigationRoutes.login :{
      console.log("nav route login",navAction)
     // props.navigation.navigate(navigationRoutes.Splash)
      if(navAction.Next){
      props.navigation.navigate(navigationRoutes.login)
      } else if (navAction.Previous)
      {
        console.log("nav route login previous")
        props.navigation.navigate(navigationRoutes.company)
      }
      break;
    }
  }
}
 function Navigation(props){
  const initialPage = useSelector((state) => state.initialPage.page)
  console.log('Navigation-initialPage',initialPage)
return (<NavigationContainer>
     
      <Stack.Navigator screenOptions={{ headerShown: false  }} initialRouteName={initialPage}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Dashboard" component={dashboard} />
        <Stack.Screen name={navigationRoutes.language} component={language} />
        <Stack.Screen name={navigationRoutes.login} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>)}
    export default Navigation;