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
    Heading,
    Icon,
    HStack, 
    ArrowLeftIcon,
    ScrollView,
    Box,

} from "@gluestack-ui/themed";
import { ArrowRight, ChevronRight } from 'lucide-react-native';
import { styles } from '../../assets/styles/theme';
import { View, Text } from 'react-native';
import DateTimePicker,{DateDisplayFormat} from '../../common/datetimepicker'
import { useNavigation } from "@react-navigation/native";
import { getUserList } from '../../slices/userSlice';
import { addNewTask,resetSaveRequestStatus } from '../../slices/taskSlice';
import { showLoading } from "../../slices/loadingSlice";
import { showAlert } from '../../slices/alertSlice';
import { requestStatusDTO } from '../../dto/statusDTO';
import UserList from './userList';
import { ArrowBigRightDash ,MoveLeft} from 'lucide-react-native';
function TaskSetup() {
    const dispatch = useDispatch();
    const hasUser = useSelector((state) => state.user.hasUser)
    const taskLanguageDTO = useSelector((state) => state.language.taskLanguageDTO)
    const commonLanguageDTO = useSelector((state) => state.language.commonLanguageDTO)
    const taskSetup = useSelector((state) => state.task.taskSetup)
    const navigation = useNavigation();
    const userList = useSelector((state) => state.user.userList);
    const token = useSelector((state) => state.login.token)
    const id = useSelector((state) => state.login.id)
    const saveRequestStatus = useSelector((state) => state.task.saveRequestStatus)
    const [formData, setData] = useState(taskSetup);
    const [showUserList, setUserList] = useState(false);
    const [executiveName, setExecutiveName] = useState('');
    
    const requiredFieldList = useSelector((state) => state.task.requiredFieldList);
    const [requiredFieldSettings, setRequiredFieldSettings] = useState(requiredFieldList);
    useEffect(() => {
        if (userList.list.length === 0 && token) {
            dispatch(getUserList(token));
        }
    }, [token])
    useEffect(() => {
        if (saveRequestStatus === requestStatusDTO.fulfilled) {
            setData(taskSetup);
            setRequiredFieldSettings(requiredFieldList);
            setExecutiveName('')
            navigation.navigate('dashboard',{screen:'dashboardLayout'})
            dispatch(resetSaveRequestStatus());
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
        setData(formValues);
        const reqFields = requiredFieldSettings.map((item) => {
            let reqItem={...item}
            if (reqItem.field === fieldName) {
                reqItem.isTouched = true;
                reqItem.isValid = value ? true : false;
            }
            return reqItem;
        })
        setRequiredFieldSettings(reqFields)
    }
    const validateRequiredFieldOnSave=()=>{
        let isValid=true;
        const reqFields = requiredFieldSettings.map((item) => {
            let reqItem={...item}
            if (!formData[item.field]) {
                reqItem.isValid = false;
                isValid=false;
            }
            reqItem.isTouched = true;
            return reqItem;
        })
        setRequiredFieldSettings(reqFields)
        return isValid;
    }
    const isFieldStateInValid=(fieldName)=>{
       const isInValid= requiredFieldSettings.find(reqField => reqField.field === fieldName && reqField.isTouched && !reqField.isValid);
       return (isInValid ?  true: false);
    }
    const submit = () => {
        if(validateRequiredFieldOnSave()){
        dispatch(addNewTask({token:token, taskData:formData}))
        }
        else{
            const alert = { action: 'error', title: commonLanguageDTO.error, description: commonLanguageDTO.saveValidationMessage }
            dispatch(showAlert(alert)) 
        }
    }
    const setDateValue = (value, fieldName) => {
        changeFormData(fieldName,value)
    }
    const handleExecutiveSelect = (show) => {
        setUserList(show);
    }
    const selectExecutive = (item) => {
        setUserList(false);
        changeFormData('assignTo',item.id)
        setExecutiveName(item.name)
    }
    return (
        <VStack width="100%" mx="3" height="100%" style={styles.fieldSetContainer}>
            <VStack width="100%" mx="3" style={styles.pageHeader} >
               
                <HStack space="4xl" height="$20" alignItems='center'><Icon as={MoveLeft} size="xl"  onPress={() => { showUserList ? showUserList(false) : navigation.goBack() }} />
                    <Heading style={styles.pageTitle1}>
                    {showUserList ? taskLanguageDTO.executiveListTitle : taskLanguageDTO.createTask}
                    </Heading>
                </HStack>


            </VStack>


            {showUserList ? <UserList selectItem={selectExecutive} userItemList={userList.list} /> :
                <ScrollView style={styles.scrollView_withToolBar} >
                   {1>2 && <FormControl >
                        <FormControlLabel mb="$1">
                            <FormControlLabelText style={styles.fieldLabel}>{taskLanguageDTO.business}</FormControlLabelText>
                        </FormControlLabel>
                        <Text variant="underlined" size="md"   >
                            {'Test business'}
                        </Text>
                    </FormControl>}
                    <FormControl isRequired isInvalid={isFieldStateInValid('assignTo')}>
                        <FormControlLabel mb="$1">
                            <FormControlLabelText style={styles.fieldLabel}>{taskLanguageDTO.assignTo}</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="underlined" size="md"    >
                            <InputField placeholder={taskLanguageDTO.assignToPlaceholder} value={executiveName}
                                editable={false}>
                            </InputField>
                            <InputSlot pr='$3' onPress={() => handleExecutiveSelect(true)}>
                                <InputIcon as={ChevronRight} size="lg" />
                            </InputSlot>
                        </Input>
                        <FormControlError>
                            <FormControlErrorText>
                                {taskLanguageDTO.assignToValidationMessage}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>
                    <FormControl isRequired isInvalid={isFieldStateInValid('title')}>
                        <FormControlLabel mb="$1">
                            <FormControlLabelText style={styles.fieldLabel}>{taskLanguageDTO.title}</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="underlined" size="md"   >
                            <InputField placeholder={taskLanguageDTO.titlePlaceholder} value={formData.title}
                                onChangeText={value => changeFormData('title', value )}>
                            </InputField>
                        </Input>
                        <FormControlError>
                            <FormControlErrorText>
                                {taskLanguageDTO.titleValidationMessage}
                            </FormControlErrorText>
                        </FormControlError>
                    </FormControl>


                    <DateTimePicker
                        label={taskLanguageDTO.dueDate}
                        fieldName='dueDate'
                        placeholder={taskLanguageDTO.dueDatePlaceholder}
                        setValue={setDateValue}
                        variant="underlined"
                        displayFormat={DateDisplayFormat.shortDate}
                        dataSourceFormat={"YYYY-MM-DD"}
                        value={formData.dueDate} />

                    <FormControl >
                        <FormControlLabel mb="$1">
                            <FormControlLabelText style={styles.fieldLabel}>{taskLanguageDTO.description}</FormControlLabelText>
                        </FormControlLabel>
                        <Textarea variant="underlined" size="md"   >
                            <TextareaInput placeholder={taskLanguageDTO.descriptionPlaceholder} value={formData.description}
                                onChangeText={value => changeFormData('description', value)}>
                            </TextareaInput>
                        </Textarea>
                    </FormControl>

                    <VStack mt={20} mb={50} ml={30} style={{ width: 300 }}>
                        <Button
                            size="md"
                            variant="solid"
                            action="primary"
                            isDisabled={false}
                            isFocusVisible={false}
                            style={styles.buttonLong}
                            onPress={() => submit()}
                        >
                            <ButtonText >{taskLanguageDTO.submit}</ButtonText>
                            <ButtonIcon ml={"80%"} size={20} as={ArrowBigRightDash} />
                        </Button>
                    </VStack>
                </ScrollView>
            }

        </VStack>

    );
}
export default TaskSetup;