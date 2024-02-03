import { storageKeyTypes, getObjectData } from './localStorage';
import { navigationRoutes } from './navigation';
export const initialStorageStatus = async () => {
    const initialAppState = { startPage: navigationRoutes.language, loginDTO: false, languageDTO: false, companyDTO: false }
    const login = await getObjectData(storageKeyTypes.login)
    const language = await getObjectData(storageKeyTypes.language)
    const company = await getObjectData(storageKeyTypes.company)

    let haslogin = false, hasCompany = false, hasLanguage = false;

    if (login) {
        if (login.loginState === true) {

            initialAppState.loginDTO = login
            haslogin = true

        }
        else {

            initialAppState.loginDTO = false;
        }

    }

    if (company) {

        initialAppState.companyDTO = company
        hasCompany = true
        if (company.company && company.company.id === -1) {
            hasCompany = false;
        }

    }

    if (language) {
        hasLanguage = true
        initialAppState.languageDTO = language

    }
    if (haslogin) {
        console.log('hasLogin')
        initialAppState.startPage = navigationRoutes.navigationTab
    }
    else {
        if (hasCompany) {
            // login
            initialAppState.startPage = navigationRoutes.company
        }
        else {
            if (hasLanguage) {
                initialAppState.startPage = navigationRoutes.company
            }
            else {
                initialAppState.startPage = navigationRoutes.language
            }
        }
    }


    console.log('initialAppState', initialAppState)
    return initialAppState;
}

export const resetValidationObject = (validationList, dataObject) => {
   const resetValidationList= validationList.map((item) => {
        let newItem = { ...item }
        if (dataObject[item.field]) {
            newItem.isValid = true;
        }
        else {
            newItem.isValid = false;
        }
        return newItem;
    })
    return resetValidationList;
}

