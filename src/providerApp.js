
import {React} from 'react';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import{initialStorageStatus} from './common/utility'
import { setInitial} from './slices/loginSlice'
import { setInitialCompany} from './slices/companySlice'
import { setInitialLanguage} from './slices/languageSlice'
import {useState,useEffect} from 'react'

export default function  providerApp(){
    const[startPage,setStartPage]=useState('')
    
    useEffect(()=>{
       initialStorageStatus()
        .then( (resp) => {  
            console.log('resp',resp)
            store.dispatch(setInitial(resp.loginDTO))
            store.dispatch(setInitialCompany(resp.companyDTO))
            store.dispatch(setInitialLanguage(resp.languageDTO))
            setStartPage(resp.startPage)
        }  )
        
    },[])
    
   
   


return (<Provider store={store}><App initialPage={startPage} /></Provider>)
}