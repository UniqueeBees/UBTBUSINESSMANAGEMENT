import React from "react";
import { useState, useEffect } from 'react'
import {
  VStack, FormControl, FormControlError, FormControlErrorText, Input,HStack,Icon,
  Heading, InputField, InputSlot, Button, ButtonText,
  InputIcon, EyeIcon, EyeOffIcon, ButtonSpinner, ArrowRightIcon, ButtonIcon
} from '@gluestack-ui/themed';
import { FlatList, StyleSheet, Text, View, TouchableOpacity,ScrollView } from 'react-native';
import { saveContact } from "../../common/apiCalls";
import { useSelector, useDispatch } from 'react-redux'
import { showAlert } from '../../slices/alertSlice'
import { showLoading } from "../../slices/loadingSlice";
import { addContactToList } from "../../slices/userSlice";
import { styles } from "../../assets/styles/theme";
import { ArrowRight,MoveLeft } from 'lucide-react-native';
import { useNavigation } from "@react-navigation/native";

import BusinessSelect from '../formBusinessList/businessSelect';
const CreateContact = () => {
  const [contactData, setContactData] = useState({businessId:1, Name: "", Designation: "", Email: "", MobileNo: "", WhatsAppNo: "" });
  const loginState = useSelector((state) => state.login)
  const [businessName, setBusinessName] = useState('');
  const dispatch = useDispatch()
  const navigation = useNavigation();
   const handleChange = (key, value) => {

    let updateData = { ...contactData }
    updateData[key] = value

    if (value == "") {
      const error = key + 'Error'
      updateData[key + 'Error'] = true
    } else {

      updateData[key + 'Error'] = false
    }
    setContactData(updateData)

    
  }
  const clearFields = () => {

    setContactData({businessId:1, Name: "", Designation: "", Email: "", MobileNo: "", WhatsAppNo: "" })

  }
  const changeBusiness = (fieldName, item) => {
        
    handleChange(fieldName,item.id)
    setBusinessName(item.name)
}
 /* const changeFormData = (fieldName, value) => {
    let formValues = { ...contactData }
    formValues[fieldName] = value;
    setData(formValues);
    const reqFields = requiredFieldSettings.map((item) => {
        let reqItem = { ...item }
        if (reqItem.field === fieldName) {
            reqItem.isTouched = true;
            reqItem.isValid = value ? true : false;
        }
        return reqItem;
    })
    setRequiredFieldSettings(reqFields)
}*/

const setBusinessControlSettings = (fieldName) => {
 return {isRequired : true,
        isInvalid:false}
}
  const validateData = () => {
    let updateData = { ...contactData }
    const alert = { action: 'error', title: 'Error', description: 'Please correct the indicated items' }
    for (var key in contactData) {
      if (contactData.hasOwnProperty(key)) {

        if (contactData["Name"] === "") {

          updateData[key + 'Error'] = true
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

    let alert = { action: 'success', title: 'Success', description: 'Successfully saved' }
    if (validateData()) {
      dispatch(showLoading(true))
      saveContact(contactData, loginState.token)
        .then(res => {
          
          if(res.data && res.data.status){
          dispatch(addContactToList({contact:res.data.contact}));
          dispatch(showAlert(alert))
          dispatch(showLoading(false))
          clearFields();
          navigation.goBack();
          }
          else{
            dispatch(showLoading(false))
          alert = { action: 'error', title: 'Error', description: 'Saving failed' }
          }
        })
        .catch(error => {
          dispatch(showLoading(false))
          alert = { action: 'error', title: 'Error', description: 'Saving failed' }
        })

      dispatch(showAlert(alert))

    }


  }

  return (
    
    <VStack width="100%" mx="3" height="100%" style={styles.fieldSetContainer}>
      <ScrollView style={styles.scrollView_withToolBar} >
      <FormControl
        p='$4'

      >

        <VStack space='xl'>
          <VStack width="100%" mx="3" >
            <HStack space="4xl" height="$20" alignItems='center'><Icon as={MoveLeft} size="xl" onPress={() => { navigation.goBack() }} />
              <Heading style={styles.pageTitle1}>
                Create Contact
              </Heading>
            </HStack></VStack>
          <VStack style={styles.outerVStack} space="2xl">
            <VStack space='xs' alignItems="">
            <BusinessSelect businessName={businessName} controlSettings={setBusinessControlSettings('businessId')} setDatasource={changeBusiness} />
              <FormControl isInvalid={isValid("NameError")} isRequired>
                <Text lineHeight='$xs' style={styles.inputLabel} >
                  Name
                </Text>
                <Input variant='underlined'>
                  <InputField placeholder="  Enter Full Name"
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
              <Text lineHeight='$xs' style={styles.inputLabel}>
                Designation
              </Text>
              <Input variant='underlined'>
                <InputField placeholder="  Enter Designation"
                  type="text"
                  value={contactData.Designation}
                  onChangeText={text => handleChange('Designation', text)}
                />
              </Input>
            </VStack>

            <VStack space='xs'>
              <Text lineHeight='$xs' style={styles.inputLabel}>
                Email Address
              </Text>
              <Input variant='underlined'>
                <InputField placeholder="  Enter Email Address"
                  type="text"
                  value={contactData.Email}
                  onChangeText={text => handleChange('Email', text)}
                />
              </Input>
            </VStack>

            <VStack space='xs'>
              <Text lineHeight='$xs' style={styles.inputLabel}>
                Mobile No
              </Text>
              <Input variant='underlined' >
                <InputField placeholder="  Enter Mobile No" style={styles.inputPlaceholder}
                  type="text"
                  value={contactData.MobileNo}
                  onChangeText={text => handleChange('MobileNo', text)}
                />
              </Input>
            </VStack>
            <VStack space='xs'>
              <Text lineHeight='$xs' style={styles.inputLabel}>
                WhatsApp No
              </Text>
              <Input variant='underlined' >
                <InputField placeholder="  Enter WhatsApp No"
                  type="text"
                  value={contactData.WhatsAppNo}
                  onChangeText={text => handleChange('WhatsAppNo', text)}
                />
              </Input>
            </VStack>
            <VStack width="100%" alignItems="center">
              <Button style={styles.submitButton}

                ml='$0'
                size="md"
                variant="solid"
                action="primary"

                onPress={saveData}
              >

                <ButtonText color='$white' style={styles.submitButtonText} >
                  Submit
                </ButtonText >
                <ButtonIcon size={20} as={ArrowRight} maxWidth={200} />
              </Button></VStack>
          </VStack>
        </VStack>
      </FormControl>
      </ScrollView>
    </VStack>
   
  );
}

export default CreateContact;