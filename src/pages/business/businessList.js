import {React,useState,useEffect } from "react" 
 
import { Button, VStack, Center, ButtonText, ButtonIcon, Input, InputSlot, InputIcon, InputField ,Text} from "@gluestack-ui/themed";
import { styles } from '../../assets/styles/theme'
import { Building2, ArrowRight } from 'lucide-react-native';
import { navigateTo, navigationRoutes, navAction } from '../../common/navigation'
import BusinessDetails from "./businessDetails";
const sections ={
  list:0,
  new:1,
}


 
function BusinessList (props) {
  const [section, setSection] = useState(sections.list);
  function NewItem (){
    return <BusinessDetails onComplete={loadList}></BusinessDetails>
  }
  function loadList(){
    setSection(sections.list)
  }
function list (){
    onCreateCompany=()=>{
       setSection(sections.new)
   }  
    return ( 
      <Center flex={1} px="3">
       <VStack>
          <Text> Business List </Text>
          <Button
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
  
          style={styles.buttonLong}
  
          onPress={onCreateCompany}
  
        >
          <ButtonText >New Business 1</ButtonText>
          <ButtonIcon ml={"80%"} size={20} as={ArrowRight} />
        </Button>
       </VStack>
      </Center>
    
  )
  }
  
  switch(section){
    case sections.list:{
      return list(); 
    }
    case sections.new:{
      return NewItem();
    }
    default :{
      return list(); 
    }
  }
  } 
  export default BusinessList;