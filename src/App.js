
import { React } from 'react';


import { SafeAreaProvider } from 'react-native-safe-area-context';

import Splash from './pages/splash';

import Login from './pages/login';

import dashboard from './pages/dashboard';

import BusinessEdit from './pages/businessEdit'
import Tabs from './navigation/tabs';
// import { Alert} from 'react-native'; 
import AppNotification from './notification/appNotification'
import Customtheme from './assets/styles/theme'
import Navigation from './common/navigation';
import { GluestackUIProvider, Text } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config" // Optional if you w
import Alert from "./common/alert";
function App() {

  return (
    <SafeAreaProvider>
     
      <AppNotification></AppNotification>
      <GluestackUIProvider config={config}>
      <Alert/>
        <Navigation />

      </GluestackUIProvider>
    </SafeAreaProvider>
  )
}
export default App;