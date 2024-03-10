import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { styles } from '../../assets/styles/theme';
import { useNavigation } from '@react-navigation/native';
import { SmilePlus } from 'lucide-react-native';
import Header from '../../common/header';
import PageHeader from '../pageHeader';
import ImageUploader from "../../common/imageUploader";
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
    View,
    ScrollView,
    Text, Box, Image,


} from "@gluestack-ui/themed"
import travelDTO from '../../dto/travelDTO'
import { ArrowBigRightDash, CheckCircle2, Camera, XCircle, FolderUp } from 'lucide-react-native';
import { sentNotification } from '../../notification/appNotification'
import { getPurposeList } from '../../slices/travelSlice'


export default function StartTravel() {
    const navigation = useNavigation();
    const [formData, setFormdata] = React.useState({ ...travelDTO })
    const [errors, setErrors] = React.useState({});
    //const purposeList =[{key:"purpose1",value:"purpose1"},{key:"purpose2",value:"purpose2"},{key:"purpose3",value:"purpose3"}]
    const vehicleList = [{ key: "vh1", value: "vehicle1" }, { key: "vh2", value: "vehicle2" }, { key: "vh3", value: "vehivle3" }]

    const token = useSelector((state) => state.login.token)
    const purposeList = useSelector((state) => state.travel.purposeList)
    console.log("purposelist", purposeList);
    const dispatch = useDispatch();
    useEffect(() => {
        if (purposeList.length <= 0) {
            console.log("purposelist dispatch", purposeList);
            dispatch(getPurposeList(token))
        }
    }, [])
    function setStartTravel() {
        if(validateForm()){
        sentNotification("Travel Started");
        } 
    }
    function validateForm() {
        let errors = {};
        if (!formData.purpose) {
            errors.purpose = 'Purpose is required.';
        }
        if (!formData.vehicle) {
            errors.vehicle = 'Vehicle is required.';
        }
        if (!formData.meterReading ) {
            errors.meterReading = 'Meter Reading is required.';
        }
        // Set the errors and update form validity 
        setErrors(errors);
        return Object.keys(errors).length === 0;
    }
    function getPurposeTypeKey(key) {
        let bType = purposeList.find(e => e.key == key);
        if (bType) {
            return bType.value;
        } else { return key; }
    }
    function getVehicleTypeKey(key) {
        let bType = vehicleList.find(e => e.key == key);
        if (bType) {
            return bType.value;
        } else { return key; }
    }
    function isValid(fieldName) {
        if (formData[fieldName]) {
            return true;
        } else {
            return false;
        }
    }
    console.log("formData", formData);
    return (

        <View height="100%" >
            <Center>
                <VStack width="100%" mx="3" height="100%" style={styles.fieldSetContainer}>
                    <PageHeader goBack="feeds" heading="Start Travel" showNotifi={false}></PageHeader>
                    <ScrollView style={styles.scrollView_withToolBar} showsVerticalScrollIndicator={false} >
                        <FormControl isRequired isInvalid={!isValid("purpose")}>
                            <FormControlLabel>
                                <FormControlLabelText style={styles.fieldLabel}>Purpose</FormControlLabelText>
                            </FormControlLabel>
                            <Select onValueChange={value => setFormdata({ ...formData, purpose: value })} >
                                <SelectTrigger variant="underlined">
                                    <SelectInput placeholder="Select Purpose" value={getPurposeTypeKey(formData.purpose)} />
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
                                        {purposeList.map((item) => {
                                            return <SelectItem key={item.id} label={item.name} value={item.name} />
                                        })}
                                    </SelectContent>
                                </SelectPortal>
                            </Select>
                            <FormControlError>
                                <FormControlErrorText>
                                    {errors.purpose}
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>

                        <FormControl isRequired isInvalid={!isValid("vehicle")}>
                            <FormControlLabel>
                                <FormControlLabelText style={styles.fieldLabel}>Vehicle</FormControlLabelText>
                            </FormControlLabel>
                            <Select onValueChange={value => setFormdata({ ...formData, vehicle: value })} >
                                <SelectTrigger variant="underlined">
                                    <SelectInput placeholder="Select Purpose" value={getVehicleTypeKey(formData.vehicle)} />
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
                                        {vehicleList.map((item) => {
                                            return <SelectItem key={item.key} label={item.value} value={item.key} />
                                        })}
                                    </SelectContent>
                                </SelectPortal>
                            </Select>
                            <FormControlError>
                                <FormControlErrorText>
                                    {errors.vehicle}
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>

                        <FormControl isRequired isInvalid={!isValid("meterreading")}>
                            <FormControlLabel >
                                <FormControlLabelText style={styles.fieldLabel}>Meter Reading</FormControlLabelText>
                            </FormControlLabel>
                            <Input variant="underlined" size="md"   >
                                <InputField placeholder="Start Vehicle Meter Reading" value={formData.name} onChangeText={value => setFormdata({ ...formData, meterReading: value })}></InputField>
                            </Input>
                            <FormControlError>
                                <FormControlErrorText>
                                    {errors.meterReading}
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>
                        <FormControl >
                            <FormControlLabel>
                                <FormControlLabelText style={styles.fieldLabel}>Title</FormControlLabelText>
                            </FormControlLabel>
                            <Input variant="underlined" size="md"   >
                                <InputField placeholder="Enter Travel Title" value={formData.email} onChangeText={value => setFormdata({ ...formData, title: value })}></InputField>
                            </Input>

                        </FormControl>
                        <FormControl >
                            <FormControlLabel>
                                <FormControlLabelText style={styles.fieldLabel}>Description </FormControlLabelText>
                            </FormControlLabel>
                            <Input variant="underlined" size="md"   >
                                <InputField placeholder="Enter Travel Description" value={formData.phone} onChangeText={value => setFormdata({ ...formData, description: value })} ></InputField>
                            </Input>

                        </FormControl>
                        <VStack mt="$6">
                            <ImageUploader multiple={false}></ImageUploader>
                        </VStack>

                        <VStack mt={20} mb={50} alignItems="center" style={{ width: "100%" }}>
                            <Button
                                size="md"
                                variant="solid"
                                action="primary"
                                isDisabled={false}
                                isFocusVisible={false}
                                style={styles.buttonLong}
                                onPress={() => validateForm() ? setStartTravel() : ""}
                            >
                                <ButtonText style={styles.buttonText}>Submit</ButtonText>
                                <ButtonIcon ml={"80%"} size={20} as={ArrowBigRightDash} />
                            </Button>
                        </VStack>
                    </ScrollView>
                </VStack>
            </Center>
        </View>
    )
};
