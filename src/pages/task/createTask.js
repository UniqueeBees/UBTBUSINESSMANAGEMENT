import React from 'react';
import {Image, View,Text} from 'react-native';
import { Center,VStack,Heading,Button,ButtonText,Icon } from '@gluestack-ui/themed';
import { styles } from '../../assets/styles/theme';
import { SmilePlus} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
function CreateTask(){
  const navigation = useNavigation();
return(
<View style={{backgroundColor:"white"}} height="100%" >
<Center>
    <VStack alignItems='center' pt="$24" space="md">
    <Icon as={SmilePlus} size={120} color="grey" />
    <Text style={{fontSize:17}}>No Task Listed</Text>
    <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        height={50}
        style={styles.buttonLong}
        onPress={() => navigation.navigate('taskSetup')}
      >
        <ButtonText >Create Task</ButtonText>
      </Button>
    </VStack>
</Center>
</View>


)
}
export default CreateTask;