
import {React,useEffect}from 'react';
 
import { SafeAreaProvider } from 'react-native-safe-area-context';
 
import Splash from './pages/splash';
import dashboard from './pages/dashboard';
import BusinessEdit from './pages/businessEdit'
import Tabs from './navigation/tabs';
import { Alert} from 'react-native'; 
import  AppNotification  from './notification/appNotification'
import Customtheme from './assets/styles/theme'

import { GluestackUIProvider, Text } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config" // Optional if you w
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
function App (){


    return ( 
      <SafeAreaProvider> 
        <AppNotification></AppNotification>
        <GluestackUIProvider config={config}>
        <NavigationContainer initialRouteName="Home">
      <Stack.Navigator screenOptions={{ headerShown: false  }}>
        <Stack.Screen name="Home" component={Splash} />
        <Stack.Screen name="BusinessEdit" component={dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
       </GluestackUIProvider> 
      </SafeAreaProvider>
    )
}
export default App;