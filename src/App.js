
import React from 'react';
import {Text, View,StatusBar} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
 
import Tabs from './navigation/tabs';

function App (){
    return (
      <SafeAreaProvider> 
       <NavigationContainer>
       <Tabs/>
       </NavigationContainer>
        </SafeAreaProvider>
    )
}
export default App;