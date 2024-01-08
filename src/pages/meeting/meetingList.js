import React from "react";

import {
    VStack,HStack,Icon ,ArrowRightIcon,Button,Heading,Box,Badge,BadgeText
  } from "@gluestack-ui/themed";
  import {FlatList, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
function MeetingList(props){

return(

      
      <FlatList 
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
    
    )
}
export default MeetingList;