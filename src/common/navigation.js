import React  from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../pages/splash';
import dashboard from '../pages/dashboard';
import BusinessEdit from '../pages/businessEdit'
const Stack = createNativeStackNavigator();
 function Navigation(){
return (<NavigationContainer initialRouteName="Home">
      <Stack.Navigator screenOptions={{ headerShown: false  }}>
        <Stack.Screen name="Home" component={Splash} />
        <Stack.Screen name="dashboard" component={dashboard} />
      </Stack.Navigator>
    </NavigationContainer>)}
    export default Navigation;