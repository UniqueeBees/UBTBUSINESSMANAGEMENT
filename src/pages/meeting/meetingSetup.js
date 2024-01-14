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
import { getContactList } from '../../slices/userSlice';
import { addNewMeeting,resetSaveRequestStatus } from '../../slices/meetingSlice';
import { requestStatusDTO } from '../../dto/statusDTO';
import ContactList from '../contacts/contactList';
import { getCurrentDateFormated } from '../../common/datetimepicker';
function MeetingSetup(props) {
    const dispatch = useDispatch();
    const hasUser = useSelector((state) => state.user.hasUser)
    const meetingLanguageDTO = useSelector((state) => state.language.meetingLanguageDTO)
    const meetingSetup = useSelector((state) => state.meeting.meetingSetup)
    const navigation = useNavigation();
    const contactList = useSelector((state) => state.user.contactList);
    const token = useSelector((state) => state.login.token)
    const id = useSelector((state) => state.login.id)
    const saveRequestStatus = useSelector((state) => state.meeting.saveRequestStatus)
    const [formData, setData] = useState(meetingSetup);
    const [showContactList, setContactList] = useState(false);
    const [contactName, setContactName] = useState('');
    const [startMeeting, setStartMeeting] = useState(true);
    const purposeList = useSelector((state) => state.meeting.purposeList);
    const meetingDateFormat="YYYY-MM-DD HH:MM";
    useEffect(() => {
        if (contactList.list.length === 0 && token) {
            dispatch(getContactList(token));
        }
    }, [token])
    useEffect(() => {
        if (saveRequestStatus === requestStatusDTO.fulfilled) {
            setData(meetingSetup);
            setContactName('')
            navigation.navigate('dashboard',{screen:'dashboardLayout'})
            dispatch(resetSaveRequestStatus());
            
        }
        else if (saveRequestStatus === requestStatusDTO.pending) {
            //show busy indicator
        }
        else if (saveRequestStatus === requestStatusDTO.rejected) {
            //error
            dispatch(resetSaveRequestStatus());
        }
    }, [saveRequestStatus])

    const submit = () => {
        if(startMeeting){
           var meetingDate= getCurrentDateFormated(meetingDateFormat)
           formData.scheduledAt=meetingDate;
        }
         dispatch(addNewMeeting({ token: token, meetingData: formData }))
    }
    const setDateValue = (value, fieldName) => {
        let formValues = { ...formData }
        formValues[fieldName] = value;
        setData(formValues);

    }
    const handleContactSelect = (show) => {
        setContactList(show);
    }
    const onContactSelect = (item) => {
        setContactList(false);
        setData({ ...formData, contactId: item.id })
        setContactName(item.name)
    }


    const getPurposeName = (id) => {
        let purpose = purposeList.find(e => e.id == id);
        if (purpose) {
            return purpose.name;
        }
        else { return id; }
    }



    return (
        <VStack width="100%" mx="3" height="100%" style={styles.fieldSetContainer}>
            <VStack width="100%" mx="3" style={styles.pageHeader} >
                <HStack space="4xl">
                    <Icon as={ArrowLeftIcon} size="lg" style={{ marginTop: 8 }} onPress={() => { showContactList ? setContactList(false) : navigation.goBack() }} />
                    <Heading style={styles.pageTitle}>
                        {showContactList ? meetingLanguageDTO.contactListTitle : meetingLanguageDTO.createMeeting}
                    </Heading>
                </HStack>

            </VStack>
            {showContactList ? <ContactList selectItem={onContactSelect} contactItemList={contactList.list} /> :
                <ScrollView style={styles.scrollView_withToolBar} >
                    <FormControl isRequired>
                        <FormControlLabel mb="$1">
                            <FormControlLabelText style={styles.fieldLabel}>{meetingLanguageDTO.purpose}</FormControlLabelText>
                        </FormControlLabel>
                        <Select onValueChange={value => setData({ ...formData, purposeId: value })} >
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
                    <FormControl isRequired>
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
                    <FormControl isRequired>
                        <FormControlLabel mb="$1">
                            <FormControlLabelText style={styles.fieldLabel}>{meetingLanguageDTO.title}</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="underlined" size="md"   >
                            <InputField placeholder={meetingLanguageDTO.titlePlaceholder} value={formData.title}
                                onChangeText={value => setData({ ...formData, title: value })}>
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
                                onChangeText={value => setData({ ...formData, description: value })}>
                            </TextareaInput>
                        </Textarea>
                    </FormControl>
                    {!startMeeting && <DateTimePicker
                        label={meetingLanguageDTO.meetingDateAndTime}
                        fieldName='scheduledAt'
                        mode={'datetime'}
                        placeholder={meetingLanguageDTO.meetingDateAndTimePlaceholder}
                        errorMessage={meetingLanguageDTO.meetingDateAndTimeValidationMessage}
                        setValue={setDateValue}
                        variant="underlined"
                        displayFormat={DateDisplayFormat.meetingFormat}
                        dataSourceFormat={meetingDateFormat}
                        value={formData.scheduledAt} />
                    }
                    <VStack mt={20} mb={50} ml={30} style={{ width: 300 }}>
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
                            <ButtonText >{startMeeting ? meetingLanguageDTO.startMeeting : meetingLanguageDTO.scheuleMeeting}</ButtonText>
                            <ButtonIcon ml={"80%"} size={20} as={ArrowRight} />
                        </Button>

                    </VStack>
                </ScrollView>
            }
        </VStack>
    );
}
export default MeetingSetup;