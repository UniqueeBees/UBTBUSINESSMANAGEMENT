
import { Button ,VStack,Center } from 'native-base';
import React from 'react';  
import { TouchableOpacity ,PermissionsAndroid } from 'react-native';
import {Text, View,StatusBar,Alert} from 'react-native';
import {sentNotification} from '../notification/appNotification'

function Home (){ 
    return (
    <VStack   bg="amber.400" h="100%" >
        <Center ml={25} mt={25} mr={25} mb={50} h="80%" bg="indigo.300" rounded="md" shadow={3} >
    <Text>Home1</Text>  
    <TouchableOpacity onPress={()=>sentNotification("Home")}>
        <Text>Sent Notification1</Text>
        </TouchableOpacity>
        </Center>
     </VStack >
     
     
    )
}
export default Home;