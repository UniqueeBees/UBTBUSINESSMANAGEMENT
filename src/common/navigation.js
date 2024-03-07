import React from "react"
import { NavigationContainer,DefaultTheme,
  DarkTheme } from '@react-navigation/native';
  import { useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../pages/splash';
import language from '../pages/language';
import Login from "../pages/login";
import InitialPage from "../pages/initialPage";
import Tabs from '../navigation/tabs';
import CreateContact from "../pages/contacts/createContact";
import ChangePassword  from "../pages/changePassword";
import StartTravel from "../pages/travel/startTravel";
import Feeds from "../pages/business/feeds/feeds";
import AudioRecorder from "../pages/business/feeds/audioRecordercl";
const Stack = createNativeStackNavigator();
export const navigationRoutes = {
  company: "company",
  navigationTab: "navigationTab",
  language: "language",
  login: "login",
  initialPage: 'initialPage',
  createBusiness: 'createBusiness',
  listBusiness: 'listBusiness',
  contact: 'contact',
  none:'none',
  changePassword:'changePassword',
  feeds:'feeds',
  startTravel:'startTravel',
  startRecording:'startRecording'
} 

 function Navigation(props){
  const scheme = useColorScheme();
 return(<NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>     
      <Stack.Navigator screenOptions={{ headerShown: false  }} initialRouteName={navigationRoutes.initialPage}>
        <Stack.Screen name={navigationRoutes.initialPage} component={InitialPage} />
        <Stack.Screen name={navigationRoutes.company} component={Splash} />
        <Stack.Screen name={navigationRoutes.navigationTab} component={Tabs} />
        <Stack.Screen name={navigationRoutes.language} component={language} />
        <Stack.Screen name={navigationRoutes.login} component={Login} /> 
        <Stack.Screen name={navigationRoutes.contact} component={CreateContact} /> 
        <Stack.Screen name={navigationRoutes.changePassword} component={ChangePassword} /> 
        <Stack.Screen name={navigationRoutes.startTravel} component={StartTravel} /> 
        <Stack.Screen name={navigationRoutes.feeds} component={Feeds} /> 
        <Stack.Screen name={navigationRoutes.startRecording} component={AudioRecorder} /> 
      </Stack.Navigator>
    </NavigationContainer>)}
    export default Navigation;