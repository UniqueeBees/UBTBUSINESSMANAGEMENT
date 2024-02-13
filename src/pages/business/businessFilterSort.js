import React, { useState, useEffect } from 'react';
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent } from '@gluestack-ui/themed';
import { VStack, HStack, Box, Center, Icon, Text, Divider } from '@gluestack-ui/themed';
import { FormControl, FormControlLabel, FormControlLabelText, Input, InputField, InputSlot, InputIcon } from '@gluestack-ui/themed';
import { RadioGroup, Radio, RadioLabel, RadioIndicator, RadioIcon, CircleIcon } from '@gluestack-ui/themed';
import { Button, ButtonText } from '@gluestack-ui/themed';
import { MoveLeft, ChevronDown } from 'lucide-react-native';
import { KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { styles } from '../../assets/styles/theme';
import GeneralList from '../../common/generalList/generalList';
import { useSelector, useDispatch } from 'react-redux';
import { getCityList } from '../../slices/businessSlice';
function BusinessFilterSort(props) {
    const sortOptions = { RecentlyAdded: 1, TitleByAscending: 2, TitleByDescending: 3 }
    const filterDataDef = { businessType: 0, city: '', country: '', sortOption: sortOptions.RecentlyAdded }
    const [filterData, setFilterData] = useState(filterDataDef);
    const cities = useSelector((state) => state.business.cities);
    const [showCityList, setShowCityList] = useState(false);
    const [cityList, setCityList] = useState(cities);
    const dispatch = useDispatch();
    useEffect(() => {
        if (cities.length === 0 && props.token) {
            dispatch(getCityList(props.token));
        }
    }, [props.token])

    useEffect(() => {
        setCityList(cities)
    }, [cities.length])

    const handleCitySelect = () => {
        setShowCityList(!showCityList);
    }
    const setSortOptions = (value) => {
        setFilterData({ ...filterData, sortOption: value })
    }
    const setFilterField = (value, fieldName, hideList) => {
        let modifiedFilter = { ...filterData }
        modifiedFilter[fieldName] = value
        setFilterData(modifiedFilter)
        if (hideList) {
            setShowCityList(false);
        }
    }
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <Actionsheet isOpen={props.show} >
                <ActionsheetBackdrop />
                <ActionsheetContent height={showCityList ? '100%' : '82%'} >
                    {showCityList ? <VStack w="$full" >
                        <VStack width="100%" mx="3" style={styles.pageHeader} >

                            <HStack space="4xl" height="$20" alignItems='center'><Icon as={MoveLeft} size="xl" onPress={() => {
                                setShowCityList(false)

                            }} />
                                <Text style={[styles.pageTitle, { textAlign: "center" }]}>
                                    {props.taskLanguageDTO.executiveListTitle}
                                </Text>

                            </HStack>


                        </VStack>
                        <GeneralList
                            selectItem={setFilterField}
                            list={cityList}
                            listSettings={{ searchField: 'name', displayField: 'name',valueField:'name',sourceFieldName:'city' }}
                            languageDTO={props.taskLanguageDTO} />
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
                                    <InputField placeholder={props.taskLanguageDTO.assignToPlaceholder}
                                        value={filterData.city}
                                        editable={false}>
                                    </InputField>
                                    <InputSlot pr='$3' onPress={() => handleCitySelect(true)}>
                                        <InputIcon as={ChevronDown} size="lg" />
                                    </InputSlot>
                                </Input>
                            </FormControl>


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

export default BusinessFilterSort;
