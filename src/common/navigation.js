import React  from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../pages/splash';
import dashboard from '../pages/dashboard';
import language from '../pages/language';
import BusinessEdit from '../pages/businessEdit'
import Login from "../pages/login";
const Stack = createNativeStackNavigator();
 function Navigation(){
return (<NavigationContainer initialRouteName="Language">
      <Stack.Navigator screenOptions={{ headerShown: false  }}>
        <Stack.Screen name="Home" component={Splash} />
        <Stack.Screen name="dashboard" component={dashboard} />
        <Stack.Screen name="Language" component={language} />
      </Stack.Navigator>
    </NavigationContainer>)}
    export default Navigation;