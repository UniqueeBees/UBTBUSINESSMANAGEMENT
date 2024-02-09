import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key,value) => { 
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };
  export const storageKeyTypes={
    language:'languagekey',
    company:"companykey",
    login:'loginkey',
    languageList:'languageList',
}

export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
       // console.log(key,value)
        return value;
      }
     // console.log(key,value)
    } catch (e) {
       console.log(key,e)
    }
  };

   export const storeObjectData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  export const removeStoreObjectData = async (key) => {
    try {
      
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // saving error
    }
  };

 

  export const getObjectData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
          return JSON.parse(jsonValue) //!= null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }; 