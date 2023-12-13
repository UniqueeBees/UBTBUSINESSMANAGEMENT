
import { VStack, Center } from '@gluestack-ui/themed';
import { Input,Heading,FormControl,InputField,InputSlot,Button,ButtonText,InputIcon,EyeIcon,EyeOffIcon,ButtonSpinner } from '@gluestack-ui/themed';
import React from 'react';
import {useState} from 'react'
import { TouchableOpacity } from 'react-native';
import {  Text,View, StatusBar, Alert,Image } from 'react-native';
import {storeData,storageKeyTypes,getData} from '../common/localStorage'

import { useSelector, useDispatch } from 'react-redux'
import { login, logout,accountLogin } from '../slices/loginSlice'
import { styles } from '../assets/styles/theme'

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
        
      >
        <VStack space='xl'>
          <Heading color='$text900' lineHeight='$md'>
            Login
          </Heading>
          

          
          
        <VStack alignContent='flex-end'>
         <Image source={require('../assets/images/Logofile.png')} style={styles.logo} /> 
        </VStack>
          
          
        
          <VStack space='xs'>
            <Text color='$text500' lineHeight='$xs'>
              Email or Username
            </Text>
            <Input variant='underlined'>
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
            <Input variant='underlined' textAlign='center'>
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
            size="md"
            variant="solid"
            action="primary"
            isDisabled={loginState==='loading'}
            
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