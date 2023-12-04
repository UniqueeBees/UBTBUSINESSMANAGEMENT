
import { Button, VStack, Center } from '@gluestack-ui/themed';
import React from 'react';
import { TouchableOpacity, PermissionsAndroid } from 'react-native';
import { Text, View, StatusBar, Alert } from 'react-native';
import { sentNotification } from '../notification/appNotification'
import { getToken, getApi, getCompany } from '../common/apiCalls'
import axios from "axios";

function Home() {

    return (
        <VStack  bg="$primary500" h="100%" >
            <Center ml={25} mt={25} mr={25} mb={50} h="80%" bg="$indigo300" rounded={50} shadow={3} >
                <Text>Home1</Text>
                <TouchableOpacity onPress={() => sentNotification("Home")}>
                    <Text>Sent Notification12</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getToken("microsoft","fasil","123456")}>
                    <Text>Get Token12</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => getCompany("credozone")}>
                    <Text>Get company</Text>
                </TouchableOpacity>
            </Center>
        </VStack >


    )
}
export default Home;