import React from "react"
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
   
  Icon,
   
  HStack,
 
  ScrollView,
  Text

} from "@gluestack-ui/themed"
import { styles } from '../../assets/styles/theme';
import {changePassword } from '../../common/apiCalls';
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux'
import { showAlert } from '../../slices/alertSlice'
import { showLoading } from "../../slices/loadingSlice";
import { MoveLeft,ArrowRightToLine} from 'lucide-react-native';


function submitChangePassword(formData){
 
const dispatch = useDispatch()
const token= useSelector((state) => state.login.token) 
const navigation = useNavigation();
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
}

function ChangePassowrd() {
  const [formData, setData] = React.useState({currentPassword:"",newPassword:"",confirmPassword:""})
  return (
    <VStack width="100%" mx="3"  style={styles.fieldSetContainer}>
         <VStack width="100%" mx="3" style={styles.pageHeader} >
        <HStack space="4xl">
        <Icon as={MoveLeft} size="lg"   onPress={()=>navigation.goBack()}/><Text  style={styles.listHeadingMedium} >Change Password</Text>
        </HStack>
        </VStack>
        <ScrollView style={styles.scrollView_withToolBar} >
        <FormControl >
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>Current Password</FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined"  size="md"   >
          <InputField placeholder="Enter your current password" value={formData.currentPassword} onChangeText={value => setData({ ...formData, currentPassword: value })}  ></InputField> 
          </Input>  
         
        </FormControl>
        <FormControl >
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>New Password </FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined"  size="md"   >
          <InputField placeholder="Enter new password" value={formData.newPassword} onChangeText={value => setData({ ...formData, newPassword: value })}   ></InputField> 
          </Input> 
          
        </FormControl>
        <FormControl >
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>Confirm Password</FormControlLabelText>
          </FormControlLabel>
          
            <Input variant="underlined"  size="md"   >
          <InputField placeholder="Retype Password" value={formData.confirmPassword} onChangeText={value => setData({ ...formData, confirmPassword: value })}   ></InputField> 
          </Input> 
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
export default () => {
  return ( 
    <VStack width="100%">
      
        <ChangePassowrd />
     
      </VStack>
    
  )
}
