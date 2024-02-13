import React, { useEffect, useState ,useRef} from "react"
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
 
 

} from "@gluestack-ui/themed"
import { ArrowRight } from 'lucide-react-native';
import { styles } from '../../../assets/styles/theme'
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import { ArrowBigRightDash, CheckCircle2, SendHorizontal, PlusSquare } from 'lucide-react-native';


import { View ,TouchableOpacity} from "react-native";

function FeedAttacher() {

  const [openPopper, setOpenPopper] = useState(false);
  const refPop=useRef(null); 
  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setOpenPopper(false);
    }
  };
  useEffect(() => {
  
  }); 
  return (
    <View style={{ marginTop: 200 }}>
      <View width="100%" mx="3" height="100%" style={styles.fieldSetContainer}>
        <VStack >
        {openPopper &&
              <VStack style={styles.attachmentPopper} id="popBlock" ref={refPop}>
                <HStack space="md" style={[styles.boxShadow,styles.popUpNode]} >                
                <Icon  as={PlusSquare} size={20}></Icon>
                <Text  style={{paddingBottom:"10"}}>Create Meeting</Text>
                </HStack>
              </VStack>} 
          <HStack>  
           
            <Button
              mt="$1"
              mr="$1"
              size="md"
              variant="solid"
              action="primary" 
            
              onPress={e=>setOpenPopper(!openPopper)}
            > 
              <ButtonIcon size={20} as={PlusSquare} />
            </Button>
            
            <FormControl mt="$1"  style={{ width: "70%" }}> 
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