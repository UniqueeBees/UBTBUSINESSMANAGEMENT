import React,{useEffect} from "react"
import {
  VStack,
  FormControl,
  Input,
  InputField ,
  Center,
  Button,
  ButtonText,
  ButtonIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Heading,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  SelectIcon,
  SelectContent,
  Icon,
  ChevronDownIcon,
  HStack,
  ArrowLeftIcon,
  ScrollView,
  Text

} from "@gluestack-ui/themed"
import { ArrowRight } from 'lucide-react-native';
import { businessDTO } from "../../dto/businessDTO"
import { styles } from '../../assets/styles/theme'
import { useNavigation } from "@react-navigation/native";
import { useSelector,useDispatch } from 'react-redux';
import {businessTypes} from '../../slices/businessSlice'
import { ArrowBigRightDash,CheckCircle2} from 'lucide-react-native';
import { MoveLeft} from 'lucide-react-native';
const wizardStageEnum = {
  basic: 1,
  advance: 2,
  location: 3,
  files: 4
}

export default function BusinessDetails(props) {
  const [formData, setData] = React.useState(businessDTO)
  const [wizardStage, setwizStage] = React.useState(wizardStageEnum.basic)
  const navigation = useNavigation();
  const businessTypeList = useSelector((state) => state.business.businessTypes);
  const dispatch = useDispatch()
  const token = useSelector((state) => state.login.token)
  useEffect(()=>{
     if(businessTypeList.length===0){
      dispatch(businessTypes(token))
     }
  },businessTypes)
  function getBusinessTypeKey(key){
    let bType= businessTypeList.find(e=>e.key==key);
    if(bType){
      return bType.value;
    }else{ return key;}
  }
  function BusinessDetails_W1() {

    return (
      <VStack width="100%" mx="3"  height ="100%" style={styles.fieldSetContainer}>
        <VStack width="100%" mx="3" style={styles.pageHeader} >
        <HStack space="4xl" style={{marginTop:8}} >
        <Icon as={MoveLeft} size="lg"  onPress={()=>navigation.navigate('businessList')}/><Text style={styles.listHeadingMedium} >Create Business</Text>
        </HStack>
        
        </VStack>
        <Text style={styles.pageTitleMedium}>Basic Details</Text>
        <ScrollView style={styles.scrollView_withToolBar} showsVerticalScrollIndicator={false} >
        <FormControl isRequired>
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>Type</FormControlLabelText>
          </FormControlLabel>
          <Select onValueChange={value => setData({ ...formData, type: value })} >
            <SelectTrigger variant="underlined">
              <SelectInput placeholder="Select Business Type"   value={getBusinessTypeKey(formData.type)} />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal>
              <SelectBackdrop />
              <SelectContent>
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                {businessTypeList.map((item)=>{
                    return  <SelectItem key={item.key} label={item.value} value={item.key} />
                })} 
              </SelectContent>
            </SelectPortal>
          </Select>
          <FormControlError>
            <FormControlErrorText>
              At least 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isRequired>
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>Name</FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined"  size="md"   >
          <InputField  placeholder="Enter Business Name"  value={formData.name}   onChangeText={value => setData({ ...formData, name: value })}></InputField> 
          </Input> 
          <FormControlError>
            <FormControlErrorText>
              At least 6 characters are required.
            </FormControlErrorText>
          </FormControlError>
        </FormControl>
        <FormControl >
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>Email Address</FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined"  size="md"   >
          <InputField placeholder="Enter Email Address" value={formData.email} onChangeText={value => setData({ ...formData, email: value })}></InputField> 
          </Input> 
         
        </FormControl>
        <FormControl >
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>Phone Number </FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined"  size="md"   >
          <InputField placeholder="Enter Phone Number" value={formData.phone} onChangeText={value => setData({ ...formData, phone: value })} ></InputField> 
          </Input> 
           
        </FormControl>
        <FormControl >
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel} >Website</FormControlLabelText>
          </FormControlLabel>
          
          <Input variant="underlined"  size="md"   >
          <InputField placeholder="Enter Website URL"  value={formData.website} onChangeText={value => setData({ ...formData, website: value })} ></InputField> 
          </Input> 
        </FormControl>
        <FormControl >
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>Tags</FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined"  size="md"   >
          <InputField  placeholder="Type Tags Comma Separated" value={formData.tags} onChangeText={value => setData({ ...formData, tags: value })}  ></InputField> 
          </Input>  
        </FormControl>

        <VStack mt={20} mb={50} alignItems="center" style={{ width: "100%" }}>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            style={styles.buttonLong}
            onPress={()=>setwizStage(wizardStageEnum.advance)}
          >
            <ButtonText style={styles.buttonText}>Next</ButtonText>
            <ButtonIcon ml={"80%"} size={20} as={ArrowBigRightDash} />
          </Button>
        </VStack>
        </ScrollView>
      </VStack>
    )
  }
  function BusinessDetails_W2() {

    return (
      <VStack width="100%" mx="3"  style={styles.fieldSetContainer}>
         <VStack width="100%" mx="3" style={styles.pageHeader} >
        <HStack space="4xl">
        <Icon as={MoveLeft} size="lg"   onPress={()=>setwizStage(wizardStageEnum.basic)}/><Text  style={styles.listHeadingMedium} >Create Business</Text>
        </HStack>
        </VStack>
        <Text style={styles.pageTitleMedium}>Additional Informations</Text>
      
        <ScrollView style={styles.scrollView_withToolBar} showsVerticalScrollIndicator={false}>
        <FormControl >
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>Landmark</FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined"  size="md"   >
          <InputField placeholder="Enter nearest landmark" value={formData.landmark} onChangeText={value => setData({ ...formData, landmark: value })}  ></InputField> 
          </Input>  
         
        </FormControl>
        <FormControl >
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>Street </FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined"  size="md"   >
          <InputField placeholder="Enter Street" value={formData.street} onChangeText={value => setData({ ...formData, street: value })}   ></InputField> 
          </Input> 
          
        </FormControl>
        <FormControl >
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>Area</FormControlLabelText>
          </FormControlLabel>
          
            <Input variant="underlined"  size="md"   >
          <InputField placeholder="Enter Area" value={formData.area} onChangeText={value => setData({ ...formData, area: value })}   ></InputField> 
          </Input> 
        </FormControl>
        <FormControl >
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>City</FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined"  size="md"   >
          <InputField placeholder="Enter City" value={formData.city} onChangeText={value => setData({ ...formData, city: value })} ></InputField> 
          </Input> 
           
        </FormControl>
        <FormControl >
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>Country</FormControlLabelText>
          </FormControlLabel>
          <Select onValueChange={value => setData({ ...formData, country: value })} >
            <SelectTrigger variant="underlined" >
              <SelectInput placeholder="Enter Country" value={formData.country} />
              <SelectIcon mr="$3">
                <Icon as={ChevronDownIcon} />
              </SelectIcon>
            </SelectTrigger>
            <SelectPortal >
              <SelectBackdrop />
              <SelectContent >
                <SelectDragIndicatorWrapper>
                  <SelectDragIndicator />
                </SelectDragIndicatorWrapper>
                <SelectItem label="Red" value="red"  />
                <SelectItem label="Blue" value="blue" />
                <SelectItem label="Black" value="black" />
                <SelectItem label="Pink" value="pink" isDisabled={true} />
                <SelectItem label="Green" value="green" />
              </SelectContent>
            </SelectPortal>
          </Select>
        </FormControl>

        <VStack mt={20} mb={50} alignItems="center" style={{ width: "100%" }}>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}

            style={styles.buttonLong}

            onPress={()=>setwizStage(wizardStageEnum.location)}

          >
            <ButtonText style={styles.buttonText}>Next</ButtonText>
            <ButtonIcon ml={"80%"} size={20} as={ArrowBigRightDash} />
          </Button>
        </VStack>
</ScrollView>
      </VStack>
    )
  }
  function BusinessDetails_W3() { 
    return (
      <VStack width="100%" mx="3"  style={styles.fieldSetContainer}>
         <VStack width="100%" mx="3" style={styles.pageHeader} >
        <HStack space="4xl">
        <Icon as={MoveLeft} size="lg"   onPress={()=>setwizStage(wizardStageEnum.advance)}/><Text style={styles.listHeadingMedium} >Create Business</Text>
        </HStack>
        </VStack> 
        <Text style={styles.pageTitleMedium}>Location</Text>
        <FormControl >
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>Landmark</FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined"  size="md"   >
          <InputField placeholder="Search Location" value={formData.landmark} onChangeText={value => setData({ ...formData, location: value })}  ></InputField> 
          </Input>  
         
        </FormControl>
        <VStack mt={20} mb={50} alignItems="center" style={{ width: "100%" }}>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}

            style={styles.buttonLong}

            onPress={()=>setwizStage(wizardStageEnum.files)}

          >
            <ButtonText style={styles.buttonText}>Next</ButtonText>
            <ButtonIcon ml={"80%"} size={20} as={ArrowBigRightDash} />
          </Button>
        </VStack>

      </VStack>
    )
  }
  function BusinessDetails_W4() { 
    return (
      <VStack width="100%" mx="3"  style={styles.fieldSetContainer}>
         <VStack width="100%" mx="3" style={styles.pageHeader} >
        <HStack space="4xl">
        <Icon as={MoveLeft} size="lg"    onPress={()=>setwizStage(wizardStageEnum.location)}/><Text style={styles.listHeadingMedium}>Create Business</Text>
        </HStack>
        </VStack> 
        <Text style={styles.pageTitleMedium}>Upload Photos</Text>
        <VStack mt={20} mb={50} alignItems="center" style={{ width: "100%" }}>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}

            style={styles.buttonLong}

            onPress={()=>createBusiness()}

          >
            <ButtonText style={styles.buttonText}>Finish</ButtonText>
            <ButtonIcon ml={"80%"} size={20} as={CheckCircle2} />
          </Button>
        </VStack>

      </VStack>
    )
  }

  function createBusiness (){
    
    //setwizStage(wizardStageEnum.basic);
      console.log("Business Created",formData)
      navigation.navigate('businessList');
  }
   
  function loadComponent() {  
     switch (wizardStage) {
      case wizardStageEnum.basic: {
        return BusinessDetails_W1();
      }
      case wizardStageEnum.advance: {
        return BusinessDetails_W2();
      }
      case wizardStageEnum.location: {
        return BusinessDetails_W3();
      }
      case wizardStageEnum.files: {
        return BusinessDetails_W4();
      }
      default: {
        return BusinessDetails_W1();
      }
    } 
  }
  return (
     
   
    <VStack width="100%" mx="3"   height="100%">
      {loadComponent()}
      </VStack>
     
    

  )
}
