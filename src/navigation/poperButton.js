import React, { useState } from "react";
import { Popover, Button, VStack, Select, CheckIcon, Box, Center ,IconButton} from "@gluestack-ui/themed";
import AntDesign from 'react-native-vector-icons/AntDesign'
import {Text, View,StatusBar,Alert} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
 

/*function PopButton() {
  const [position, setPosition] = useState("top");
  const [isOpen, setIsOpen] = useState(false);
  return <Box w="100%"   alignItems="center" >
    <VStack space={6} alignSelf="flex-start" w="100%">
        <Popover // @ts-ignore
      placement={position === "top" ? undefined : position} trigger={triggerProps => {
        return <IconButton icon={ <AntDesign name="home" color={"black"} size={40}  />}  onPress={() => setIsOpen(true)}></IconButton>
       
      }} isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
          <Popover.Content w="56"  >    
            <Popover.Body>
             body
            </Popover.Body> 
          </Popover.Content>
        </Popover> 
      </VStack
    </Box>;
}*/

    function PopperButton (){
        return (
         
            <Center flex={1} px="3">
                 <AntDesign name="plussquareo" color="black" size={25}   />
            </Center>
         
        );
    };
    export default PopperButton;
    