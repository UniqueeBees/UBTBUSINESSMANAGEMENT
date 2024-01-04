
import { VStack, Center } from '@gluestack-ui/themed';
import { Input,Heading,FormControl,InputField,InputSlot,Button,ButtonText,InputIcon,EyeIcon,EyeOffIcon,ButtonSpinner } from '@gluestack-ui/themed';
import React from 'react';
import {useState,useEffect} from 'react'
import { TouchableOpacity } from 'react-native';
import {  Text,View, StatusBar, Alert,Image } from 'react-native';
import {storageKeyTypes} from '../common/localStorage'

import { useSelector, useDispatch } from 'react-redux'
import { login, logout,accountLogin } from '../slices/loginSlice'
import { getUserProfile } from '../slices/userSlice';
import { styles } from '../assets/styles/theme'
import { setPage} from '../slices/initialPageSlice'
import {  navigationRoutes } from '../common/navigation'
function Login() {
    const loginState = useSelector((state) => state.login.loginState)
    const token = useSelector((state) => state.login.token)
    const id = useSelector((state) => state.login.id)
    const hasUser = useSelector((state) => state.user.hasUser)
    const userLoading = useSelector((state) => state.user.loading)
    const requestStatus = useSelector((state) => state.login.reqStatus)
    const companyState = useSelector((state) => state.company)
    const loginLanguageDTO=useSelector((state)=>state.language.loginLanguageDTO)
    
  const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false);
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    useEffect(()=>{
      if(loginState){
        if(!userLoading){
        dispatch(getUserProfile(token))
        }
      }
    },[loginState])
    useEffect(()=>{
      if(hasUser){
       dispatch(setPage(navigationRoutes.dashboard))
      }
    },[hasUser])
    const handleState = () => {
      setShowPassword((showState) => {
        return !showState;
      });
    };
    const onLoginClicked =  async() => {
      try {
       console.log('onLoginClicked',companyState)
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

  const onbackClicked=()=>{
    navigateTo(props,navigationRoutes.Login,navAction.Previous);
  }
    return (
      
      <FormControl
        p='$4'
        
      >
        <VStack space='xl'>
          <Heading color='$text900' lineHeight='$md'>
            {loginLanguageDTO.title}
          </Heading>
          

          
          
        <VStack alignContent='flex-end'>
         <Image source={require('../assets/images/Logofile.png')} style={styles.logo} /> 
        </VStack>
          
          
        
          <VStack space='xs'>
            <Text color='$text500' lineHeight='$xs'>
              {loginLanguageDTO.username}
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
              {loginLanguageDTO.password}
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
            isDisabled={requestStatus==='loading'}
            
            onPress={onLoginClicked}
          >
            <ButtonText color='$white'  >
              {loginLanguageDTO.submit}
            </ButtonText >
          </Button>
        </VStack>
      </FormControl>
      
    );
  }

export default Login;