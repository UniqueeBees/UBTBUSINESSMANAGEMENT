import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    VStack,
    FormControl,
    Input,
    InputField,
    InputSlot,
    InputIcon,
    Textarea,
    TextareaInput,
    Center,
    Button,
    ButtonText,
    ButtonIcon,
    FormControlLabel,
    FormControlLabelText,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
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
    Heading,
    Icon,
    HStack,
    ArrowLeftIcon,
    ScrollView,
    Box,

} from "@gluestack-ui/themed";
import { ArrowRight, ChevronRight, ChevronDownIcon } from 'lucide-react-native';
import { styles } from '../../assets/styles/theme';
import { View, Text } from 'react-native';
import DateTimePicker, { DateDisplayFormat } from '../../common/datetimepicker'
import { useNavigation } from "@react-navigation/native";
import { getContactList, getContactById } from '../../slices/userSlice';
import { addUpdateMeeting, resetSaveRequestStatus } from '../../slices/meetingSlice';
import { showLoading } from "../../slices/loadingSlice";
import { showAlert } from '../../slices/alertSlice';
import { requestStatusDTO } from '../../dto/statusDTO';
import ContactList from '../contacts/contactList';
import { getCurrentDateFormated } from '../../common/datetimepicker';
import { ArrowBigRightDash, MoveLeft } from 'lucide-react-native';
import BusinessSelect from '../formBusinessList/businessSelect';
import { resetBusinessName, setBusinessSelectFromForm, getBusinessById } from '../../slices/businessSlice';

