import React from "react"
import {
  VStack,
  FormControl,
  Input,
  Center
} from "@gluestack-ui/themed"
import { businessDTO } from "../dto/businessDTO"
import { styles } from '../assets/styles/theme'

const [formData, setData] = React.useState(businessDTO)
const [wizardStage, setwizStage] = React.useState(1)

function BusinessDetails_W1() {

  return ( 
    <VStack width="90%" mx="3" maxW="300px">
      <FormControl isRequired>
        <FormControl.Label  _text={{ bold: true }}>  Type </FormControl.Label>
        <Input  placeholder="John" onChangeText={value => setData({ ...formData, type: value })} /> 
        <FormControl.ErrorMessage _text={{ fontSize: "xs" }} > Error Name </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired>
        <FormControl.Label  _text={{ bold: true }}>  Name </FormControl.Label>
        <Input  placeholder="Enter Business Name" onChangeText={value => setData({ ...formData, name: value })} /> 
        <FormControl.ErrorMessage _text={{ fontSize: "xs" }} > Error Name </FormControl.ErrorMessage>
      </FormControl>
      <FormControl >
        <FormControl.Label  _text={{ bold: true }}>  Email Address </FormControl.Label>
        <Input  placeholder="Email Address" onChangeText={value => setData({ ...formData, email: value })} />
      </FormControl>
      <FormControl >
        <FormControl.Label  _text={{ bold: true }}>  Phone Number </FormControl.Label>
        <Input  placeholder="Phone Number" onChangeText={value => setData({ ...formData, phone: value })} />
      </FormControl>
      <FormControl >
        <FormControl.Label  _text={{ bold: true }}>  Website </FormControl.Label>
        <Input  placeholder="Website" onChangeText={value => setData({ ...formData, website: value })} />
      </FormControl>
      <FormControl >
        <FormControl.Label  _text={{ bold: true }}>  Tags </FormControl.Label>
        <Input  placeholder="Tags" onChangeText={value => setData({ ...formData, tags: value })} />
      </FormControl>

      <VStack mt={100} style={{ width: 300 }}>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}

            style={styles.buttonLong}

            onPress={setwizStage(2)}

          >
            <ButtonText >Next</ButtonText>
            <ButtonIcon ml={"80%"} size={20} as={ArrowRight} />
          </Button>
        </VStack>

    </VStack>
  )
} 
function BusinessDetails_W2() {

  return ( 
    <VStack width="90%" mx="3" maxW="300px">
      <FormControl  >
        <FormControl.Label  _text={{ bold: true }}>  Landmark </FormControl.Label>
        <Input  placeholder="Enter Nearest Landmark" onChangeText={value => setData({ ...formData, landmark: value })} /> 
        <FormControl.ErrorMessage _text={{ fontSize: "xs" }} > Error Name </FormControl.ErrorMessage>
      </FormControl>
      <FormControl  >
        <FormControl.Label  _text={{ bold: true }}>  Street </FormControl.Label>
        <Input  placeholder="Enter Street" onChangeText={value => setData({ ...formData, street: value })} /> 
        <FormControl.ErrorMessage _text={{ fontSize: "xs" }} > Error Name </FormControl.ErrorMessage>
      </FormControl>
      <FormControl >
        <FormControl.Label  _text={{ bold: true }}>  Area  </FormControl.Label>
        <Input  placeholder="Enter Area" onChangeText={value => setData({ ...formData, area: value })} />
      </FormControl>
      <FormControl >
        <FormControl.Label  _text={{ bold: true }}>  City </FormControl.Label>
        <Input  placeholder="Enter City" onChangeText={value => setData({ ...formData, city: value })} />
      </FormControl>
      <FormControl >
        <FormControl.Label  _text={{ bold: true }}>  Country </FormControl.Label>
        <Input  placeholder="Select Business Country" onChangeText={value => setData({ ...formData, country: value })} />
      </FormControl> 

      <VStack mt={100} style={{ width: 300 }}>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}

            style={styles.buttonLong}

            onPress={setwizStage(3)}

          >
            <ButtonText >Next</ButtonText>
            <ButtonIcon ml={"80%"} size={20} as={ArrowRight} />
          </Button>
        </VStack>

    </VStack>
  )
} 
export default () => {
 
  return (
     
      <Center flex={1} px="3">
        {wizardStage===1 && <BusinessDetails_W1 />}
        {wizardStage===2 && <BusinessDetails_W2 />}
      </Center>
    
  )
}
