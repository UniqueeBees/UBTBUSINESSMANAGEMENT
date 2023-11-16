
import React from 'react';
 
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from "native-base";
import Splash from './pages/splash';
import BusinessEdit from './pages/businessEdit'

function App (){
    return (
      <SafeAreaProvider> 
        <NativeBaseProvider>
        <BusinessEdit></BusinessEdit>
       </NativeBaseProvider> 
      </SafeAreaProvider>
    )
}
export default App;