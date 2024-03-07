import React, { useEffect, useState } from "react";
import {
  VStack, HStack, Icon, ArrowRightIcon, Button, Heading, Box, Badge, BadgeText, Text, Center
} from "@gluestack-ui/themed";
import { FlatList, View, TouchableHighlight, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/loginSlice";
import { setPage, setPageWithParameters } from '../slices/initialPageSlice';
import { resetUser } from "../slices/userSlice";
import { navigationRoutes } from '../common/navigation';
import { getMeetingListByUser } from '../slices/meetingSlice';
import { getTaskListByUser } from '../slices/taskSlice';
import { getBusinessListItems } from '../slices/businessSlice';
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage, AvatarGroup
} from "@gluestack-ui/themed"
import { baseUrl, getProfile } from '../common/apiCalls';
import { styles } from '../assets/styles/theme';
import { Linking } from "react-native";

function Settings() {

  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState('');
  const loginState = useSelector((state) => state.login.loginState)
  const companyId = useSelector((state) => state.company.company.id)
  const settingsLanguageDTO = useSelector((state) => state.language.settingsLanguageDTO)
  const userState = useSelector((state) => state.user)
  const meetingListItems = useSelector((state) => state.meeting.listItems);
  const taskListItems = useSelector((state) => state.task.listItems);
  const businessListItems = useSelector((state) => state.business.businessList);
  const token = useSelector((state) => state.login.token)
  const items = [
    { key: 'language', category: 1, order: 1, label: settingsLanguageDTO.changeLanguage },
    { key: 'company', category: 2, order: 2, label: settingsLanguageDTO.changeCompany },
    { key: 'user', category: 3, order: 3, label: settingsLanguageDTO.logout },
    { key: 'helpLine', category: 4, order: 4, label: settingsLanguageDTO.helpLineNumber },
    { key: 'password', category: 3, order: 5, label: settingsLanguageDTO.changePassword },
  ];

  useEffect(() => {
    if (!loginState) {
      dispatch(resetUser());
      dispatch(setPage(navigationRoutes.login))

    }
  }, [loginState])


  useEffect(() => {
    if (taskListItems.length == 0) {
      dispatch(getTaskListByUser(token))
    }
    if (meetingListItems.length == 0) {
      dispatch(getMeetingListByUser(token))
    }
    if (businessListItems.length == 0) {
      dispatch(getBusinessListItems(token))
    }
  }, [token])

  const actionEvent = (item) => {
    if (item.key === "user") {
      setSelectedItem("user");
      dispatch(logout());
    }
    else if (item.key === "language") {
      console.log('settingds dispatch', item.key)
      dispatch(setPage(navigationRoutes.language))
      // dispatch(setPage(navigationRoutes.none))
    }
    else if (item.key === "company") {
      dispatch(setPageWithParameters({ page: navigationRoutes.company, routeParameters: { skipEffectNav: true } }))
    }
    else if (item.key === "password") {
      dispatch(setPage(navigationRoutes.changePassword))
    }
    else if (item.key === "helpLine") {
      Linking.openURL('tel:9745140025').catch(err=>{console.log(err)});
    }
  }
  const getItems = () => {
    if (loginState) {
      return items;
    }
    else {
      if (companyId > -1) {
        return items.filter(items => items.category !== 3)
      }
      else {
        return items.filter(items => items.category !== 3 && items.category !== 2)
      }
    }
  }

  return (

    <VStack height="100%">
      <VStack bgColor="#1877F2" height={210} pt="$16">
        <HStack space="md" pl="$10">
          <Avatar bgColor="$white" size="md" borderRadius="$full">
            <AvatarImage source={{
              uri: `${baseUrl}/files/${userState.userDTO.profileImage}`,
              method: 'GET',
              headers: {
                Pragma: 'no-cache',
              },
              body: 'Your Body goes here',
            }} />
          </Avatar>
          <VStack>
            <Heading size="sm" color="$white" style={styles.titleMedium18}>{userState.userDTO.fullName}</Heading>
            <Text size="sm" color="$white" style={styles.titleMedium12}>{userState.userDTO.designation}</Text>
          </VStack>
        </HStack>

        <VStack mt="$5" alignItems="left" pl="$10">
          <HStack textAlign="center" >
            <Heading size="xs" width={100} textAlign="center" color="$white" fontSize={10} textTransform="uppercase">Businesses</Heading>
            <Heading size="xs" width={100} textAlign="center" color="$white" fontSize={10} textTransform="uppercase">Meetings</Heading>
            <Heading size="xs" width={100} textAlign="center" color="$white" fontSize={10} textTransform="uppercase">Tasks</Heading>
          </HStack>
        </VStack>
        <VStack alignItems="left" pl="$10" pt="$1">
          <HStack>
            <Heading size="sm" width={100} textAlign="center" color="$white" fontSize={20} fontWeight="bold">{businessListItems.length}</Heading>
            <Heading size="sm" width={100} textAlign="center" color="$white" fontSize={20} fontWeight="bold">{meetingListItems.length}</Heading>
            <Heading size="sm" width={100} textAlign="center" color="$white" fontSize={20} fontWeight="bold">{taskListItems.length}</Heading>
          </HStack>
        </VStack>
      </VStack>
      <Box mt={188} style={{ position: "absolute", width: "100%", height: 30,backgroundColor:"white" ,borderTopLeftRadius:10,borderTopRightRadius:10 }}   >
      </Box>
      <Center>
      <VStack space="lg"pt="$5"   width="90%"  style={styles.tabPageContent}  >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={getItems()}
          renderItem={({ item }) =>
          <View    style={[ styles.listBadge,styles.boxShadow ,{ height: 50,marginTop:20,paddingTop:15 }]}>
            <TouchableOpacity onPress={() => { actionEvent(item) }}  >
              <VStack   style={[  { height: 40 }]} >  
                <HStack alignItems="center"  >
                  <Text style={[styles.textRegular14, { paddingLeft: 15 }]}>{item.label}</Text>
                </HStack>
              </VStack>
            </TouchableOpacity>
            </View>
          }
        />

      </VStack>
      </Center>
    </VStack>
  );
}
export default Settings;