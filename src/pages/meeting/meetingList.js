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
      <FlatList style={styles.tabPageContent} showsVerticalScrollIndicator={false}
        data={props.meetingListItems}
        renderItem={({item}) => 
        <Box style={styles.listContentItem}  bgColor="$white" m="$1.5" p="$2" pl="$5">
          <VStack >
          <Text  style={styles.listHeading}>{item.title}</Text>
          <HStack space="md" justifyContent= "flex-start">
          <Text style={styles.listSubHeading} >User</Text> 
          <Text style={styles.listSubHeading} >Business</Text> 
          </HStack>
        
          {item.description && <Text style={styles.listSubDescription} >{item.description}</Text>}
          <HStack space="md" justifyContent="flex-end" style={styles.listBadgeSection} >

            <Badge  style={styles.listBadge}   action="muted" bgColor={item.meetingPurpose ? "#dadada":""}  >
              <BadgeText style={styles.listBadgeItem}>{item.meetingPurpose}</BadgeText>
            </Badge>
            <Badge  style={styles.listBadge}   variant="solid"   action="muted" backgroundColor={item.scheduledAt ? "#dadada":""} minWidth={110} maxWidth={110} >
              <BadgeText style={styles.listBadgeItem}>{item.scheduledAt}</BadgeText>
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
     <ButtonText ><Icon color="$white" as={AddIcon} m="$2" w="$6" h="$6" /></ButtonText>    
      </Button>
    </View>
    )
}
export default MeetingList;