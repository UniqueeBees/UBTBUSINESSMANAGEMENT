import {storageKeyTypes,getObjectData} from './localStorage';
export const initialStorageStatus =()=>{
    const initialAppState={startPage:'Language',loginDTO:false}
const login=getObjectData(storageKeyTypes.login)

    if(login ){
        if(login.loginState==='login')
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
    return initialAppState;
}