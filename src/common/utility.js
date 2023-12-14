import {storageKeyTypes,getObjectData} from './localStorage';
export const initialStorageStatus =async ()=>{
    const initialAppState={startPage:'Language',loginDTO:false}
const login=await getObjectData(storageKeyTypes.login)

    if(login ){
        if(login.loginState ==='login')
        {
            initialAppState.startPage= 'Dashboard'
            initialAppState.loginDTO=login;
        }
        else
        {
            initialAppState.startPage= 'Login'
            initialAppState.loginDTO=false;
        }
        
    }
    console.log('initialAppState',initialAppState)
    return initialAppState;
}