
import { VStack, Center, Image, Box } from '@gluestack-ui/themed';
import {
  Input, Heading, FormControl, InputField, InputSlot, Button, ButtonText,
  InputIcon, EyeIcon, EyeOffIcon, ButtonSpinner, AtSignIcon, LockIcon
} from '@gluestack-ui/themed';
import React from 'react';
import { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native';
import { Text, View, StatusBar, Alert } from 'react-native';
import { storageKeyTypes } from '../common/localStorage'

import { useSelector, useDispatch } from 'react-redux'
import { login, logout, accountLogin } from '../slices/loginSlice'
import { getUserProfile } from '../slices/userSlice';
import { styles } from '../assets/styles/theme'
import { setPage } from '../slices/initialPageSlice'
import { navigationRoutes } from '../common/navigation'
import { baseUrl } from '../common/apiCalls';
function Login() {
  const loginState = useSelector((state) => state.login.loginState)
  const token = useSelector((state) => state.login.token)
  const id = useSelector((state) => state.login.id)
  const hasUser = useSelector((state) => state.user.hasUser)
  const userLoading = useSelector((state) => state.user.loading)
  const requestStatus = useSelector((state) => state.login.reqStatus)
  const companyState = useSelector((state) => state.company)
  const loginLanguageDTO = useSelector((state) => state.language.loginLanguageDTO)
  const language = useSelector((state) => state.language)

  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    if (loginState) {
      if (!userLoading) {
        dispatch(getUserProfile(token))
        }
      }
    },[loginState])
    useEffect(()=>{
      if(hasUser && loginState){
       dispatch(setPage(navigationRoutes.navigationTab))
      }
    },[hasUser])
    
    const handleState = () => {
      setShowPassword((showState) => {
        return !showState;
      });
    };
    const onLoginClicked =  async() => {
      try {
      
        await dispatch(accountLogin({ domain:companyState.company.domain, username:username, password :password}))
       
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

  const onbackClicked = () => {
    navigateTo(props, navigationRoutes.Login, navAction.Previous);
  }
  console.log(language)
  return (
    <FormControl p='$4' mt="$20">
      {(loginState && hasUser) ? <Box /> :
        <VStack space='xl' alignItems='center'>
          {/* <Heading color='$textDark800' lineHeight='$md'>
            {loginLanguageDTO.title}
          </Heading>  */}
          <Center >
            <Image source={{
              uri: `${baseUrl}/files/${companyState.company.logo}`,
              method: 'GET',
              headers: {
                Pragma: 'no-cache',
              },
              body: 'Your Body goes here',
            }}
              resizeMode="contain"
              alt=""
              size="xl"
            />
          </Center>
          <VStack pl="$10" pr="$10" space='lg' reverse={false}>
            <VStack space='xs'>
              <Text color='$text500' lineHeight='$xs'>
                {loginLanguageDTO.username}
              </Text>
              <Input variant='underlined'>
                <InputField
                  type="text"
                  value={username}
                  onChangeText={text => setUsername(text)} placeholder="Username"
                />
              </Input>
            </VStack>
            <VStack space='xs'>
              <Text color='$text500' lineHeight='$xs'>
                {loginLanguageDTO.password}
              </Text>
              <Input variant='underlined' textAlign='center'>
                <InputSlot pl='$3'>
                  {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                  <InputIcon as={LockIcon} />
                </InputSlot>

                <InputField ml="$5"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
                <InputSlot pr='$3' onPress={handleState}>
                  {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color='$darkBlue500' />
                </InputSlot>
              </Input>
            </VStack>

            <Button
              mt="$20"
              ml="$0"
              size="md"
              variant="solid"
              action="primary"
              isDisabled={requestStatus === 'loading'}
              style={styles.buttonLong}
              onPress={onLoginClicked}
            >
              <ButtonText color='$white'  >
                {loginLanguageDTO.signIn}
              </ButtonText >
            </Button>
          </VStack>

        </VStack>
      }
    </FormControl>

  );
}

export default Login;