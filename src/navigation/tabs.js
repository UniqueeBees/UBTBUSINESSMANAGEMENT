import React, { useEffect } from 'react';
import { StyleSheet ,View,Text,Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign'
import PushNotification from "react-native-push-notification";
import Home from '../pages/home';
import Dashboard from '../pages/dashboard';
import BusinessList from '../pages/business/businessList'
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

 
function Tabs() {
    
    return ( 
      
        <Tab.Navigator
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
              
          }}
           
        >
             <Tab.Screen name="home" component={Home}
           options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" color={color} size={size} />
            ), 
          }} ></Tab.Screen> 
            <Tab.Screen name="business" component={BusinessList}
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