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
    company:"companykey"
}

export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        console.log(key,value)
      }
      console.log(key,value)
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

 

  export const getObjectData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  }; 