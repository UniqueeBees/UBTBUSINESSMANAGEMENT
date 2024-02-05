
import { React, useState,useEffect,useRef } from 'react';
import { Text,Image} from 'react-native';
import { Button, VStack, Center, ButtonText, ButtonIcon, Input, InputSlot, InputIcon, InputField } from "@gluestack-ui/themed";
import { styles } from '../assets/styles/theme'
import { storageKeyTypes, getData} from '../common/localStorage'
import { Building2, ArrowRight } from 'lucide-react-native';
import { navigateTo, navigationRoutes, navAction } from '../common/navigation'

import { useSelector, useDispatch } from 'react-redux'
import { companyLogin } from '../slices/companySlice'
import { logout } from '../slices/loginSlice';
import { setPage} from '../slices/initialPageSlice'
import {apiCallStatus} from '../common/apiCalls'
import { showLoading } from '../slices/loadingSlice';
import { showAlert } from '../slices/alertSlice';
function Splash(props) {
  const dispatch = useDispatch()
  const companyState = useSelector((state) => state.company)
  const loginState = useSelector((state) => state.login.loginState)
   
  const isInitialMount = useRef(true);
  const [companyName, setcompanyName] = useState(getData(storageKeyTypes.company));
  useEffect(()=>{
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } 
   else {
    if (companyState.company.id > -1 && companyState.status === apiCallStatus.fullfilled ) {
      dispatch(showLoading(false))
     if(loginState)
     {
      dispatch(logout())
     }
     else{
      dispatch(setPage(navigationRoutes.login))
     }
      
    }
    else if(companyState.status === apiCallStatus.pending ){
      dispatch(showLoading(true))
    }
    else if(companyState.status === apiCallStatus.rejected ){
      dispatch(showLoading(false))
    }
    else{
      dispatch(showLoading(false))
    }
  }
  },[companyState.status])

  useEffect(()=>{
    
    if(!loginState && companyState.company.id > -1)
    {
      dispatch(setPage(navigationRoutes.login))
    }
  },[loginState])

  function onChange(text) {
    setcompanyName(text);
  }
  const onCompanyLogin = async () => {
    try {
     
      await dispatch(companyLogin(companyName))
      
     
    }
    catch (err) {
      dispatch(showLoading(false))
      console.error('Failed to save the post: ', err)
      alert = { action: 'error', title: 'Error', description: 'Company login failed' }
      dispatch(showAlert(alert))
      navigateTo(props, navigationRoutes.company, navAction.Same);
    }
    finally {
    }
    
  }
  

  return (
    /*bg="$primary500"*/
    <VStack h="100%" bgColor='white'>
      <Center h="100%" shadow={3} >
        <VStack width="100%" alignItems='center'>
          <Image source={require('../assets/images/Logofile.png')} style={styles.logo} />
        </VStack>
        <VStack mt={50} style={{ width: 300 }} >
          <Text style={styles.titleMedium12}>Company Username </Text>
          <Input variant={"underlined"} size="sm" mt={10}>
            <InputSlot pl="$0" pr="$4">
              <InputIcon size={25} as={Building2} />
            </InputSlot>
            <InputField placeholder="Company Username"
            style={styles.fieldTextSBold}
              width="200"
              maxLength={200}
              onChangeText={text => onChange(text)}
              value={companyName} />
          </Input>
        </VStack>
        <VStack mt={80} style={{ width: 300 }}>
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