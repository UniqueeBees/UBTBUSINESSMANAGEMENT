import React from 'react';
import {Image, View,Text} from 'react-native';
import { Center,VStack,Heading,Button,ButtonText,HStack,Icon } from '@gluestack-ui/themed';
import { styles } from '../../assets/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { SmilePlus} from 'lucide-react-native';
function CreateBusiness(){
  const navigation = useNavigation();
return(
  
<View  height="100%" >
    <Center>
    <VStack width="100%" mx="3" style={styles.pageHeader} >
        <HStack space="xs">
        <Text style={[styles.pageTitle,{ textAlign:"center"}]} >Create Business</Text>
          
        </HStack>
        </VStack>

        <VStack alignItems='center' pt="$24" space="md">
        <Icon as={SmilePlus} size={120} color="grey" />
        <Text style={{fontSize:17}}>No Business Listed</Text>
        <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            height={50}
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