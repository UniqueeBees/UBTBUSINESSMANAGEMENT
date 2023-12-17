import React  from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../pages/splash';
import dashboard from '../pages/dashboard';
import language from '../pages/language';
import BusinessEdit from '../pages/businessEdit'
import Login from "../pages/login";
const Stack = createNativeStackNavigator();
export const navigationRoutes={
  Splash:"splash",
  Dashboard:"dashboard",
  Language:"language",
  Login:"login"
}
export const navAction={
  Next:"next",
  Previous:"previous",
  Same:"same"
}
export function navigateTo(props,actionFrom,navAction){
  switch(actionFrom){
    case navigationRoutes.Splash :{
      props.navigation.navigate(navigationRoutes.Login)
      break;
    }
    case navigationRoutes.Login :{
      console.log("nav route login",navAction)
     // props.navigation.navigate(navigationRoutes.Splash)
      if(navAction.Next){
      props.navigation.navigate(navigationRoutes.Login)
      } else if (navAction.Previous)
      {
        console.log("nav route login previous")
        props.navigation.navigate(navigationRoutes.Splash)
      }
      break;
    }
  }
}
 function Navigation(){
return (<NavigationContainer>
     
      <Stack.Navigator screenOptions={{ headerShown: false  }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Dashboard" component={dashboard} />
        <Stack.Screen name="Language" component={language} />
        <Stack.Screen name="login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>)}
    export default Navigation;