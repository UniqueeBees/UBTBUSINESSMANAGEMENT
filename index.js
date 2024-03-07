/**
 * @format
 */

import {AppRegistry} from 'react-native';

import store from './src/store';
import { Provider } from 'react-redux';
import {name as appName} from './app.json';
 

import providerApp from './src/providerApp';
 
AppRegistry.registerComponent(appName, () =>providerApp); 




