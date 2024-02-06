import React,{useState,useEffect} from "react"
import {
  VStack,
  FormControl,
  Input,
  InputField ,
  Center,
  Button,
  ButtonText,
  ButtonIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  Icon,
   
  HStack,
 
  ScrollView,
  Text

} from "@gluestack-ui/themed"
import { styles } from '../assets/styles/theme';
import {changePassword } from '../common/apiCalls';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux'
import { showAlert } from '../slices/alertSlice'
import { showLoading } from "../slices/loadingSlice";
import { MoveLeft,ArrowRightToLine} from 'lucide-react-native';
 

function ChangePassword() {
  const [formData, setData] = React.useState({currentPassword:"",newPassword:"",confirmPassword:""}) 
  const dispatch = useDispatch()
  const token= useSelector((state) => state.login.token) 
  const navigation = useNavigation();
  const [isFormValid, setIsFormValid] = useState(false); 
  const [errors, setErrors] = useState({}); 
  useEffect(() => {  
   //validateForm(); 
}, [formData]); 

  const submitChangePassword=(formData)=>{
   
   if(validateForm()){
    let alert = { action: 'success', title: 'success', description: 'Success1' }
    console.log("formdata",formData)
    console.log("token",token)
        changePassword(formData,token) 
        .then(res => { 
          if(res.data && res.data.status){ 
            navigation.navigate("login")
          }
          else{
            dispatch(showLoading(false))
          alert = { action: 'error', title: 'Error', description: 'Password changing failed' }
          }
        })
        .catch(error => {
          dispatch(showLoading(false))
          alert = { action: 'error', title: 'Error', description: 'password changing failed' }
        })
        dispatch(showAlert(alert));
      }else{
      dispatch(showAlert({ action: 'error', title: 'error', description: 'Please correct indicated' }));
      }
    }
    const isValid = (name) => {
      if (formData[name]) { 
        if(name==="confirmPassword")
        {
          if(formData.confirmPassword===formData.newPassword){
            return true;
          }else{return false;}
        }
        return true;
      } else {
        return false;
      }
  
    } 
    const validateForm = () => { 
      let errors = {};  
      // Validate name field 
      if (!formData.currentPassword) { 
          errors.currentPassword = 'Current Password is required.'; 
      } 

      // Validate email field 
      if (!formData.newPassword) { 
          errors.newPassword = 'New Password is required.'; 
      }  

      // Validate password field 
      if (!formData.confirmPassword) { 
          errors.confirmPassword = 'Confirm Password is required.'; 
      } else if (formData.newPassword!=formData.confirmPassword) { 
          errors.confirmPassword = 'Confirm Password didnt match.'; 
      }  
      // Set the errors and update form validity 
      
      setErrors(errors); 
     return Object.keys(errors).length === 0 ;
       
  }; 

  return (
    <VStack width="100%" mx="3"  style={styles.fieldSetContainer}>
         <VStack width="100%" mx="3" style={styles.pageHeader} >
        <HStack space="4xl">
        <Icon as={MoveLeft} size="lg"   onPress={()=>navigation.goBack()}/><Text  style={styles.listHeadingMedium} >Change Password</Text>
        </HStack>
        </VStack>
        <ScrollView style={styles.scrollView_withToolBar} >
        <FormControl isInvalid={!isValid("currentPassword")} isRequired>
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>Current Password</FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined" isRequired={true}   size="md"   >
          <InputField placeholder="Enter your current password" type="password" value={formData.currentPassword} onChangeText={value => setData({ ...formData, currentPassword: value })}  ></InputField> 
          </Input>   
          <FormControlError > 
                  <FormControlErrorText>
                    {errors.currentPassword}
                  </FormControlErrorText>
                </FormControlError>  
        </FormControl>
        <FormControl isInvalid={!isValid("newPassword")}  isRequired>
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>New Password </FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined" isRequired={true} size="md"   >
          <InputField placeholder="Enter new password" type="password"  value={formData.newPassword} onChangeText={value => setData({ ...formData, newPassword: value })}   ></InputField> 
          </Input> 
          <FormControlError>
                  <FormControlErrorText>
                  {errors.newPassword}
                  </FormControlErrorText>
                </FormControlError> 
        </FormControl>
        <FormControl isInvalid={!isValid("confirmPassword")}  isRequired>
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>Confirm Password</FormControlLabelText>
          </FormControlLabel>
          
            <Input variant="underlined" isRequired={true}   size="md"   >
          <InputField placeholder="Retype Password" type="password"  value={formData.confirmPassword} onChangeText={value => setData({ ...formData, confirmPassword: value })}   ></InputField> 
          </Input> 
          <FormControlError>
                  <FormControlErrorText>
                  {errors.confirmPassword} 
                  </FormControlErrorText>
                </FormControlError>  
        </FormControl> 
        <VStack mt={20} mb={50} alignItems="center" style={{ width: "100%" }}>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            style={styles.buttonLong}
            onPress={()=>submitChangePassword(formData)}
                      >
            <ButtonText style={styles.buttonText}>Submit</ButtonText>
            <ButtonIcon ml={"80%"} size={20} as={ArrowRightToLine} />
          </Button>
        </VStack>
        </ScrollView>
        </VStack>
        )
} 
export default ChangePassword;
