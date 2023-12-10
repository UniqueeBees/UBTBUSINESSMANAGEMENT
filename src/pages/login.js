
import { VStack, Center } from '@gluestack-ui/themed';
import { Input,Heading,FormControl,InputField,InputSlot,Button,ButtonText,InputIcon,EyeIcon,EyeOffIcon } from '@gluestack-ui/themed';
import React from 'react';
import {useState} from 'react'
import { TouchableOpacity } from 'react-native';
import {  Text,View, StatusBar, Alert,Image } from 'react-native';
import { sentNotification } from '../notification/appNotification'
import { getToken, getApi, getCompany } from '../common/apiCalls'
import {storeData,storageKeyTypes,getData} from '../common/localStorage'

import { useSelector, useDispatch } from 'react-redux'
import { login, logout,accountLogin } from '../slices/loginSlice'


function Login() {
    const loginState = useSelector((state) => state.login.status)
  const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false);
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const handleState = () => {
      setShowPassword((showState) => {
        return !showState;
      });
    };
    const onLoginClicked =  async() => {
      console.log('event1')
      try {
       // setAddRequestStatus('pending')
        await dispatch(accountLogin({ domain:'microsoft', username:username, password :password}))
       /* setTitle('')
        setContent('')
        setUserId('')*/
      } 
      catch (err) 
      {
        console.error('Failed to save the post: ', err)
      } 
      finally
       {
        //setAddRequestStatus('idle')
      }
    
  }
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
              Email{loginState}
            </Text>
            <Input>
              <InputField
                type="text"
                value={username}
                onChangeText={text => setUsername(text)}
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
                value={password}
                onChangeText={text => setPassword(text)}
              />
              <InputSlot pr='$3' onPress={handleState}>
                {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon}  color='$darkBlue500'/>
              </InputSlot>
            </Input>
          </VStack>
          <Button
            ml='auto'
            disabled={loginState==='loading'}
            onPress={onLoginClicked}
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