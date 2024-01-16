
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
    fontFamily: 'Poppins-Italic',
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
    fontFamily:"Poppins-Italic",
  },
  pageTitle: {
    paddingBottom: 20,
    paddingTop: 20,
    fontFamily:"Poppins-Italic",
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
    fontSize: 13,
    fontWeight:"bold",
    fontFamily:"Poppins",
    color:"#807777",
    letterSpacing:.1,
  },
  langugeHeading:{
    textAlign:"center",
    paddingBottom:20,
    paddingTop:95,
    width:"100%",
    fontFamily:"Poppins",
    fontSize:25,
    fontWeight:"650",
    letterSpacing:1,
  },
  mainHeading:{
    textAlign:"center",
    width:"100%",
    fontFamily:"Poppins-Italic",
    fontSize:16,
    fontWeight:"normal",
    letterSpacing:1.5,
    textTransform:"uppercase",
    marginTop:20
     
  },
  outerVStack:{
  ml:"$5", mr:"$5"
},
inputLabel:{
  fontSize: 12,
  fontWeight:"normal",
  fontFamily:"Poppins-Italic",

},
inputPlaceholder:{
  fontSize: 13,
  fontWeight:"normal",
  fontFamily:"Poppins-Italic",

},
submitButtonText: {
  width: 240,
  borderRadius: 0,
  fontFamily:"Poppins-Italic",
  fontSize:13,
},
submitButton: {
  width: 300,
  borderRadius: 0,
  textAlign:"center",
  marginTop:10

},
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 300,
  position:"absolute",
  zIndex:1000
},
loading:{
  position: "relative",
  // left: 200,
   top:200,
  
},
overlay:{
  position: "absolute",
  top:"0px",
  left:"0px",
  width: "100%",
  height: "100%",
  background: "red",
  opacity: .5,
  zIndex: 999999,
  textAlign:"center",
  display:"flex",
  alignItems:"center",
 // paddingTop:200,
 
},

pageTitle1:{
  fontFamily:"Poppins",
  fontSize:16,
  fontWeight:"bold",
  letterSpacing:1.5,
  textTransform:"uppercase",
  marginLeft:50

}

});
