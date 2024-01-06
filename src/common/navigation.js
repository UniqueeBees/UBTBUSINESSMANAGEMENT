import React  from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../pages/splash';
import dashboard from '../pages/dashboard';
import language from '../pages/language';
import contact from '../pages/contact'
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

  console.log('Navigation',props)
return (<NavigationContainer>
     
      <Stack.Navigator screenOptions={{ headerShown: false  }} initialRouteName="contact">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Dashboard" component={dashboard} />
        <Stack.Screen name={navigationRoutes.language} component={language} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="contact" component={contact} />
      </Stack.Navigator>
    </NavigationContainer>)}
    export default Navigation;