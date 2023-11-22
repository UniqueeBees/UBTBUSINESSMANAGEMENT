
import {React,useEffect}from 'react';
 
import { SafeAreaProvider } from 'react-native-safe-area-context';
 
import Splash from './pages/splash';
import BusinessEdit from './pages/businessEdit'
import Tabs from './navigation/tabs';
import { Alert} from 'react-native'; 
import  AppNotification  from './notification/appNotification'
import Customtheme from './assets/styles/theme'

import { GluestackUIProvider, Text } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config" // Optional if you w


function App (){ 
    return ( 
      <SafeAreaProvider> 
        <AppNotification></AppNotification>
        <GluestackUIProvider config={config}>
        <Tabs/>
       </GluestackUIProvider> 
      </SafeAreaProvider>
    )
}
export default App;