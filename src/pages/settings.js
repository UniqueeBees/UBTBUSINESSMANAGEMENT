import React, { useEffect, useState } from "react";
import {
  VStack, HStack, Icon, ArrowRightIcon, Button, Heading, Box, Badge, BadgeText, Text, Center
} from "@gluestack-ui/themed";
import { FlatList, View,TouchableHighlight } from "react-native";
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
    }
    else if (item.key === "company") {
      dispatch(setPageWithParameters({ page: navigationRoutes.company, routeParameters: { skipEffectNav: true } }))
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

    <VStack bgColor="$white" height="100%">
      <VStack bgColor="blue" height={200} pt="$10">
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
            <Heading size="sm" color="$white">{userState.userDTO.fullName}</Heading>
            <Text size="sm" color="$white">{userState.userDTO.designation}</Text>
          </VStack>
        </HStack>

        <VStack mt="$5"  alignItems="left" pl="$10">
          <HStack  textAlign="center" >
            <Heading size="xs" width={100} textAlign="center" color="$white" fontSize={12}>Businesses</Heading>
            <Heading size="xs" width={100} textAlign="center" color="$white" fontSize={12}>Meetings</Heading>
            <Heading size="xs" width={100} textAlign="center" color="$white" fontSize={12}>Tasks</Heading>
          </HStack>
        </VStack>
        <VStack alignItems="left" pl="$10">
          <HStack>
            <Heading size="sm" width={100} textAlign="center" color="$white" fontSize={18}>{businessListItems.length}</Heading>
            <Heading size="sm" width={100} textAlign="center" color="$white" fontSize={18}>{meetingListItems.length}</Heading>
            <Heading size="sm" width={100} textAlign="center" color="$white" fontSize={18}>{taskListItems.length}</Heading>
          </HStack>
        </VStack>
      </VStack>
      <Center mt={160} pt="$6" style={{ position: "absolute", width: "100%", height: 70 }} bg="$white" rounded={50} >
      </Center>
      
      <VStack space="md" height="100%" alignItems="left" pl="$12" width="100%" >
        <FlatList
          data={getItems()}
          renderItem={({ item }) => 
            
            <TouchableHighlight onPress={() => { actionEvent(item) }} underlayColor="white">
              <VStack mt="$1" alignItems="center"  bgColor="#F0FFFF" maxWidth={250} >
              <HStack alignItems="center" m="$3" bgColor="$white" borderRadius={20} pl="$3" style={{ height:30,width:250,alignContent:"center" }} >
                <Heading size="md" style={styles.subTitle}  >{item.label}</Heading>
                
              </HStack>
              </VStack>
              </TouchableHighlight>
            
          }
        />
        
      </VStack>
    </VStack>
  );
}
export default Settings;