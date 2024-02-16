
import  react from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'red'
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
  fieldTextSBold:{
    fontFamily: 'Poppins-Regular',
    fontSize:14, 
    color:"#171717",  
    height:45,
    fontWeight:'400',
  },
  fieldText:{
    fontFamily: 'Poppins-Regular',
    fontSize:12, 
    color:"#171717",  
    height:45
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
    //backgroundColor: 'red',
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
     fontFamily:'Poppins-Regular', 
    fontSize: 14, 
    textTransform:"uppercase",
    marginLeft:20,
    color:"black"
     
  },
  pageTitleMedium: {
    paddingBottom: 20,
    paddingTop: 30,
     fontFamily:'Poppins-Medium', 
    fontSize: 13,
    color:"black",
    textTransform:"uppercase",
    marginLeft:0
     
  },
  fieldLabel: {
    paddingVertical: 10, 
    fontFamily:'Poppins-Regular',
    fontSize:12,
    justifyContent:'flex-start',
   // color:"#8F92A1"
  },
  pageHeader: {
    paddingTop: 10,
    alignContent: "flex-end"
  },
  tabBarIcon: {
    width: 60,
    height: 60,
   // color: "black",
    fontSize: 200
  },
  tabPageContent:{
    height:"95%",
    paddingLeft:15,
    paddingRight:15
  },
  tabPageContent_small:{
    height:"95%",
    paddingLeft:15,
    paddingRight:15
  },

  tabTitleText:{
    fontFamily:'Poppins-Regular',
    fontSize:12, 
    textTransform:"capitalize",
  },
  tabItemButton:{
    height:29,
    borderRadius: 0,
  },
  buttonGeneral: {
    borderRadius: 0,
  },
  shortButton: {
    marginRight: 22,
    marginLeft: "auto",
    borderRadius:10,
    zIndex:2,
    position:"absolute",
    right:0,
    bottom:20

  }, 
  subTitle: {
    fontSize: 13,
    fontWeight:"bold",
    fontFamily:"Poppins",
    //color:"#807777",
    letterSpacing:.1,
  },
  langugeHeading:{
    textAlign:"center",
    paddingBottom:20,
    paddingTop:95,
    width:"100%",
    fontFamily:"Poppins-Regular",
    fontSize:32,
   // color:"black",
    //fontWeight:"650",
    letterSpacing:1,
  },
  mainHeading:{
    textAlign:"center",
    width:"100%",
    fontFamily:"Poppins-Italic",
    fontSize:14,
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
   paddingVertical: 10, 
    fontFamily:'Poppins-Regular',
    justifyContent:'flex-start',
    //color:"#8F92A1"

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

},
listHeading:{
  fontFamily:"Poppins-Regular",
  fontSize:16, 
  color:"black",
   
},
listHeadingMedium:{
  fontFamily:"Poppins-Medium",
  fontSize:16, 
  color:"black",
   
  
},
titleMedium18:{
  fontFamily:"Poppins-Medium",
  fontSize:18,  
  
},
titleMedium12:{
  fontFamily:"Poppins-Medium",
  fontSize:12,  
  
},
textMedium13:{
  fontFamily:"Poppins-Medium",
  fontSize:13,  
  color:"#171717"
  
},
textRegular14:{
  fontFamily:"Poppins-Regular",
  fontSize:14,   
  fontWeight:"600"
  
},
subtitleRegular8:{
  fontFamily:"Poppins-Regular",
  fontSize:8, 
  color:"black",
},
listSubHeading:{
  fontFamily:"Poppins-Regular",
  fontSize:9.9,
  color:"#171717"
},
listSubDescription:{
  fontFamily:"Poppins-Regular",
  fontSize:9.9,
   color:"#171717",
  opacity:.5
},
listBadgeSection:{
  paddingTop:3
},
listBadge:{
   borderRadius:5,
   height:18,  
    
},
listBadgeItem:{
  fontFamily:"Poppins-Regular",
  fontSize:9,
 // color:"black",
  textTransform:"capitalize",
  minWidth:90,
  textAlign:"center"
},
listBadgeItemSmall:{
  fontFamily:"Poppins-Regular",
  fontSize:9,
 // color:"black",
  textTransform:"capitalize",
  minWidth:50,
   
  textAlign:"center"

},
listContentItem:{
borderRadius:5,
  
},
buttonText:{
  fontFamily:"Poppins-semiBold",
  fontSize:15 
},
 
boxShadow:{
  shadowColor: '#6495ED',
  shadowOpacity: 0.26,
  shadowOffset: { width: 0, height: 1},
  shadowRadius: 5,
  elevation: 8,
  backgroundColor:"white"
},
attachmentPopper:{
  width:"100%",height:"100%",backgroundColor:"red",bottom:45,position:"absolute", zIndex:2000,
  borderRadius:20
},
popUpNode:{
  width:"100%",height:44,backgroundColor:"#1877F2",  position:"absolute",
  borderRadius:20, paddingTop:14,  paddingLeft:20, 
},
touchableButton: {
  alignItems: 'center',
  backgroundColor: '#1877F2',
  padding: 10,
  width:300,
  marginBottom:10,
  borderRadius:20,
  color:"white"
},
popperButton:{
  color:"white"
},
roundIconButton:{
  width: 20,
  borderRadius: 50,
}
})

