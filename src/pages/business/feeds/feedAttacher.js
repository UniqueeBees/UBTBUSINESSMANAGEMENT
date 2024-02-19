import React, { useEffect, useState, useRef } from "react"
import {
  VStack,
  FormControl,
  Input,
  InputField,
  Center,
  Button,
  ButtonText,
  ButtonIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Heading,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  SelectIcon,
  SelectContent,
  Icon,
  ChevronDownIcon,
  HStack,
  ArrowLeftIcon,
  ScrollView,
  Text,
  Box,
  Popover,
  PopoverBackdrop,
  PopoverContent,
  PopoverBody,
  FlatList,



} from "@gluestack-ui/themed"
import { ArrowRight } from 'lucide-react-native';
import { styles } from '../../../assets/styles/theme'
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import { ArrowBigRightDash, CheckCircle2, SendHorizontal, PlusSquare } from 'lucide-react-native';
import Modal from "react-native-modal";

import { View, TouchableOpacity,TouchableWithoutFeedback } from "react-native";

function FeedAttacher(props) {

  const [openPopper, setOpenPopper] = useState(false);
  const refPop = useRef(null);
  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setOpenPopper(false);
    }
  };
  useEffect(() => {

  });
  function callAction (objectName){
     props.onSelect(objectName);
     setOpenPopper(false);
  }
  const popItems = [{ name: props.objEnum.createmeeting, description: "Create Meeting", icon: PlusSquare  },
  { name: props.objEnum.recording, description: "Recording", icon: PlusSquare },
  { name: props.objEnum.contacts, description: "Contacts", icon: PlusSquare },
  { name: props.objEnum.attachments, description: "Attachments", icon: PlusSquare },
  { name: props.objEnum.createTasks, description: "Create Tasks", icon: PlusSquare },
  { name: props.objEnum.travel, description: "Start Travel", icon: PlusSquare },
  { name: "cancel", description: "Cancel", icon: PlusSquare },
  ];
  return (
    <View style={{ bottom:"3%" } }>
      <View style={{height:"86%"}}></View>
      <View width="100%" mx="3" height="1%" style={styles.fieldSetContainer}>
        <VStack >
          <HStack> 
            <Button
              mt="$1"
              mr="$1"
              size="md"
              variant="solid"
              action="primary"
              onPress={e => setOpenPopper(!openPopper)}
            >
              <ButtonIcon size={20} as={PlusSquare} />
            </Button>
            <View style={{ flex:1 , width:"100%"}} >
            <Modal isVisible={openPopper} coverScreen={false} hasBackdrop={false} animationIn="fadeIn" animationOut="fadeOut"  >
              
        <View  style={{
            width: 400,height: 400,bottom:300,right:98,paddingLeft:20,paddingBottom:0,paddingTop:20,backgroundColor:"white",borderRadius:20}}>
              
         <FlatList
         data={popItems}
         renderItem={({item})=>(
          <Center>
            <HStack space="md">
            <TouchableOpacity style={styles.touchableButton} onPress={()=>callAction(item.name)}>
            <Text style={styles.popperButton}>{item.description}</Text>
            </TouchableOpacity>
            </HStack>
            </Center>
         )}
         >

         </FlatList> 
          
        </View>
      </Modal>
</View>
            <FormControl mt="$1" style={{ width: "70%" }}>
              <Input     >
                <InputField placeholder="Enter Business Name1"    ></InputField>
              </Input>
            </FormControl>
            <Icon fill="$blue500" as={SendHorizontal} size={45}></Icon>
          </HStack>
        </VStack>
      </View>
    </View>
  )
}
export default FeedAttacher;