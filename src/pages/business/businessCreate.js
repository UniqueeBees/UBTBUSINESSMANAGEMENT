import React from 'react';
import {Image, View,Text} from 'react-native';
import { Center,VStack,Heading,Button,ButtonText,HStack } from '@gluestack-ui/themed';
import { styles } from '../../assets/styles/theme';
import { useNavigation } from '@react-navigation/native';
function CreateBusiness(){
  const navigation = useNavigation();
return(
  <View>
    <Center>
    <VStack width="100%" mx="3" style={styles.pageHeader} >
        <HStack space="xs">
        <Text style={[styles.pageTitle,{ textAlign:"center"}]} >Create Business</Text>
          
        </HStack>
        </VStack>

        <VStack>
        <Image source={require('../../assets/images/Logofile.png')} style={styles.logo} /> 
        <Heading>No Business Listed</Heading>
        <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            style={styles.buttonLong}
            onPress={() => navigation.navigate('businessDetails')}
          >
            <ButtonText >Create Business</ButtonText>
          </Button>
        </VStack>
    </Center>
    </View>
)
}
export default CreateBusiness;