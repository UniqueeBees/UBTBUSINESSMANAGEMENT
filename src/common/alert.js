import React from "react";
import { useToast, Center, VStack, Button, ButtonText, Toast, ToastTitle, ToastDescription } from "@gluestack-ui/themed";
import { Text, View } from "lucide-react-native";
import { useState, useEffect } from 'react'
const Alert = (props) => {
  const toast = useToast()
  const alertState = useSelector((state) => state.alertState)
let show=false;
// useEffect(() => {
//   if (alertState) {
//     show = alertState.show
//   }
// }, [alertState])


const showAlert = () => {

    return toast.show({
      placement: "top",
      render: ({ id }) => {
        const toastId = "toast-" + id
        return (
          <Toast nativeID={toastId} variant="accent" action="success">
            <VStack space="xs">
              <ToastTitle>Attention!</ToastTitle>
              <ToastDescription>
                Please review and accept our updated terms and conditions
                before continuing to use the application.
              </ToastDescription>
            </VStack>
          </Toast>
        )
      },
    })

  }

  

  return (
    <VStack>{show?showAlert():""}</VStack>
  )


};
export default Alert;