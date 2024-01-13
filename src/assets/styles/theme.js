
import React from 'react';
import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white'
  },
  logo: {
    width: 200,
    height: 200,
  },
  input: {
    height: 40,
    margin: 2,
    borderBottomWidth: 1,
    padding: 10,
  },
  buttonLong: {
    width: 300,
    borderRadius: 0,


  },
  subheading: {
    fontFamily: 'Arial',
    fontSize: 12
  },
  fieldSetContainer: {
    //backgroundColor: 'smokewhiter',
    paddingTop: 0,
    paddingVertical: 100,
    paddingHorizontal: 5,
    justifyContent: "space-between",
    alignItems: "stretch",
    paddingLeft: 20,
    paddingRight: 20,
  },
  pageTitle: {
    paddingBottom: 20,
    paddingTop: 20,
    fontFamily: "segoeui",
    fontSize: 16
  },
  fieldLabel: {
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  pageHeader: {
    paddingTop: 10,
    alignContent: "flex-end"
  },
  tabBarIcon: {
    width: 60,
    height: 60,
    color: "black",
    fontSize: 200
  },
  buttonGeneral: {
    borderRadius: 0,
  },
  shortButton: {
    marginRight: 10,
    marginLeft: "auto",
    borderRadius:25,
    zIndex:2,
    position:"absolute",
    right:0,
    bottom:0

  },
  subTitle: {
    fontSize: 15,
    fontWeight:"normal",
    fontFamily:"Poppins",
  },
  langugeHeading:{
    textAlign:"center",
    paddingBottom:50,
    paddingTop:50,
    width:"100%",
    fontFamily:"Poppins",
    fontSize:28,
    fontWeight:"normal"}

});
