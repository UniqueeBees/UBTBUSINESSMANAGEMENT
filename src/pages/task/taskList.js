import React from "react";
import { useNavigation } from '@react-navigation/native';
import {
  VStack, HStack, Icon, ArrowRightIcon, Button, Heading, Box, Badge, BadgeText,ButtonText,AddIcon
} from "@gluestack-ui/themed";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/styles/theme'
function TaskList(props) {
  const navigation = useNavigation();
  const statusList = props.statusList;
  const taskLanguageDTO = props.taskLanguageDTO;
  const getTaskStatus = (task) => {
    const status = statusList.find(statusItem => statusItem.id == task.status);
    const statusName = status ? status.name : '';
    const color = status ? status.color : '';
    const dueDate = `${taskLanguageDTO.dueDate}: ${task.dueDate}`;
    
    return (
      <HStack space="md" justifyContent="flex-end">

        <Badge size="md" variant="solid" backgroundColor={color} borderRadius="$xl" action="muted" >
          <BadgeText color="$white">{statusName}</BadgeText>
        </Badge>
        <Badge size="md" variant="solid" borderRadius="$xl" action="muted" >
          <BadgeText >{dueDate}</BadgeText>
        </Badge>
      </HStack>
    )
  }
  return (

    <View>
      <FlatList style={{ height: "84%" }}
        data={props.taskListItems}
        renderItem={({ item }) => <Box style={{ borderRadius: 5 }} bgColor="$white" m="$2" p="$2" pl="$5">
          <VStack>
            <Heading size="md" >{item.title}</Heading>
            {item.description && <Text>{item.description}</Text>}
            {getTaskStatus(item)}
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

        onPress={()=>navigation.navigate("taskSetup")}

      >
     <ButtonText ><Icon color="$white" as={AddIcon} m="$2" w="$4" h="$4" /></ButtonText>    
      </Button>
    </View>
  )
}
export default TaskList;