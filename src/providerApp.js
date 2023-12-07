
import {React} from 'react';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

export default function providerApp(){
return (<Provider store={store}><App /></Provider>)
}