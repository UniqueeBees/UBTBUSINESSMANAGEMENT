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

        <Badge style={styles.listBadge} variant="solid" backgroundColor={color} action="muted" >
          <BadgeText color="$white" style={styles.listBadgeItemSmall}>{statusName}</BadgeText>
        </Badge>
        <Badge style={styles.listBadge}  variant="solid" action="muted" >
          <BadgeText style={styles.listBadgeItem} >{dueDate}</BadgeText>
        </Badge>
      </HStack>
    )
  }
  return (

    <View style={{height:"87%"}}  >
      <FlatList  showsVerticalScrollIndicator={false}
        data={props.taskListItems}
        renderItem={({ item }) => <Box style={[styles.listContentItem, styles.boxShadow]}   m="$2" p="$2" pl="$5">
          <VStack >
             <Text numberOfLines={1} ellipsizeMode="tail"  style={styles.listHeading}>{item.title}</Text> 
            {item.description && <Text style={styles.listSubHeading} >{item.description}</Text>}
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
     <ButtonText  ><Icon color="$white" as={AddIcon} m="$2" w="$4" h="$4" /></ButtonText>    
      </Button>
    </View>
  )
}
export default TaskList;