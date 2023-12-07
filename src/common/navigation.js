import React  from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../pages/splash';
import dashboard from '../pages/dashboard';
import BusinessEdit from '../pages/businessEdit'
import Login from "../pages/login";
const Stack = createNativeStackNavigator();
 function Navigation(){
return (<NavigationContainer initialRouteName="home">
      <Stack.Navigator screenOptions={{ headerShown: true  }}> 
      <Stack.Screen navigationKey="home"  name="Home" component={Splash} />
        <Stack.Screen  navigationKey="login" name="login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>)}
    export default Navigation;