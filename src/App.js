
import {React,useEffect}from 'react';
 
import { SafeAreaProvider } from 'react-native-safe-area-context';
 
import Splash from './pages/splash';

import Login from './pages/login';

import dashboard from './pages/dashboard';

import BusinessEdit from './pages/businessEdit'
import Tabs from './navigation/tabs';
import { Alert} from 'react-native'; 
import  AppNotification  from './notification/appNotification'
import Customtheme from './assets/styles/theme'
import Navigation from './common/navigation';
import { GluestackUIProvider, Text } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config" // Optional if you w
function App (props){


    return ( 
      <SafeAreaProvider> 
        <AppNotification></AppNotification>
        <GluestackUIProvider config={config}>

        <Navigation initialPage={props.initialPage} />       

       </GluestackUIProvider> 
      </SafeAreaProvider>
    )
}
export default App;