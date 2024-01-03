import React, { useEffect } from 'react';
import { StyleSheet ,View,Text,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign'
import PushNotification from "react-native-push-notification";
import Home from '../pages/home';
import Dashboard from '../pages/dashboard';
import MeetingSetup from '../pages/meeting/meetingSetup';
import TaskSetup from '../pages/task/taskSetup';
import PopperButton from '../navigation/poperButton'
 
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

function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator screenOptions={{headerShown:false}}>
      <DashboardStack.Screen name="dashboardLayout" component={Dashboard} />
      <DashboardStack.Screen name="meetingSetup" component={MeetingSetup} />
      <DashboardStack.Screen name="taskSetup" component={TaskSetup} />
    </DashboardStack.Navigator>
  );
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
                bottom:25,
                left:20,
                right:20,
                elevation:0,
                backgroundColor:'#ffffff',
                borderRadius: 50, 
                height:60,
                ...styles.shadow
              },
              
          }}
        
        >
             <Tab.Screen name="home" component={Home}
           options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" color={color} size={size} />
            ), 
          }} ></Tab.Screen> 
            <Tab.Screen name="dashboard" component={DashboardStackScreen}
           options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="dashboard" color={color} size={size}  />
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
              <AntDesign name="piechart" color={color} size={size} />
            ), 
          }} ></Tab.Screen> 
           <Tab.Screen name="Find2" component={Home}
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