
import { VStack, Center } from '@gluestack-ui/themed';
import { Input,Heading,FormControl,Text,InputField,InputSlot,Button,ButtonText } from '@gluestack-ui/themed';
import React from 'react';
import {useState} from 'react'
import { TouchableOpacity } from 'react-native';
import { Text, View, StatusBar, Alert,Image } from 'react-native';
import { sentNotification } from '../notification/appNotification'
import { getToken, getApi, getCompany } from '../common/apiCalls'
import {storeData,storageKeyTypes,getData} from '../common/localStorage'

import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '..slices/loginSlice'


function Login() {
    const loginState = useSelector((state) => state.login.loginState)
  const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false);
    const handleState = () => {
      setShowPassword((showState) => {
        return !showState;
      });
    };
    return (
      <FormControl
        p='$4'
        borderWidth='$1'
        borderRadius='$lg'
        borderColor='$borderLight300'
        sx={{
          _dark:{
            borderWidth:'$1', borderRadius:'$lg', borderColor:'$borderDark800'
          }
        }}
      >
        <VStack space='xl'>
          <Heading color='$text900' lineHeight='$md'>
            Login
          </Heading>
          <VStack space='xs'>
            <Text color='$text500' lineHeight='$xs'>
              Email
            </Text>
            <Input>
              <InputField
                type="text"
              />
            </Input>
          </VStack>
          <VStack space='xs'>
            <Text color='$text500' lineHeight='$xs'>
              Password
            </Text>
            <Input textAlign='center'>
              <InputField
                type={showPassword ? 'text' : 'password'}
              />
              <InputSlot pr='$3' onPress={handleState}>
                {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon}  color='$darkBlue500'/>
              </InputSlot>
            </Input>
          </VStack>
          <Button
            ml='auto'
            onPress={()=>{
              setShowModal(false);
            }}
          >
            <ButtonText color='$white'>
              Save
            </ButtonText>
          </Button>
        </VStack>
      </FormControl>
    );
  }

export default Login;