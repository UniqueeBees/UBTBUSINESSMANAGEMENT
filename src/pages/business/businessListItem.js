import React from "react";
import { Box, VStack, HStack, BadgeText, Icon, MailIcon, PhoneIcon } from "@gluestack-ui/themed";
import { View, Text } from "react-native";
import ListEditContextMenuLauncher from "../../common/listEditContextMenu/listEditContextMenuLauncher";
import { styles } from '../../assets/styles/theme'
function BusinessListItem(props) {
    const item = props.item;
    return (
        <Box style={[styles.listContentItem, styles.boxShadow]} m="$2" p="$2" pl="$5">
            <View  >
                <VStack>
                    <HStack justifyContent="space-between">
                        <HStack justifyContent="right" space="lg" width="80%" >
                            <VStack>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.listHeadingMedium} >{item.name}</Text>
                                <Text style={styles.listSubDescription} >{item.city}</Text>
                            </VStack>

                        </HStack>
                        <HStack justifyContent="flex-end"  width="20%" >
                            <ListEditContextMenuLauncher source={'businessList'} type="business" id={item.id} />
                        </HStack>
                    </HStack>
                    <HStack>
                        <HStack justifyContent="flex-start">
                            {item.email ? <Icon as={MailIcon} m="$1" w="$3" h="$3" ml="$0" /> : ""}<BadgeText style={[{ textTransform: 'capitalize', paddingTop: 0 }, styles.listSubHeading]}>{item.email}</BadgeText>
                        </HStack>
                        <HStack justifyContent="left">
                            {item.phone ? <Icon as={PhoneIcon} m="$1" w="$3" h="$3" ml={item.email ? "$3" : "$0"} /> : ""}<BadgeText style={[{ textTransform: 'capitalize', paddingTop: 0 }, styles.listSubHeading]}>{item.phone}</BadgeText>
                        </HStack>
                    </HStack>
                </VStack>
            </View>
        </Box>
    );
}
export default BusinessListItem;