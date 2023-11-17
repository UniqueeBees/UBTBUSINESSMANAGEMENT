
import {React,useEffect}from 'react';
 
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from "native-base";
import Splash from './pages/splash';
import BusinessEdit from './pages/businessEdit'
import Tabs from './navigation/tabs';
import { Alert} from 'react-native'; 
import  AppNotification  from './notification/appNotification'


function App (){ 
    return ( 
      <SafeAreaProvider> 
        <AppNotification></AppNotification>
        <NativeBaseProvider>
        <Tabs/>
       </NativeBaseProvider> 
      </SafeAreaProvider>
    )
}
export default App;