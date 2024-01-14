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
import { addNewTask } from '../../slices/taskSlice';
import { requestStatusDTO } from '../../dto/statusDTO';
import UserList from './userList';

function TaskSetup() {
    const dispatch = useDispatch();
    const hasUser = useSelector((state) => state.user.hasUser)
    const taskLanguageDTO = useSelector((state) => state.language.taskLanguageDTO)
    const taskSetup = useSelector((state) => state.task.taskSetup)
    const navigation = useNavigation();
    const userList = useSelector((state) => state.user.userList);
    const token = useSelector((state) => state.login.token)
    const id = useSelector((state) => state.login.id)
    const saveRequestStatus = useSelector((state) => state.task.saveRequestStatus)
    const [formData, setData] = useState(taskSetup);
    const [showUserList, setUserList] = useState(false);
    const [executiveName, setExecutiveName] = useState('');
    useEffect(() => {
        if (userList.list.length === 0 && token) {
            dispatch(getUserList(token));
        }
    }, [token])
    useEffect(() => {
        if (saveRequestStatus === requestStatusDTO.fulfilled) {
            navigation.navigate('taskListLayout') 
        }
    }, [saveRequestStatus])

    const submit = () => {
        dispatch(addNewTask({token:token, taskData:formData}))
    }
    const setDateValue = (value, fieldName) => {
        let formValues = { ...formData }
        formValues[fieldName] = value;
        setData(formValues);

    }
    const handleExecutiveSelect = (show) => {
        setUserList(show);
    }
    const selectExecutive = (item) => {
        setUserList(false);
        setData({ ...formData, assignTo: item.id })
        setExecutiveName(item.name)
    }
    return (
        <VStack width="100%" mx="3" height="100%" style={styles.fieldSetContainer}>
            <VStack width="100%" mx="3" style={styles.pageHeader} >
                <HStack space="4xl">
                    <Icon as={ArrowLeftIcon} size="lg" style={{ marginTop: 8 }} onPress={() => { showUserList ? setUserList(false) : navigation.goBack() }} />
                    <Heading style={styles.pageTitle}>
                        {showUserList ? taskLanguageDTO.executiveListTitle : taskLanguageDTO.createTask}
                    </Heading>
                </HStack>

            </VStack>


            {showUserList ? <UserList selectItem={selectExecutive} userItemList={userList.list} /> :
                <ScrollView style={styles.scrollView_withToolBar} >
                    <FormControl isRequired>
                        <FormControlLabel mb="$1">
                            <FormControlLabelText style={styles.fieldLabel}>{taskLanguageDTO.business}</FormControlLabelText>
                        </FormControlLabel>
                        <Text variant="underlined" size="md"   >
                            {'Test business'}
                        </Text>
                    </FormControl>
                    <FormControl isRequired>
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
                    <FormControl isRequired>
                        <FormControlLabel mb="$1">
                            <FormControlLabelText style={styles.fieldLabel}>{taskLanguageDTO.title}</FormControlLabelText>
                        </FormControlLabel>
                        <Input variant="underlined" size="md"   >
                            <InputField placeholder={taskLanguageDTO.titlePlaceholder} value={formData.title}
                                onChangeText={value => setData({ ...formData, title: value })}>
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
                                onChangeText={value => setData({ ...formData, description: value })}>
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
                            <ButtonIcon ml={"80%"} size={20} as={ArrowRight} />
                        </Button>
                    </VStack>
                </ScrollView>
            }

        </VStack>

    );
}
export default TaskSetup;