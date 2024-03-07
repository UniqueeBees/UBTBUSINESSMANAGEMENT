import React, { useEffect } from "react"

import {
  VStack,
  FormControl,
  Input,
  InputField,
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
  Text, Box, Image,
  FlatList

} from "@gluestack-ui/themed"
import { ArrowRight } from 'lucide-react-native';
import { businessDTO } from "../../dto/businessDTO"
import { attachmentDTO } from "../../dto/attachmentDTO"
import { styles } from '../../assets/styles/theme'
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import { businessTypes, getCountries, createNewBusiness } from '../../slices/businessSlice'
import { ArrowBigRightDash, CheckCircle2, Camera, XCircle, FolderUp } from 'lucide-react-native';
import { MoveLeft } from 'lucide-react-native';
import PageHeader from "../pageHeader";

import { requestStatusDTO } from '../../dto/statusDTO'
import alertSlice, { showAlert } from '../../slices/alertSlice';
import ImageUploader from "../../common/imageUploader";

const wizardStageEnum = {
  basic: 1,
  advance: 2,
  location: 3,
  files: 4
}

export default function BusinessDetails(props) {
  const [formData, setData] = React.useState(businessDTO)
  const [wizardStage, setwizStage] = React.useState(wizardStageEnum.files)
  const navigation = useNavigation();
  const businessTypeList = useSelector((state) => state.business.businessTypes);
  const countries = useSelector((state) => state.business.countries);
  const dispatch = useDispatch()
  const token = useSelector((state) => state.login.token)
  const [errors, setErrors] = React.useState({});
  const [uploadImages, setUplodimages] = React.useState([])
  const businessState = useSelector((state) => state.business)
  const actionStatus = useSelector((state) => state.business.actionStatus)

  //React.useState([{ key: "img1", value: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" }]);
  useEffect(() => {
    if (businessTypeList.length === 0) {
      dispatch(businessTypes(token))
    }
    if (countries.length === 0) {
      dispatch(getCountries(token))
    }

  }, [businessTypes, countries])

  useEffect(() => {
   
    if (businessState.status !== requestStatusDTO.pending) {
      if (actionStatus === requestStatusDTO.failed) {

        const alert = { action: 'error', title: "Saving Failed", description: businessState.error }
        dispatch(showAlert(alert))
      } else if (actionStatus === requestStatusDTO.success) {
        const alert = { action: 'success', title: "Success", description: businessState.error }
        dispatch(showAlert(alert))
      }
    }
  }, [actionStatus])

  function getBusinessTypeKey(key) {
    let bType = businessTypeList.find(e => e.key == key);
    if (bType) {
      return bType.value;
    } else { return key; }
  }
  function getBusinessCountryKey(id) {
    let bType = countries.find(e => e.id == id);
    if (bType) {
      return bType.name;
    } else { return id; }
  }
  const isValid = (name) => {
    if (formData[name]) {
      return true;
    } else {
      return false;
    }

  }
  const validateForm = () => {
    let errors = {};

    if (!formData.type && wizardStage === wizardStageEnum.basic) {
      errors.type = 'Business type is required.';
    }

    if (!formData.name && wizardStage === wizardStageEnum.basic) {
      errors.name = 'Business name is required.';
    }
    if (!formData.country && wizardStage === wizardStageEnum.advance) {
      errors.country = 'Country is required.';
    }
    // Set the errors and update form validity 

    setErrors(errors);
    return Object.keys(errors).length === 0;

  };
 
 const handleUploadPhoto =(imageCollection)=>{
  setUplodimages(imageCollection);
 }
 /*const handleUploadPhoto =async (uri)=>{ 
    if (uri) { 
      let atchDTO = { ...attachmentDTO };
      atchDTO.id =getMaxIdForImages()
      atchDTO.business_id = -1;
      atchDTO.identifier = "landmark";
      atchDTO.file = uri; 
      var upImgs = [...uploadImages, atchDTO];
      setUplodimages(upImgs)
    } else {
      console.log('no Uri invalid');
    }

 }*/

  function BusinessDetails_W1() {

    return (
      <VStack width="100%" mx="3" height="100%" style={styles.fieldSetContainer}>
        <PageHeader goBack="businessList" heading="Create Business" showNotifi={false}></PageHeader>
        <Text style={styles.pageTitleMedium}>Basic Details</Text>
        <ScrollView style={styles.scrollView_withToolBar} showsVerticalScrollIndicator={false} >
          <FormControl isRequired isInvalid={!isValid("type")}>
            <FormControlLabel>
              <FormControlLabelText style={styles.fieldLabel}>Type</FormControlLabelText>
            </FormControlLabel>
            <Select onValueChange={value => setData({ ...formData, type: value })} >
              <SelectTrigger variant="underlined">
                <SelectInput placeholder="Select Business Type" value={getBusinessTypeKey(formData.type)} />
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
                  {businessTypeList.map((item) => {
                    return <SelectItem key={item.key} label={item.value} value={item.key} />
                  })}
                </SelectContent>
              </SelectPortal>
            </Select>
            <FormControlError>
              <FormControlErrorText>
                {errors.type}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl isRequired isInvalid={!isValid("name")}>
            <FormControlLabel >
              <FormControlLabelText style={styles.fieldLabel}>Name</FormControlLabelText>
            </FormControlLabel>
            <Input variant="underlined" size="md"   >
              <InputField placeholder="Enter Business Name" value={formData.name} onChangeText={value => setData({ ...formData, name: value })}></InputField>
            </Input>
            <FormControlError>
              <FormControlErrorText>
                {errors.name}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
          <FormControl >
            <FormControlLabel>
              <FormControlLabelText style={styles.fieldLabel}>Email Address</FormControlLabelText>
            </FormControlLabel>
            <Input variant="underlined" size="md"   >
              <InputField placeholder="Enter Email Address" value={formData.email} onChangeText={value => setData({ ...formData, email: value })}></InputField>
            </Input>

          </FormControl>
          <FormControl >
            <FormControlLabel>
              <FormControlLabelText style={styles.fieldLabel}>Phone Number </FormControlLabelText>
            </FormControlLabel>
            <Input variant="underlined" size="md"   >
              <InputField placeholder="Enter Phone Number" value={formData.phone} onChangeText={value => setData({ ...formData, phone: value })} ></InputField>
            </Input>

          </FormControl>
          <FormControl >
            <FormControlLabel>
              <FormControlLabelText style={styles.fieldLabel} >Website</FormControlLabelText>
            </FormControlLabel>

            <Input variant="underlined" size="md"   >
              <InputField placeholder="Enter Website URL" value={formData.website} onChangeText={value => setData({ ...formData, website: value })} ></InputField>
            </Input>
          </FormControl>
          <FormControl >
            <FormControlLabel>
              <FormControlLabelText style={styles.fieldLabel}>Tags</FormControlLabelText>
            </FormControlLabel>
            <Input variant="underlined" size="md"   >
              <InputField placeholder="Type Tags Comma Separated" value={formData.tags} onChangeText={value => setData({ ...formData, tags: value })}  ></InputField>
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
              onPress={() => validateForm() ? setwizStage(wizardStageEnum.advance) : ""}
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
      <VStack width="100%" mx="3" style={styles.fieldSetContainer}>
        <VStack width="100%" mx="3" style={styles.pageHeader} >
          <HStack space="4xl">
            <Icon as={MoveLeft} size="lg" onPress={() => setwizStage(wizardStageEnum.basic)} /><Text style={styles.listHeadingMedium} >Create Business</Text>
          </HStack>
        </VStack>
        <Text style={styles.pageTitleMedium}>Additional Informations</Text>

        <ScrollView style={styles.scrollView_withToolBar} showsVerticalScrollIndicator={false}>
          <FormControl >
            <FormControlLabel mb="$1">
              <FormControlLabelText style={styles.fieldLabel}>Landmark</FormControlLabelText>
            </FormControlLabel>
            <Input variant="underlined" size="md"   >
              <InputField placeholder="Enter nearest landmark" value={formData.landmark} onChangeText={value => setData({ ...formData, landmark: value })}  ></InputField>
            </Input>

          </FormControl>
          <FormControl >
            <FormControlLabel mb="$1">
              <FormControlLabelText style={styles.fieldLabel}>Street </FormControlLabelText>
            </FormControlLabel>
            <Input variant="underlined" size="md"   >
              <InputField placeholder="Enter Street" value={formData.street} onChangeText={value => setData({ ...formData, street: value })}   ></InputField>
            </Input>

          </FormControl>
          <FormControl >
            <FormControlLabel mb="$1">
              <FormControlLabelText style={styles.fieldLabel}>Area</FormControlLabelText>
            </FormControlLabel>

            <Input variant="underlined" size="md"   >
              <InputField placeholder="Enter Area" value={formData.area} onChangeText={value => setData({ ...formData, area: value })}   ></InputField>
            </Input>
          </FormControl>
          <FormControl >
            <FormControlLabel mb="$1">
              <FormControlLabelText style={styles.fieldLabel}>City</FormControlLabelText>
            </FormControlLabel>
            <Input variant="underlined" size="md"   >
              <InputField placeholder="Enter City" value={formData.city} onChangeText={value => setData({ ...formData, city: value })} ></InputField>
            </Input>

          </FormControl>
          <FormControl isRequired isInvalid={!isValid("country")}>
            <FormControlLabel mb="$1">
              <FormControlLabelText style={styles.fieldLabel}>Country</FormControlLabelText>
            </FormControlLabel>
            <Select onValueChange={value => setData({ ...formData, country: value })} >
              <SelectTrigger variant="underlined" >
                <SelectInput placeholder="Enter Country" value={getBusinessCountryKey(formData.country)} />
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
                  {countries.map((country) => { return <SelectItem label={`${country.code}-${country.name}`} value={country.name} /> })}
                </SelectContent>
              </SelectPortal>
            </Select>
            <FormControlError>
              <FormControlErrorText>
                {errors.country}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>

          <VStack mt={20} mb={50} alignItems="center" style={{ width: "100%" }}>
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}

              style={styles.buttonLong}

              onPress={() => validateForm() ? setwizStage(wizardStageEnum.location) : ""}

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
      <VStack width="100%" mx="3" style={styles.fieldSetContainer}>
        <VStack width="100%" mx="3" style={styles.pageHeader} >
          <HStack space="4xl">
            <Icon as={MoveLeft} size="lg" onPress={() => setwizStage(wizardStageEnum.advance)} /><Text style={styles.listHeadingMedium} >Create Business</Text>
          </HStack>
        </VStack>
        <Text style={styles.pageTitleMedium}>Location</Text>
        <FormControl >
          <FormControlLabel mb="$1">
            <FormControlLabelText style={styles.fieldLabel}>Landmark</FormControlLabelText>
          </FormControlLabel>
          <Input variant="underlined" size="md"   >
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

            onPress={() => setwizStage(wizardStageEnum.files)}

          >
            <ButtonText style={styles.buttonText}>Next</ButtonText>
            <ButtonIcon ml={"80%"} size={20} as={ArrowBigRightDash} />
          </Button>
        </VStack>

      </VStack>
    )
  }
  /*const removeImage=(id)=>{
    
    var uImages=uploadImages.filter(img=>img.id!==id)
    setUplodimages(uImages);
  }
   const uploadImgRender = (img) => {
    return (
      <Box style={{marginLeft:"5%"}}>
        <Icon fill="#E5E7E9" onPress={()=>removeImage(img.item.id)} style={{ alignSelf: "flex-end", position: "relative",top:12,marginRight:-12,zIndex:3000 }} as={XCircle} size="xl"></Icon>
        <Image borderRadius="$md" size="xl" source={{ uri: img.item.file }}></Image>
      </Box>
    )
  }*/
  function BusinessDetails_W4() {

    return (
      <VStack width="100%" mx="3" style={styles.fieldSetContainer}>
        <VStack width="100%" mx="3" style={styles.pageHeader} >
          <HStack space="4xl">
            <Icon as={MoveLeft} size="lg" onPress={() => setwizStage(wizardStageEnum.location)} /><Text style={styles.listHeadingMedium}>Create Business</Text>
          </HStack>
        </VStack>
        <Text style={styles.pageTitleMedium}>Upload Photos</Text>
        <ImageUploader setBackData={ handleUploadPhoto } multiple={true}></ImageUploader>
        <VStack mt={20} mb={50} alignItems="center" style={{ width: "100%" }}>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}

            style={styles.buttonLong}

            onPress={() => createBusiness()}

          >
            <ButtonText style={styles.buttonText}>Finish</ButtonText>
            <ButtonIcon ml={"80%"} size={20} as={CheckCircle2} />
          </Button>
        </VStack>

      </VStack>
    )
  }

  function createBusiness() {
    let businessData = { token: token, formData: formData, uploadImages: uploadImages }
    dispatch(createNewBusiness(businessData))

    console.log("Business Created", formData)
    //navigation.navigate('businessList');
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


    <VStack width="100%" mx="3" height="100%">
      {loadComponent()}
    </VStack>



  )
}
