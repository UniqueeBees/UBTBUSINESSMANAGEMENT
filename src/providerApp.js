
import {React} from 'react';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import{initialStorageStatus} from './common/utility'
import { setInitial} from './slices/loginSlice'
import { setInitialCompany} from './slices/companySlice'
import { setInitialLanguage} from './slices/languageSlice'
import { setPage} from './slices/initialPageSlice'
import {useState,useEffect} from 'react'

export default function  providerApp(){

    function select(state) {
        //return state.some.deep.property
        return 'state';
      }
      
      let currentValue
      function handleChange() {
        console.log('change')
        let previousValue = currentValue
        currentValue = select(store.getState())
      
        if (previousValue === currentValue) {
          console.log(
            'Some deep nested property changed from',
            previousValue,
            'to',
            currentValue
          )
        }
      }
    const[startPage,setStartPage]=useState('')
    
    useEffect(()=>{
       initialStorageStatus()
        .then( (resp) => {  
            console.log('resp',resp)
            store.dispatch(setInitial(resp.loginDTO))
            store.dispatch(setInitialCompany(resp.companyDTO))
            store.dispatch(setInitialLanguage(resp.languageDTO))
            store.dispatch(setPage(resp.startPage))
           // setStartPage(resp.startPage)
        }  )
        
    },[])
    
   
   // const unsubscribe = store.subscribe(handleChange)
   // unsubscribe()
  /* const unsubscribe =  store.subscribe(() => {
        console.log('storeChange',store.getState());
      });*/
     // unsubscribe()
     


return (<Provider store={store}><App  /></Provider>)
}