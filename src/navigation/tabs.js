import React, { useEffect } from 'react';
import { StyleSheet ,View,Text,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator ,BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign'
import PushNotification from "react-native-push-notification";
import Home from '../pages/home';
import Dashboard from '../pages/dashboard';
import BusinessList from '../pages/business/businessList'
import BusinessSelectList from '../pages/formBusinessList/businessSelectList';
import BusinessDetails from '../pages/business/businessDetails'
import Settings from '../pages/settings/settings';
import MeetingSetup from '../pages/meeting/meetingSetup';
import TaskSetup from '../pages/task/taskSetup';
import TaskListLayout from '../pages/task/taskListLayout';
import CreateContact from '../pages/contacts/createContact';
import PopperButton from '../navigation/poperButton'
import { SettingsIcon,Icon } from '@gluestack-ui/themed';
import { Briefcase} from 'lucide-react-native';
 const TabIconSize="35";
 const TabIconColor="black";
const Tab=createBottomTabNavigator();
import { styles } from '../assets/styles/theme'
const DashboardStack = createNativeStackNavigator();
const BusinessStack=createNativeStackNavigator();
function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator screenOptions={{headerShown:false}}>
      <DashboardStack.Screen name="dashboardLayout" component={Dashboard} />
      <DashboardStack.Screen name="meetingSetup" component={MeetingSetup} />
      <DashboardStack.Screen name="taskSetup" component={TaskSetup} />
      <DashboardStack.Screen name="contactSetup" component={CreateContact} />
      <BusinessStack.Screen name="businessSelectList" component={BusinessSelectList}/>
    </DashboardStack.Navigator>
  );
}
function BusinessStackScreen(){
  return (
    <BusinessStack.Navigator screenOptions={{headerShown:false}}>
      <BusinessStack.Screen name="businessList" component={BusinessList}/>
      <BusinessStack.Screen name="businessDetails" component={BusinessDetails}/>
    </BusinessStack.Navigator>
  )
}
 
function Tabs() {
    
    return ( 
      
        <Tab.Navigator 
        initialRouteName='dashboard' 
        screenOptions={{
          tabBarInactiveTintColor: '#020202',
          tabBarActiveTintColor: '#1877F2',
            tabBarShowLabel:false,
            headerShown:false,
            tabBarHideOnKeyboard:true,
            tabBarStyle: {  
           position:'absolute',
                bottom:0,
                left:0,
                right:0,
                elevation:9,
                backgroundColor:'#ffffff',
                borderTopLeftRadius: 35, 
                borderTopRightRadius: 35, 
                height:"10%",
                ...styles.boxShadow
              },
              
          }} >  
            <Tab.Screen name="dashboard"  
             component={
              
              DashboardStackScreen
            }
           options={{
            tabBarLabel: 'Updates', 
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" color={color} size={size}  />
            ), 
          }} ></Tab.Screen> 
          <Tab.Screen name="businessLayout" component={BusinessStackScreen}
           options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, size }) => (
              <Icon as={Briefcase} color={color} size={size} />
              ), 
          }} ></Tab.Screen> 
          
          <Tab.Screen name="Add"  component={DashboardStackScreen}
          listeners={{
            tabPress: e => {
              // Prevent default action
              e.preventDefault();
            },
          }}
           options={{
            
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, size }) => (
              <PopperButton></PopperButton>
             
            ), 
          }} ></Tab.Screen> 
            <Tab.Screen name="taskListLayout" component={TaskListLayout}
           options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="profile" color={color} size={size} />
            ), 
          }} ></Tab.Screen> 
           <Tab.Screen name="Settings" component={Settings}
           options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, size }) => (
              <Icon as={SettingsIcon} m="$2" w="$7" h="$7" />
            ), 
          }} ></Tab.Screen> 

        </Tab.Navigator>
       
    );
}
export default Tabs;