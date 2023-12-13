import React  from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../pages/splash';
import dashboard from '../pages/dashboard';
import language from '../pages/language';
import BusinessEdit from '../pages/businessEdit'
import Login from "../pages/login";
const Stack = createNativeStackNavigator();
 function Navigation(props){
return (<NavigationContainer>
     
      <Stack.Navigator screenOptions={{ headerShown: false  }} initialRouteName={props.initialPage ?props.initialPage:"Language"}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Dashboard" component={dashboard} />
        <Stack.Screen name="Language" component={language} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>)}
    export default Navigation;