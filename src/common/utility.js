import { storageKeyTypes, getObjectData } from './localStorage';
import {navigationRoutes} from './navigation';
export const initialStorageStatus = async () => {
    const initialAppState = { startPage: navigationRoutes.language, loginDTO: false, languageDTO: false, companyDTO: false }
    const language = await getObjectData(storageKeyTypes.language)
    const company = await getObjectData(storageKeyTypes.company)
    const login = await getObjectData(storageKeyTypes.login)
    console.log(language);
    console.log(company)
    if (login) {
        if (login.loginState === 'login') {
            initialAppState.startPage = navigationRoutes.dashboard
            initialAppState.loginDTO = login;
        }
        else {
            initialAppState.startPage = navigationRoutes.login
            initialAppState.loginDTO = false;
        }

    }

    if (company) {

        initialAppState.companyDTO = company
        initialAppState.startPage = navigationRoutes.login

    } else {
        initialAppState.startPage = navigationRoutes.company

    }

    if (language) {

        initialAppState.languageDTO = language
        initialAppState.startPage = navigationRoutes.company

    } else {

        console.log('navigationroutes',navigationRoutes)
        initialAppState.startPage = navigationRoutes.language

    }



    console.log('initialAppState', initialAppState)
    return initialAppState;
}