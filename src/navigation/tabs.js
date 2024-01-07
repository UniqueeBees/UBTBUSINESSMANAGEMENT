import React, { useEffect } from 'react';
import { StyleSheet ,View,Text,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign'
import PushNotification from "react-native-push-notification";
import Home from '../pages/home';
import Dashboard from '../pages/dashboard';
import BusinessList from '../pages/business/businessList'
import BusinessDetails from '../pages/business/businessDetails'
import Settings from '../pages/settings';
import MeetingSetup from '../pages/meeting/meetingSetup';
import TaskSetup from '../pages/task/taskSetup';
import PopperButton from '../navigation/poperButton'
 const TabIconSize="35";
 const TabIconColor="black";
const Tab=createBottomTabNavigator();
const styles=StyleSheet.create({
    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset:{
            width:0,
            height:0,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5
    }
})
const DashboardStack = createNativeStackNavigator();
const BusinessStack=createNativeStackNavigator();
function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator screenOptions={{headerShown:false}}>
      <DashboardStack.Screen name="dashboardLayout" component={Dashboard} />
      <DashboardStack.Screen name="meetingSetup" component={MeetingSetup} />
      <DashboardStack.Screen name="taskSetup" component={TaskSetup} />
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
            tabBarShowLabel:false,
            headerShown:false,
            tabBarStyle: {  
              position:'absolute',
                bottom:0,
                left:0,
                right:0,
                elevation:0,
                backgroundColor:'#ffffff',
                borderTopLeftRadius: 35, 
                borderTopRightRadius: 35, 
                height:100,
                
                ...styles.shadow
              },
              
          }} >  
            <Tab.Screen name="dashboard" component={DashboardStackScreen}
           options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" color={color} size={size}  />
            ), 
          }} ></Tab.Screen> 
          <Tab.Screen name="businessList" component={BusinessStackScreen}
           options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="database" color={color} size={size} />
            ), 
          }} ></Tab.Screen> 
          
          <Tab.Screen name="Add" component={Home}
           options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, size }) => (
             // 
             <PopperButton></PopperButton>
            ), 
          }} ></Tab.Screen> 
            <Tab.Screen name="Find1" component={Home}
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
              <AntDesign name="search1" color={color} size={size} />
            ), 
          }} ></Tab.Screen> 

        </Tab.Navigator>
       
    );
}
export default Tabs;