import React, { useState, useEffect } from 'react';
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent } from '@gluestack-ui/themed';
import { VStack, HStack, Box, Center, Icon, Text, Divider } from '@gluestack-ui/themed';
import { FormControl, FormControlLabel, FormControlLabelText, Input, InputField, InputSlot, InputIcon } from '@gluestack-ui/themed';
import { RadioGroup, Radio, RadioLabel, RadioIndicator, RadioIcon, CircleIcon } from '@gluestack-ui/themed';
import { Button, ButtonText } from '@gluestack-ui/themed';
import { MoveLeft, ChevronDown } from 'lucide-react-native';
import { KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import DateTimePicker, { DateDisplayFormat } from '../../common/datetimepicker'
import { styles } from '../../assets/styles/theme';
import UserList from './userList';
import { useSelector, useDispatch } from 'react-redux';

import { getUserList } from '../../slices/userSlice';
function TaskFilterSort(props) {
    const sortOptions = { RecentlyAdded: 1, TitleByAscending: 2, TitleByDescending: 3 }
    const filterDataDef = { executiveList: [], createDate: '', sortOption: sortOptions.RecentlyAdded }
    // const [selectedExecutiveList, setSelectedExecutiveList] = useState([]);
    const [filterData, setFilterData] = useState(filterDataDef);
    const userListInitial = useSelector((state) => state.user.userList);
    const [showUserList, setShowUserList] = useState(false);
    const [userList, setUserList] = useState(userListInitial);
    const dispatch = useDispatch();
    useEffect(() => {
        if (userListInitial.list.length === 0 && props.token) {
            dispatch(getUserList(props.token));
        }
    }, [props.token])

    useEffect(() => {
        setUserList(userListInitial)
    }, [userListInitial.list.length])

    const handleExecutiveSelect = () => {
        setShowUserList(!showUserList);
    }
    const setSortOptions = (value) => {
        setFilterData({ ...filterData, sortOption: value })
    }
    const setDateValue = (value, fieldName) => {
        setFilterData({ ...filterData, createDate: value })
    }
    const selectExecutive = (item) => {
        const index = filterData.executiveList.findIndex(executive => executive.id === item.id)
        if (index === -1) {
            setFilterData({ ...filterData, executiveList: [...filterData.executiveList, item] })
        }
        else {
            filterData.executiveList.splice(index, 1);
            setFilterData({ ...filterData, executiveList: [...filterData.executiveList] })
        }

    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <Actionsheet isOpen={props.show} >
                <ActionsheetBackdrop />
                <ActionsheetContent height={showUserList ? '100%': '82%'} >
                    {showUserList ? <VStack w="$full" >
                        <VStack width="100%" mx="3" style={styles.pageHeader} >

                            <HStack space="4xl" height="$20" alignItems='center'><Icon as={MoveLeft} size="xl" onPress={() => {
                                setShowUserList(false)

                            }} />
                                <Text style={[styles.pageTitle, { textAlign: "center" }]}>
                                    {props.taskLanguageDTO.executiveListTitle}
                                </Text>

                            </HStack>


                        </VStack>
                        <UserList source='Filter' selectedList={filterData.executiveList} selectItem={selectExecutive} userItemList={userList.list} languageDTO={props.taskLanguageDTO} />
                    </VStack>
                        :
                        <VStack w="$full" spacing="$3" p={10}>
                            <HStack w="$full" paddingBottom={20} >
                                <Box justifyContent='flex-start' width={'20%'}>
                                    <Icon as={MoveLeft} size="xl" onPress={() => {
                                        props.handleFilterOptions()

                                    }} />
                                </Box>
                                <Box width={'60%'}>
                                    <Center>
                                        <Text>{props.commonLanguageDTO.filterActionHeading}</Text>
                                    </Center>
                                </Box>
                                <Box justifyContent='flex-end' width={'20%'}>
                                    <Pressable onPress={() => {
                                        setFilterData(filterDataDef);
                                    }}>
                                        <Text>{props.commonLanguageDTO.clear}</Text>
                                    </Pressable>

                                </Box>
                            </HStack>
                            <Divider />

                            <Text>
                                {props.commonLanguageDTO.filterCaption}
                            </Text>
                            <FormControl>
                                <FormControlLabel mb="$1">
                                    <FormControlLabelText style={styles.fieldLabel}>{props.taskLanguageDTO.executive}</FormControlLabelText>
                                </FormControlLabel>
                                <Input variant="underlined" size="md"    >
                                    <InputField placeholder={props.taskLanguageDTO.assignToPlaceholder} value={filterData.executiveList.map(u => u.name).join(', ')}
                                        editable={false}>
                                    </InputField>
                                    <InputSlot pr='$3' onPress={() => handleExecutiveSelect(true)}>
                                        <InputIcon as={ChevronDown} size="lg" />
                                    </InputSlot>
                                </Input>
                            </FormControl>

                            <DateTimePicker
                                label={props.taskLanguageDTO.createDate}
                                fieldName='createDate'
                                placeholder={props.taskLanguageDTO.createDatePlaceholder}
                                setValue={setDateValue}
                                variant="underlined"
                                displayFormat={DateDisplayFormat.shortDate}
                                dataSourceFormat={"YYYY-MM-DD"}
                                value={filterData.createDate} />
                            <Box paddingTop={'$10'} width='$full'>
                                <Text>{props.commonLanguageDTO.sortCaption}</Text>
                                <RadioGroup paddingTop={'$10'} value={filterData.sortOption} onChange={setSortOptions}>
                                    <VStack space="lg" w="$full">
                                        <Radio value={sortOptions.RecentlyAdded} justifyContent="space-between">
                                            <RadioLabel>{props.commonLanguageDTO.sortRecent}</RadioLabel>
                                            <RadioIndicator>
                                                <RadioIcon as={CircleIcon} />
                                            </RadioIndicator>
                                        </Radio>
                                        <Radio value={sortOptions.TitleByAscending} justifyContent="space-between">
                                            <RadioLabel>{props.commonLanguageDTO.sortAscending}</RadioLabel>
                                            <RadioIndicator>
                                                <RadioIcon as={CircleIcon} />
                                            </RadioIndicator>
                                        </Radio>
                                        <Radio value={sortOptions.TitleByDescending} justifyContent="space-between">
                                            <RadioLabel>{props.commonLanguageDTO.sortDescending}</RadioLabel>
                                            <RadioIndicator>
                                                <RadioIcon as={CircleIcon} />
                                            </RadioIndicator>
                                        </Radio>
                                    </VStack>
                                </RadioGroup>
                            </Box>
                            <VStack mt={20} mb={50} alignItems="center" style={{ width: "100%" }}>
                                <Button
                                    size="md"
                                    variant="solid"
                                    action="primary"
                                    isDisabled={false}
                                    isFocusVisible={false}
                                    style={styles.buttonLong}
                                    onPress={() => {
                                        props.filterAction(filterData)
                                    }}
                                >
                                    <ButtonText >{props.commonLanguageDTO.apply}</ButtonText>
                                </Button>
                            </VStack>
                        </VStack>
                    }
                </ActionsheetContent>
            </Actionsheet>


        </KeyboardAvoidingView>
    );
}

export default TaskFilterSort;
