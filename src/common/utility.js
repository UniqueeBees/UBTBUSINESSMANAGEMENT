import { storageKeyTypes, getObjectData } from './localStorage';
import {navigationRoutes} from './navigation';
export const initialStorageStatus = async () => {
    const initialAppState = { startPage: navigationRoutes.language, loginDTO: false, languageDTO: false, companyDTO: false }
    const language = await getObjectData(storageKeyTypes.language)
    const company = await getObjectData(storageKeyTypes.company)
    const login = await getObjectData(storageKeyTypes.login)
    let haslogin=false,hasCompany=false,hasLanguage=false;
    if (login) {
        if (login.loginState === 'login') {
            initialAppState.loginDTO = login
            haslogin=true
        }
        else {
            
            initialAppState.loginDTO = false;
        }

    }

    if (company) {

        initialAppState.companyDTO = company
        hasCompany=true

    } 

    if (language) {
        hasLanguage=true
        initialAppState.languageDTO = language

    }
if(haslogin){
    initialAppState.startPage = navigationRoutes.dashboard 
}
else
{
   if(hasCompany){
    initialAppState.startPage = navigationRoutes.login
   } 
   else{
    if(hasLanguage){
        initialAppState.startPage = navigationRoutes.company  
    }
    else{
        initialAppState.startPage = navigationRoutes.language  
    }
   }
}


    console.log('initialAppState', initialAppState)
    return initialAppState;
}