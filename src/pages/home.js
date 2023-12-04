
import { Button, VStack, Center } from '@gluestack-ui/themed';
import React from 'react';
import { TouchableOpacity, PermissionsAndroid } from 'react-native';
import { Text, View, StatusBar, Alert } from 'react-native';
import { sentNotification } from '../notification/appNotification'
import { getToken, getApi } from '../common/apiCalls'
import axios from "axios";

function Home() {

    return (
        <VStack  bg="$primary500" h="100%" >
            <Center ml={25} mt={25} mr={25} mb={50} h="80%" bg="$indigo300" rounded={50} shadow={3} >
                <Text>Home1</Text>
                <TouchableOpacity onPress={() => sentNotification("Home")}>
                    <Text>Sent Notification1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getToken("credozone","fasil","abcd1234")}>
                    <Text>Get Token12</Text>
                </TouchableOpacity>
            </Center>
        </VStack >


    )
}
export default Home;