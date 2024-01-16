import React from "react";
import { styles } from '../../assets/styles/theme'
import {
    VStack,HStack,Icon ,ArrowRightIcon,Button,Heading,Box,Badge,BadgeText,ButtonText,AddIcon
  } from "@gluestack-ui/themed";
  import {FlatList, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
  import { useNavigation } from '@react-navigation/native';
function MeetingList(props){
  const navigation = useNavigation();
return(

  <View>
      <FlatList style={{ height: "84%" }}
        data={props.meetingListItems}
        renderItem={({item}) => <Box style={{borderRadius:5}}  bgColor="$white" m="$2" p="$2" pl="$5">
          <VStack >
          <Heading size="md" >{item.title}</Heading>
          {item.description && <Text>{item.description}</Text>}
          <HStack space="md" justifyContent="flex-end" >

            <Badge size="md" variant="solid" borderRadius="$xl" action="muted" bgColor={item.meetingPurpose ? "#dadada":""}  >
              <BadgeText style={{textTransform: 'capitalize'}}>{item.meetingPurpose}</BadgeText>
            </Badge>
            <Badge size="md" variant="solid" borderRadius="$xl" action="muted" backgroundColor={item.scheduledAt ? "#dadada":""}  width={130}>
              <BadgeText >{item.scheduledAt}</BadgeText>
            </Badge>
          </HStack>
       </VStack>
       </Box>}
      />

<Button 
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        
        style={styles.shortButton }

        onPress={()=>navigation.navigate("meetingSetup")}

      >
     <ButtonText ><Icon color="$white" as={AddIcon} m="$2" w="$4" h="$4" /></ButtonText>    
      </Button>
    </View>
    )
}
export default MeetingList;