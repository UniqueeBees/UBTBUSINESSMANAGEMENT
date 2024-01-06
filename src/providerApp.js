
import {React} from 'react';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import{initialStorageStatus} from './common/utility'
import { setInitial} from './slices/loginSlice'
import { setInitialCompany} from './slices/companySlice'
import { setInitialLanguage} from './slices/languageSlice'
import { setPage} from './slices/initialPageSlice'
import {useEffect} from 'react'

export default function  providerApp(){

    
    
    useEffect(()=>{
       initialStorageStatus()
        .then( (resp) => {  
            console.log('resp',resp)
            store.dispatch(setInitial(resp.loginDTO))
            store.dispatch(setInitialCompany(resp.companyDTO))
            store.dispatch(setInitialLanguage(resp.languageDTO))
            store.dispatch(setPage(resp.startPage))
        }  )
        
    },[])

return (<Provider store={store}><App  /></Provider>)
}