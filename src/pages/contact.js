import React from "react";
import { useState,useEffect } from 'react'
import { VStack, FormControl, FormControlError, FormControlErrorText, Input, 
  Heading, InputField, InputSlot, Button, ButtonText, 
  InputIcon, EyeIcon, EyeOffIcon, ButtonSpinner,ArrowRightIcon,ButtonIcon } from '@gluestack-ui/themed';
import { FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { saveContact } from "../common/apiCalls";
import { useSelector, useDispatch } from 'react-redux'
import { showAlert} from '../slices/alertSlice'
import { styles } from "../assets/styles/theme";
import {  ArrowRight } from 'lucide-react-native';
const Contact = () => {
  const [contactData, setContactData] = useState({ Name: "", Designation: "", Email: "", MobileNo: "", WhatsAppNo: "" });
  const loginState = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const handleChange = (key, value) => {

    let updateData = { ...contactData }
    updateData[key] = value
    
    if(value==""){
      const error=key+'Error'
      updateData[key+'Error'] = true
    }else{

      updateData[key+'Error'] = false
    }
    setContactData(updateData)

    console.log(contactData)
  }
const clearFields=()=>{

setContactData({ Name: "", Designation: "", Email: "", MobileNo: "", WhatsAppNo: "" })

}
  const validateData = () => {
    let updateData = { ...contactData }
    const alert={action:'error',title:'Error',description:'Please correct the indicated items'}
      for (var key in contactData) {
      if (contactData.hasOwnProperty(key)) {

        if (contactData["Name"] === "") {
         
          updateData[key+'Error'] = true
          setContactData(updateData)
          
          dispatch(showAlert(alert))
          return false;
        }

      }


    }

    return true;
  }

  const isValid = (name) => {
    if (contactData[name]) {

      return true;
    } else {
      return false;
    }

  }




  const saveData = () => {
    let alert={action:'success',title:'Success',description:'Successfully savedrr'}
    if(validateData())
    {
      saveContact(contactData,loginState.token)
      .then(res => {
        dispatch(showAlert(alert))
        clearFields();
    })
        .catch(error => {
          alert={action:'error',title:'Erero',description:'Saving failed'}
        })

        dispatch(showAlert(alert))

    }
   

  }

  return (
    <VStack>
     <FormControl
      p='$4'

    >

      <VStack space='xl'>
        <Heading lineHeight='$md' style={styles.Heading}>
          Create Contact
        </Heading>


        <VStack space='xs' alignItems="">

          <FormControl isInvalid={isValid("NameError")}>
            <Text lineHeight='$xs'>
              Name
            </Text>
            <Input variant='underlined' ml="$3">
              <InputField placeholder="Enter Full Name"
                type="text"
                value={contactData.Name}
                onChangeText={text => handleChange('Name', text)}
              />
            </Input>

            <FormControlError>
              <FormControlErrorText>
                Name is required.
              </FormControlErrorText>
            </FormControlError></FormControl>
        </VStack>


        <VStack space='xs'>
          <Text lineHeight='$xs'>
            Designation
          </Text>
          <Input variant='underlined'  ml="$3">
            <InputField placeholder="Enter Designation"
              type="text"
              value={contactData.Designation}
              onChangeText={text => handleChange('Designation', text)}
            />
          </Input>
        </VStack>

        <VStack space='xs'>
          <Text lineHeight='$xs'>
            Email Address
          </Text>
          <Input variant='underlined'  ml="$3">
            <InputField placeholder="Enter Email Address"
              type="text"
              value={contactData.Email}
              onChangeText={text => handleChange('Email', text)}
            />
          </Input>
        </VStack>

        <VStack space='xs'>
          <Text lineHeight='$xs'>
            Mobile No
          </Text>
          <Input variant='underlined'  ml="$3">
            <InputField placeholder="Enter Mobile No"
              type="text"
              value={contactData.MobileNo}
              onChangeText={text => handleChange('MobileNo', text)}
            />
          </Input>
        </VStack>
        <VStack space='xs'>
          <Text lineHeight='$xs'>
            WhatsApp No
          </Text>
          <Input variant='underlined'  ml="$3">
            <InputField placeholder="Enter WhatsApp No"
              type="text"
              value={contactData.WhatsAppNo}
              onChangeText={text => handleChange('WhatsAppNo', text)}
            />
          </Input>
        </VStack>

        <Button

          ml='$0'
          size="lg"
          variant="solid"
          action="primary"

          onPress={saveData}
        >
          <ButtonText color='$white' style={styles.buttonLong} >
            Submit
          </ButtonText >
          <ButtonIcon size={20} as={ArrowRight} maxWidth={200} />
        </Button>
       
      </VStack>
    </FormControl>
    </VStack>
  );
}

export default Contact;