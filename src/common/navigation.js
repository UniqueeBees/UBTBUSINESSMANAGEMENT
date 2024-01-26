import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../pages/splash';
import language from '../pages/language';
import Login from "../pages/login";
import InitialPage from "../pages/initialPage";
import Tabs from '../navigation/tabs';
import CreateContact from "../pages/contacts/createContact";
import ChangePassword  from "../pages/settings/changePassword";
const Stack = createNativeStackNavigator();
export const navigationRoutes={
  company:"company",
  navigationTab:"navigationTab",
  language:"language",
  login:"login",
  initialPage:'initialPage',
  createBusiness:'createBusiness',
  listBusiness:'listBusiness' ,
  contact: 'contact',
  none:'none',
  changePassword:'changePassword',
} 

function Navigation(props){
  
return (<NavigationContainer>     
      <Stack.Navigator screenOptions={{ headerShown: false  }} initialRouteName={navigationRoutes.initialPage}>
        <Stack.Screen name={navigationRoutes.initialPage} component={InitialPage} />
        <Stack.Screen name={navigationRoutes.company} component={Splash} />
        <Stack.Screen name={navigationRoutes.navigationTab} component={Tabs} />
        <Stack.Screen name={navigationRoutes.language} component={language} />
        <Stack.Screen name={navigationRoutes.login} component={Login} /> 
        <Stack.Screen name={navigationRoutes.contact} component={CreateContact} /> 
        <Stack.Screen name={navigationRoutes.changePassword} component={ChangePassword} /> 
      </Stack.Navigator>
    </NavigationContainer>)}
    export default Navigation;