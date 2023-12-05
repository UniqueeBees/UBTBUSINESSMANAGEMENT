
import { React, useState } from 'react';
import { Text, View, StyleSheet, Image, Alert, TextInput } from 'react-native';
import { Button, VStack, Center, ButtonText, ButtonIcon, Input ,InputSlot,InputIcon,InputField} from "@gluestack-ui/themed";
import { styles } from '../assets/styles/theme'
import { storeData, storageKeyTypes, getData } from '../common/localStorage'
import { Building2 , ArrowRight } from 'lucide-react-native';
function Splash() {
  const [companyName, setcompanyName] = useState(getData(storageKeyTypes.company));
  function onChange(text) {
    setcompanyName(text);
    storeData(storageKeyTypes.company, text);
  }
  return (
    /*bg="$primary500"*/
    <VStack h="100%" >
      <Center h="100%" shadow={3} >
        <VStack>
          <Image source={require('../assets/images/Logofile.png')} style={styles.logo} />
        </VStack>
        <VStack mt={50} style={{ width: 300 }} >
        <Text style={styles.subheading}>Company UserName </Text>
          <Input  variant={"underlined"} size="sm" mt={10}>
            <InputSlot pl="$0" pr="$4">
              <InputIcon size={25} as={Building2 } />
            </InputSlot>
            <InputField placeholder="Company UserName"   
            width="200"
            maxLength={200}
            onChangeText={text => onChange(text)}
            value={companyName}/>
          </Input> 
        </VStack>
        <VStack mt={100} style={{ width: 300 }}>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            style={styles.buttonLong}
          >
            <ButtonText>Next </ButtonText>
            <ButtonIcon ml={"80%"} size={20} as={ArrowRight} />
          </Button>
        </VStack>
      </Center>
    </VStack>
  )
}
export default Splash;