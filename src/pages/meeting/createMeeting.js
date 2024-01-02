import React from 'react';
import {Image, View} from 'react-native';
import { Center,VStack,Heading,Button,ButtonText } from '@gluestack-ui/themed';
import { styles } from '../../assets/styles/theme'
function CreateMeeting(){
return(
  <View>
    <Center>
        <VStack>
        <Image source={require('../../assets/images/Logofile.png')} style={styles.logo} /> 
        <Heading>No Meeting Listed</Heading>
        <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            style={styles.buttonLong}
          >
            <ButtonText >Create Meeting</ButtonText>
          </Button>
        </VStack>
    </Center>
    </View>
)
}
export default CreateMeeting;