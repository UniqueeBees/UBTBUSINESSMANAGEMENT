import React from "react";
import { useNavigation } from '@react-navigation/native';
import {
  VStack, HStack, Icon, ArrowRightIcon, Button, Heading, Box, Badge, BadgeText, ButtonText, AddIcon
} from "@gluestack-ui/themed";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../../assets/styles/theme'
 
import { SmilePlus} from 'lucide-react-native';
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
        <Badge style={styles.listBadge} variant="solid" action="muted" >
          <BadgeText style={styles.listBadgeItem} >{dueDate}</BadgeText>
        </Badge>
      </HStack>
    )
  }
  return (

    <View style={{ height: "85%" }}  >
      {props.taskListItems.length > 0 ?
        <FlatList showsVerticalScrollIndicator={false}
          data={props.taskListItems}
          renderItem={({ item }) => <Box style={[styles.listContentItem, styles.boxShadow]} m="$2" p="$2" pl="$5">
            <VStack >
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.listHeading}>{item.title}</Text>
              {item.description && <Text style={styles.listSubHeading} >{item.description}</Text>}
              {getTaskStatus(item)}
            </VStack>
          </Box>}
        /> : <View>
          <VStack alignItems='center' pt="$24" space="md">
            <Icon as={SmilePlus} size={120} color="grey" />
            <Text style={{ fontSize: 17 }}>No Task Listed</Text>
          </VStack>
        </View>}
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        style={styles.shortButton}

        onPress={() => navigation.navigate("taskSetup")}
      >
        <ButtonText  ><Icon color="$white" as={AddIcon} m="$2" w="$4" h="$4" /></ButtonText>
      </Button>
    </View>

  )
}
export default TaskList;