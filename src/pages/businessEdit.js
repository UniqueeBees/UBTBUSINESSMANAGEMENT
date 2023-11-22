import React from "react"
import {
  VStack,
  FormControl,
  Input,
  Center
} from "@gluestack-ui/themed"

function BusinessEdit() {
  const [formData, setData] = React.useState({name:""})
  return (
    <VStack width="90%" mx="3" maxW="300px">
      <FormControl isRequired>
        <FormControl.Label  _text={{ bold: true }}>  Name </FormControl.Label>
        <Input  placeholder="John" onChangeText={value => setData({ ...formData, name: value })} />
        <FormControl.HelperText  _text={{  fontSize: "xs" }}> {formData.name.length<3 ?" Name should contain atleast 3 character.":""} </FormControl.HelperText>
        <FormControl.ErrorMessage _text={{ fontSize: "xs" }} > Error Name </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired>
        <FormControl.Label  _text={{ bold: true }}>  Address </FormControl.Label>
        <Input  placeholder="Address" onChangeText={value => setData({ ...formData, name: value })} />
        <FormControl.HelperText  _text={{  fontSize: "xs" }}> {" Address"} </FormControl.HelperText>
        <FormControl.ErrorMessage _text={{ fontSize: "xs" }} > Error Name </FormControl.ErrorMessage>
      </FormControl>
    </VStack>
  )
} 
export default () => {
  return (
     
      <Center flex={1} px="3">
        <BusinessEdit />
      </Center>
    
  )
}
