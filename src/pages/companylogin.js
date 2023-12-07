
import { VStack, Center } from '@gluestack-ui/themed';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View, StatusBar, Alert,Image } from 'react-native';
import { sentNotification } from '../notification/appNotification'
import { getToken, getApi, getCompany } from '../common/apiCalls'
import {storeData,storageKeyTypes,getData} from '../common/localStorage'

function Home() {

    return (
        <VStack  bg="$primary500" h="100%" >
            <Center ml={25} mt={25} mr={25} mb={50} h="80%" bg="$indigo300" rounded={50} shadow={3} >
               
            </Center>
        </VStack >


    )
}
export default Home;