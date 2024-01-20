import React from "react";
import { useToast, Center, VStack, Spinner, HStack } from "@gluestack-ui/themed";
import { Text, View } from "lucide-react-native";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showLoading } from '../slices/loadingSlice'
import { styles } from "../assets/styles/theme";
import {ActivityIndicator} from 'react-native';
const Loading = (props) => {
  const toast = useToast()
  const loadingState = useSelector((state) => state.loading)
  const dispatch = useDispatch()
  let isShow = false;
  useEffect(() => {
    if (loadingState) {
      if (loadingState.loading) {
        isShow = true;

      }else{
        isShow = false;
      }

    }
  }, [loadingState])

console.log(loadingState.loading )

  return (
    <VStack>   
    {loadingState.loading?<VStack style={styles.overlay}><Spinner style={styles.loading} size="large"/></VStack>:""}</VStack>
         
  )


};
export default Loading;