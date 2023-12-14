
import {React} from 'react';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import{initialStorageStatus} from './common/utility'
import { setInitial} from './slices/loginSlice'
import {useState,useEffect} from 'react'

export default function  providerApp(){
    const[startPage,setStartPage]=useState('')
    
  /*  useEffect(()=>{
       initialStorageStatus()
        .then( (resp) => {  
            console.log('resp',resp)
            store.dispatch(setInitial(resp.loginDTO))
            setStartPage(resp.startPage)
        }  )
        
    },[])*/
    
   
   


return (<Provider store={store}><App initialPage={startPage} /></Provider>)
}