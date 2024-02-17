import { storageKeyTypes, getObjectData } from './localStorage';
import { navigationRoutes } from './navigation';
import { PermissionsAndroid,} from 'react-native';
import moment from 'moment';
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

export const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "App Camera Permission",
        message: "App needs access to your camera ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Camera permission given");
      return true;
    } else {
      console.log("Camera permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};

export const resetValidationObject = (validationList, dataObject) => {
  const resetValidationList = validationList.map((item) => {
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

export function sortObjectArray(field, reverse, primer) {

  const key = primer ?
    function (x) {
      return primer(x[field])
    } :
    function (x) {
      return x[field]
    };

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
  }
}

export const  getCurrentDateTime=()=>{
  const currentDate = new Date();
  const formattedDate = moment(currentDate).format('YYYY-MM-DD HH:mm:ss');
  return formattedDate;
}