
import {React} from 'react';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import{initialStorageStatus} from './common/utility'
import { setInitial} from '../slices/loginSlice'

export default function providerApp(){
    const initialState=initialStorageStatus();
    store.dispatch(setInitial(initialState.loginDTO))

return (<Provider store={store}><App initialPage={initialState.startPage} /></Provider>)
}