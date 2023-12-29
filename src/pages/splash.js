
import { React, useState,useEffect } from 'react';
import { Text, View, StyleSheet, Image, Alert, TextInput } from 'react-native';
import { Button, VStack, Center, ButtonText, ButtonIcon, Input, InputSlot, InputIcon, InputField } from "@gluestack-ui/themed";
import { styles } from '../assets/styles/theme'
import { storeObjectData, storageKeyTypes, getData,removeStoreObjectData,getObjectData } from '../common/localStorage'
import { Building2, ArrowRight } from 'lucide-react-native';
import { navigateTo, navigationRoutes, navAction } from '../common/navigation'

import { useSelector, useDispatch } from 'react-redux'
import { companyLogin } from '../slices/companySlice'
import { setPage} from '../slices/initialPageSlice'
import {buildDTO} from '../dto/companyDTO';

function Splash(props) {
  const dispatch = useDispatch()
  const companyState = useSelector((state) => state.company)
 
  const [companyName, setcompanyName] = useState(getData(storageKeyTypes.company));
  useEffect(()=>{
    if (companyState.company.id > -1) {
      dispatch(setPage(navigationRoutes.login))
    }
  },[companyState.company.id])
  function onChange(text) {
    setcompanyName(text);
  }
  const onCompanyLogin = async () => {
    try {
      console.log("company login", companyName)
      // setAddRequestStatus('pending')
      await dispatch(companyLogin(companyName))
      //const cDTO= buildDTO(companyState.company); 
      console.log("company State", companyState)
      
      if (company.id > -1) {
        navigateTo(props, navigationRoutes.login, navAction.Next);
      }
    }
    catch (err) {
      console.error('Failed to save the post: ', err)
      navigateTo(props, navigationRoutes.company, navAction.Same);
    }
    finally {
      //setAddRequestStatus('idle')
    }
    /* console.log("company login",companyName) 
     const companyDetails=  await getCompany(companyName);
     console.log("company details",companyDetails) 
     if(companyDetails){
       //props.navigation.navigate('login')
     } */
  }
  

  return (
    /*bg="$primary500"*/
    <VStack h="100%" >
      <Center h="100%" shadow={3} >
        <VStack>
          <Image source={require('../assets/images/Logofile.png')} style={styles.logo} />
        </VStack>
        <VStack mt={50} style={{ width: 300 }} >
          <Text style={styles.subheading}>Company UserName </Text>
          <Input variant={"underlined"} size="sm" mt={10}>
            <InputSlot pl="$0" pr="$4">
              <InputIcon size={25} as={Building2} />
            </InputSlot>
            <InputField placeholder="Company UserName"
              width="200"
              maxLength={200}
              onChangeText={text => onChange(text)}
              value={companyName} />
          </Input>
        </VStack>
        <VStack mt={100} style={{ width: 300 }}>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}

            style={styles.buttonLong}

            onPress={onCompanyLogin}

          >
            <ButtonText >Next</ButtonText>
            <ButtonIcon ml={"80%"} size={20} as={ArrowRight} />
          </Button>
        </VStack>

       

      </Center>
    </VStack>
  )

}
export default Splash;