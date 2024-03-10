import React from "react";
import { styles } from '../../assets/styles/theme'
import {
  VStack, HStack, Icon, ArrowRightIcon, Button, Heading, Box, Badge, BadgeText, ButtonText, AddIcon
} from "@gluestack-ui/themed";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ListEditContextMenuLauncher from "../../common/listEditContextMenu/listEditContextMenuLauncher";
import { Dimensions } from 'react-native';
function MeetingList(props) {
  const navigation = useNavigation();
  return (
<View>
  <VStack  style={{height: Dimensions.get('window').height - 220}} ml={42.25} mr={42.25} >
      <FlatList    showsVerticalScrollIndicator={false}
        data={props.meetingListItems}
        renderItem={({ item }) =>
          <Box style={[styles.listContentItem, styles.boxShadow]} bgColor="$white" m="$2" p="$2" pl="$5" maxHeight={86.5}>
            <VStack>
              <HStack maxHeight={17}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.listHeading} width={'93%'}>{item.title}</Text>
                <HStack justifyContent="flex-end">
                  <ListEditContextMenuLauncher type="meeting" id={item.id} />
                </HStack>
              </HStack>

              <HStack space="md" justifyContent="flex-start" maxHeight={20} mt="$1">
                <Text style={styles.listSubHeading} >{`${item.contactName} - ${item.businessName}`}</Text>
              </HStack>

              {item.description && <Text style={styles.listSubDescription} >{item.description}</Text>}
              <HStack space="md" justifyContent="flex-end" style={styles.listBadgeSection}>

                <Badge style={styles.listBadge} action="muted" bgColor={item.meetingPurpose ? "#dadada" : ""}  >
                  <BadgeText style={styles.listBadgeItemSmall}>{item.meetingPurpose}</BadgeText>
                </Badge>
                <Badge style={styles.listBadge} variant="solid" action="muted" backgroundColor={item.scheduledAt ? "#dadada" : ""} minWidth={70} maxWidth={70} >
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

        style={styles.shortButton}

        onPress={() => navigation.navigate("meetingSetup")}

      >
        <ButtonText ><Icon color="$white" as={AddIcon} m="$2" w="$4" h="$4" /></ButtonText>
      </Button>
      </VStack>
    </View>
  )
}
export default MeetingList;