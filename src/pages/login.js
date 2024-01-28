
import { VStack, Center, Image, Box } from '@gluestack-ui/themed';
import {
  Input, Heading, FormControl, InputField, InputSlot, Button, ButtonText,
  InputIcon, EyeIcon, EyeOffIcon, ButtonSpinner, AtSignIcon, LockIcon, ButtonIcon
} from '@gluestack-ui/themed';
import React from 'react';
import { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native';
import { Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard,View } from 'react-native';
import { storageKeyTypes } from '../common/localStorage'

import { useSelector, useDispatch } from 'react-redux'
import { resetLoginStatus, accountLogin } from '../slices/loginSlice'
import { getUserProfile } from '../slices/userSlice';
import { styles } from '../assets/styles/theme'
import { setPage } from '../slices/initialPageSlice'
import { showLoading } from '../slices/loadingSlice';
import { showAlert } from '../slices/alertSlice';
import { navigationRoutes } from '../common/navigation'
import { baseUrl } from '../common/apiCalls';
import { UserRound, ArrowRightToLine } from 'lucide-react-native';
function Login() {
  const loginState = useSelector((state) => state.login.loginState)
  const token = useSelector((state) => state.login.token)
  const id = useSelector((state) => state.login.id)
  const hasUser = useSelector((state) => state.user.hasUser)
  const userLoading = useSelector((state) => state.user.loading)
  const requestStatus = useSelector((state) => state.login.reqStatus)
  const loginAction = useSelector((state) => state.login.loginAction)
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
  }, [loginState])
  useEffect(() => {
    if (hasUser && loginState) {
      dispatch(setPage(navigationRoutes.navigationTab))
    }
  }, [hasUser])
  useEffect(() => {
    if (requestStatus === 'loading') {
      dispatch(showLoading(true))
    }
    else {
      dispatch(showLoading(false))
    }
    if (loginAction === 'failed') {
      const alert = { action: 'error', title: loginLanguageDTO.error, description: loginLanguageDTO.loginFailed }
      dispatch(showAlert(alert))
      dispatch(resetLoginStatus());
    }
  }, [requestStatus, loginAction])


  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  const onLoginClicked = async () => {
    if (username && password) {
      await dispatch(accountLogin({ domain: companyState.company.domain, username: username, password: password }))
    }
    else {
      const alert = { action: 'error', title: loginLanguageDTO.error, description: loginLanguageDTO.loginFailed }
      dispatch(showAlert(alert))
    }


  }

  
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1,justifyContent: "flex-end"}} >
        <FormControl p='$4' >
          {(loginState && hasUser) ? <Box /> :
            <VStack space='xl' alignItems='center' mb="$10">

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

              <VStack pl="$10" pr="$10" space="xl">
                <VStack space='none'>
                  <Text color='$text500' lineHeight='$xs' style={styles.fieldLabel}>
                    {loginLanguageDTO.username}
                  </Text>
                  <Input variant='underlined' mt="$0">
                    <InputSlot>
                      <InputIcon as={UserRound} size="lg" />
                    </InputSlot>
                    <InputField ml="$1"
                      style={styles.fieldTextSBold}
                      type="text"
                      value={username}
                      onChangeText={text => setUsername(text)} placeholder={loginLanguageDTO.usernamePlaceholder}
                    />
                  </Input>
                </VStack>
                <VStack space='none'>
                  <Text color='$text500' lineHeight='$xs' style={styles.fieldLabel}>
                    {loginLanguageDTO.password}
                  </Text>
                  <Input variant='underlined' textAlign='center' mt="$0">
                    <InputSlot>
                      {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                      <InputIcon as={LockIcon} size="lg"></InputIcon>
                    </InputSlot>

                    <InputField ml="$1"
                      style={styles.fieldTextSBold}
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      placeholder={loginLanguageDTO.passwordPlaceholder}
                      onChangeText={text => setPassword(text)}
                    />
                    <InputSlot pr='$3' onPress={handleState}>
                      {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
                      <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} color='$darkBlue500' />
                    </InputSlot>
                  </Input>
                </VStack>

                <Button
                  mt="$16"
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
                  <ButtonIcon ml={"70%"} size={20} as={ArrowRightToLine} />
                </Button>
              </VStack>

            </VStack>

          }
        </FormControl>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
}

export default Login;