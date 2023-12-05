
import React from 'react';
import { Text, View, StyleSheet, Image, Alert } from 'react-native';
import { Button, VStack, Center } from "@gluestack-ui/themed";
import {styles} from '../assets/styles/theme'

function Splash() {
  return (
    <VStack bg="$primary500" h="100%" >
      <Center  h="100%"   shadow={3} >
        <Text>UBT Business Management System</Text>
        <Image source={require('../assets/images/Logofile.png')  }  style={styles.logo}/> 
      </Center>
    </VStack>
  )
}
export default Splash;