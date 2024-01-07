import React  from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../pages/splash';
import Dashboard from '../pages/dashboard';
import language from '../pages/language';
import BusinessEdit from '../pages/businessEdit'
import Login from "../pages/login";
import InitialPage from "../pages/initialPage";
import Tabs from '../navigation/tabs';
const Stack = createNativeStackNavigator();
export const navigationRoutes={
  company:"company",
  navigationTab:"navigationTab",
  language:"language",
  login:"login",
  initialPage:'initialPage',
  createBusiness:'createBusiness',
  listBusiness:'listBusiness' 
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
    case navigationRoutes.listBusiness :{
      console.log("nav route login",navAction) 
      if(navAction.Next){
      props.navigation.navigate(navigationRoutes.createBusiness)
      } else if (navAction.Previous)
      {
        console.log("nav route login previous")
        props.navigation.navigate(navigationRoutes.listBusiness)
      }
      break;
    } 
  }
}
 function Navigation(props){
  
return (<NavigationContainer>
     
      <Stack.Navigator screenOptions={{ headerShown: false  }} initialRouteName={navigationRoutes.initialPage}>
        <Stack.Screen name={navigationRoutes.initialPage} component={InitialPage} />
        <Stack.Screen name={navigationRoutes.company} component={Splash} />
        <Stack.Screen name={navigationRoutes.navigationTab} component={Tabs} />
        <Stack.Screen name={navigationRoutes.language} component={language} />
        <Stack.Screen name={navigationRoutes.login} component={Login} /> 
       
      </Stack.Navigator>
    </NavigationContainer>)}
    export default Navigation;