function MeetingSetup(props) {
    const dispatch = useDispatch();
    const hasUser = useSelector((state) => state.user.hasUser)
    const meetingLanguageDTO = useSelector((state) => state.language.meetingLanguageDTO)
    const commonLanguageDTO = useSelector((state) => state.language.commonLanguageDTO)
    const meetingSetup = useSelector((state) => state.meeting.meetingSetup)
    const navigation = useNavigation();
    const contactList = useSelector((state) => state.user.contactList);
    const token = useSelector((state) => state.login.token)
    const id = useSelector((state) => state.login.id)
    const saveRequestStatus = useSelector((state) => state.meeting.saveRequestStatus)
    const [formData, setData] = useState(meetingSetup);
    const [showContactList, setContactList] = useState(false);
    const [contactName, setContactName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [startMeeting, setStartMeeting] = useState(true);
    const purposeList = useSelector((state) => state.meeting.purposeList);
    const meetingDateFormat = "YYYY-MM-DD HH:MM";
    const requiredFieldList = useSelector((state) => state.meeting.requiredFieldList);
    const [requiredFieldSettings, setRequiredFieldSettings] = useState(requiredFieldList);
    const contact = useSelector(state => getContactById(state, meetingSetup.contactId));
    const business = useSelector(state => getBusinessById(state, meetingSetup.businessId));
    useEffect(() => {
        if (contactList.list.length === 0 && token) {
            dispatch(getContactList(token));
        }
    }, [token])
    useEffect(() => {
        if (meetingSetup.contactId) {
            const contact = contactList.list.find(contact => contact.id === meetingSetup.contactId)
            if (contact) {
                setContactName(contact.name)
            }
        }
    }, [contactList.list.length])
    useEffect(() => {
        if (meetingSetup.id) {
            if (contact) {
                setContactName(contact.name)
            }
            if (business) {
                dispatch(setBusinessSelectFromForm({ business: business }))
            }
            else {
                dispatch(setBusinessSelectFromForm({ business: { id: meetingSetup.businessId, name: '' } }))
            }
        }
        else {
            setContactName('')
        }
    }, [meetingSetup.id])
    useEffect(() => {
        if (saveRequestStatus === requestStatusDTO.fulfilled) {
            setData(meetingSetup);
            setRequiredFieldSettings(requiredFieldList);
            setContactName('')
            navigation.navigate('dashboard', { screen: 'dashboardLayout' })
            dispatch(resetSaveRequestStatus());
            //dispatch(resetBusinessName());
            dispatch(showLoading(false))
            const alert = { action: 'success', title: commonLanguageDTO.success, description: commonLanguageDTO.saveSuccessMessage }
            dispatch(showAlert(alert))
        }
        else if (saveRequestStatus === requestStatusDTO.pending) {
            dispatch(showLoading(true))
        }
        else if (saveRequestStatus === requestStatusDTO.rejected) {
            //error
            dispatch(resetSaveRequestStatus());
            dispatch(showLoading(false))
            const alert = { action: 'error', title: commonLanguageDTO.error, description: commonLanguageDTO.saveErrorMessage }
            dispatch(showAlert(alert))
        }
    }, [saveRequestStatus])
    const changeFormData = (fieldName, value) => {
        let formValues = { ...formData }
        formValues[fieldName] = value;
        console.log('changeFormData', formValues, fieldName)
        setData(formValues);
        const reqFields = requiredFieldSettings.map((item) => {
            let reqItem = { ...item }
            if (reqItem.field === fieldName) {
                reqItem.isTouched = true;
                reqItem.isValid = value ? true : false;
            }
            return reqItem;
        })
        setRequiredFieldSettings(reqFields)
    }
    const changeBusiness = (fieldName, item) => {

        changeFormData(fieldName, item.id)
        setBusinessName(item.name)
    }
    const validateRequiredFieldOnSave = () => {
        let isValid = true;
        const reqFields = requiredFieldSettings.map((item) => {
            let reqItem = { ...item }
            if (!formData[item.field]) {
                reqItem.isValid = false;
                isValid = false;
            }
            reqItem.isTouched = true;
            return reqItem;
        })
        setRequiredFieldSettings(reqFields)
        return isValid;
    }
    const isFieldStateInValid = (fieldName) => {
        const isInValid = requiredFieldSettings.find(reqField => reqField.field === fieldName && reqField.isTouched && !reqField.isValid);
        return (isInValid ? true : false);
    }
    const submit = () => {
        if (startMeeting) {
            var meetingDate = getCurrentDateFormated(meetingDateFormat)
            formData.scheduledAt = meetingDate;
        }
        if (validateRequiredFieldOnSave()) {
            formData.id = meetingSetup.id;
            dispatch(addUpdateMeeting({ token: token, meetingData: formData }))
        }
        else {
            const alert = { action: 'error', title: commonLanguageDTO.error, description: commonLanguageDTO.saveValidationMessage }
            dispatch(showAlert(alert))
        }

    }
    const setDateValue = (value, fieldName) => {

        changeFormData(fieldName, value)
    }
    const handleContactSelect = (show) => {
        setContactList(show);
    }
    const onContactSelect = (item) => {
        setContactList(false);
        changeFormData('contactId', item.id)
        setContactName(item.name)
    }


    const getPurposeName = (id) => {
        let purpose = purposeList.find(e => e.id == id);
        if (purpose) {
            return purpose.name;
        }
        else { return id; }
    }

    const setBusinessControlSettings = (fieldName) => {
        let businessControlSettings = {};
        businessControlSettings.isRequired = requiredFieldSettings.some(reqField => reqField.field === fieldName);
        if (businessControlSettings.isRequired) {
            businessControlSettings.isInvalid = requiredFieldSettings.some(reqField => reqField.field === fieldName && reqField.isTouched && !reqField.isValid);
        }
        businessControlSettings.fieldName = fieldName;
        return businessControlSettings;
    }

    return (
        <VStack style={styles.fieldSetContainer}>
            <VStack   >
                <HStack space="4xl" height="$20" alignItems='center'><Icon as={MoveLeft} size="xl" onPress={() => { showContactList ? setContactList(false) : navigation.goBack() }} />
                    <Text style={styles.listHeadingMedium}>
                        {showContactList ? meetingLanguageDTO.contactListTitle : meetingLanguageDTO.createMeeting}
                    </Text>
                </HStack>

            </VStack>
            {showContactList ?
                <ContactList selectItem={onContactSelect} contactItemList={contactList.list} languageDTO={meetingLanguageDTO} /> :
                <ScrollView style={styles.scrollView_withToolBar} showsVerticalScrollIndicator={false}>
                    <BusinessSelect businessName={businessName} controlSettings={setBusinessControlSettings('businessId')} setDatasource={changeBusiness} />
                    <FormControl isRequired isInvalid={isFieldStateInValid('purposeId')}>
                        <FormControlLabel mb="$1">
                            <FormControlLabelText style={styles.fieldLabel}>{meetingLanguageDTO.purpose}</FormControlLabelText>
                        </FormControlLabel>
                        <Select onValueChange={value => changeFormData('purposeId', value)} >
                            <SelectTrigger variant="underlined">
                                <SelectInput placeholder={meetingLanguageDTO.purposePlaceholder} value={getPurposeName(formData.purposeId)} />
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
                                        return <SelectItem key={item.id} label={item.name} value={item.id} />
                                    })}
                                </SelectContent>
                            </SelectPortal>
                        </Select>
                        <FormControlError>
                            <FormControlErrorText>
                                {meetingLanguageDTO.purposeValidationMessage}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>
                    <FormControl isRequired isInvalid={isFieldStateInValid('contactId')}>
                        <FormControlLabel mb="$1">
                            <FormControlLabelText style={styles.fieldLabel}>{meetingLanguageDTO.contact}</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="underlined" size="md"    >
                            <InputField placeholder={meetingLanguageDTO.contactPlaceholder} value={contactName}
                                editable={false}>
                            </InputField>
                            <InputSlot pr='$3' onPress={() => handleContactSelect(true)}>
                                <InputIcon as={ChevronRight} size="lg" />
                            </InputSlot>
                        </Input>
                        <FormControlError>
                            <FormControlErrorText>
                                {meetingLanguageDTO.contactValidationMessage}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>
                    <FormControl isRequired isInvalid={isFieldStateInValid('title')}>
                        <FormControlLabel mb="$1">
                            <FormControlLabelText style={styles.fieldLabel}>{meetingLanguageDTO.title}</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="underlined" size="md"   >
                            <InputField placeholder={meetingLanguageDTO.titlePlaceholder} value={formData.title}
                                onChangeText={value => changeFormData('title', value)}>
                            </InputField>
                        </Input>
                        <FormControlError>
                            <FormControlErrorText>
                                {meetingLanguageDTO.titleValidationMessage}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl><FormControl >
                        <FormControlLabel mb="$1">
                            <FormControlLabelText style={styles.fieldLabel}>{meetingLanguageDTO.description}</FormControlLabelText>
                        </FormControlLabel>
                        <Textarea variant="underlined" size="md"   >
                            <TextareaInput placeholder={meetingLanguageDTO.descriptionPlaceholder} value={formData.description}
                                onChangeText={value => changeFormData('description', value)}>
                            </TextareaInput>
                        </Textarea>
                    </FormControl>
                    {!startMeeting && <DateTimePicker
                        label={meetingLanguageDTO.meetingDateAndTime}
                        fieldName='scheduledAt'
                        isRequired
                        isInvalid={isFieldStateInValid('scheduledAt')}
                        mode={'datetime'}
                        placeholder={meetingLanguageDTO.meetingDateAndTimePlaceholder}
                        errorMessage={meetingLanguageDTO.meetingDateAndTimeValidationMessage}
                        setValue={setDateValue}
                        variant="underlined"
                        displayFormat={DateDisplayFormat.meetingFormat}
                        dataSourceFormat={meetingDateFormat}
                        value={formData.scheduledAt} />
                    }
                    <VStack mt={20} mb={100} alignItems="center" style={{ width: "100%" }}>
                        {startMeeting && <Button
                            size="md"
                            variant="link"
                            action="primary"
                            isFocusVisible={false}
                            onPress={() => setStartMeeting(false)}
                        >
                            <ButtonText >{meetingLanguageDTO.scheuleMeeting}</ButtonText>
                        </Button>}
                        <Button
                            size="md"
                            variant="solid"
                            action="primary"
                            isDisabled={false}
                            isFocusVisible={false}
                            style={styles.buttonLong}
                            onPress={() => submit()}
                        >
                            <ButtonText style={styles.buttonText}>{startMeeting ? meetingLanguageDTO.startMeeting : meetingLanguageDTO.scheuleMeeting}</ButtonText>
                            <ButtonIcon ml={startMeeting ? "60%" : "50%"} size={20} as={ArrowBigRightDash} />
                        </Button>

                    </VStack>
                </ScrollView>
            }
        </VStack>
    );
}
export default MeetingSetup;