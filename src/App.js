
import React from 'react';
 
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from "native-base";
import Splash from './pages/splash';
import BusinessEdit from './pages/businessEdit'
import Tabs from './navigation/tabs';

function App (){
    return (
      <SafeAreaProvider> 
        <NativeBaseProvider>
        <Tabs/>
       </NativeBaseProvider> 
      </SafeAreaProvider>
    )
}
export default App;