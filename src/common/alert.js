import React from "react";
import { useToast, Center, VStack, Button, ButtonText, Toast, ToastTitle, ToastDescription } from "@gluestack-ui/themed";
import { Text, View } from "lucide-react-native";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideAlert} from '../slices/alertSlice'
const Alert = (props) => {
  const toast = useToast()
  const alertState = useSelector((state) => state.alert)
  const dispatch = useDispatch()
let isShow=false;
useEffect(() => {
  if (alertState) {
    if(alertState.show&&!isShow)
    {     
      isShow=true;
      setTimeout(hideAlert,100)
      showToast();
    }
    
  }
}, [alertState])

hideToast=()=>{
  isShow=false;
  dispatch(hideAlert());

}



showToast=()=>{
  return toast.show({
    placement: "top",
    render: ({ id }) => {
      const toastId = "toast-" + id
      return (
        <Toast nativeID={toastId} variant="accent" action={alertState.alert.action}  minWidth={300} alignItems="center" maxHeight={50} >
          <VStack space="xs"><ToastTitle >{alertState.alert.title}</ToastTitle>
            <ToastDescription alignItems="center">{alertState.alert.description}</ToastDescription></VStack>
        </Toast>
      )
    },
  })

}
 

  return (
 <VStack width="100%">{isShow?showToast():""}</VStack>
  )


};
export default Alert;