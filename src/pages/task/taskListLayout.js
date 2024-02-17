
import React, { useEffect, useState } from 'react';
import { Text, View,Keyboard } from 'react-native';
import { Button, ButtonText, Center, HStack, VStack, Input, InputField, InputIcon, InputSlot } from '@gluestack-ui/themed';
import TaskList from './taskList';
import { styles } from '../../assets/styles/theme';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../slices/initialPageSlice';
import { navigationRoutes } from '../../common/navigation';
import { selectMyTasks, getTaskStatusList, getTaskListByUser, resetTaskSetUp } from '../../slices/taskSlice';
import { SlidersHorizontal } from 'lucide-react-native';
import TaskFilterSort from './taskFilterSort';
import { sortObjectArray } from '../../common/utility';
function TaskListLayout(props) {
    const [isMyTask, setIsMyTask] = useState(true);
    const hasUser = useSelector((state) => state.user.hasUser)
    const taskLanguageDTO = useSelector((state) => state.language.taskLanguageDTO)
    const commonLanguageDTO = useSelector((state) => state.language.commonLanguageDTO)

    const taskStatusList = useSelector((state) => state.task.taskStatusList);
    const token = useSelector((state) => state.login.token)
    const id = useSelector((state) => state.login.id)
    const myTaskListItems = useSelector(state => selectMyTasks(state, id));
    const taskListItems = useSelector(state => state.task.listItems);
    const [myTaskList, setMyTaskList] = useState(myTaskListItems);
    const [allTaskList, setAllTaskList] = useState(taskListItems);
    const [search, setSearch] = useState('');
    const [showActionsheet, setShowActionsheet] = useState(false)
    const [filterOptions, setFilterOptions] = useState({});

    useEffect(() => {
        dispatch(getTaskStatusList(token))
        dispatch(getTaskListByUser({ token, id }))
    }, [token])
    useEffect(() => {
        setMyTaskList(myTaskListItems)
        setAllTaskList(taskListItems)
    }, [taskListItems.length, myTaskListItems.length])

    useEffect(() => {
        searchItems(search);
    }, [filterOptions])

    const dispatch = useDispatch();
    const onMeetingPress = () => {
        setIsMyTask(true);
    }
    const onTasksPress = () => {
        setIsMyTask(false);
    }
    const handleActionClose = () => setShowActionsheet(!showActionsheet)
    useEffect(() => {
        if (!hasUser) {
            dispatch(setPage(navigationRoutes.login))
        }
    })

    const applyFilterOnItem = (item, searchValue, searchSettings) => {

        const itemData = `${item.title.toUpperCase()}`;
        const searchData = searchValue.toUpperCase();
        const hasDate = searchSettings.hasDate;
        const hasExecutive = searchSettings.hasExecutive;
        const hasSearch = searchSettings.hasSearch;
        const filterCreatedDateStart = `${filterOptions.createDate} 00:00:00`
        const filterCreatedDateEnd = `${filterOptions.createDate} 24:00:00`

        if (hasSearch && hasDate && hasExecutive) {
            const ret = itemData.indexOf(searchData) >= 0 &&
                (item.createdDate >= filterCreatedDateStart && item.createdDate <= filterCreatedDateEnd)
                && filterOptions.executiveList.some(executive => executive.id === item.assignedTo)

            return ret;
        }
        else if (hasSearch && !hasDate && hasExecutive) {
            const ret = itemData.indexOf(searchData) >= 0
                && filterOptions.executiveList.some(executive => executive.id === item.assignedTo)

            return ret;
        }
        else if (hasSearch && hasDate && !hasExecutive) {
            const ret = itemData.indexOf(searchData) >= 0
                && (item.createdDate >= filterCreatedDateStart && item.createdDate <= filterCreatedDateEnd)
            return ret;
        }
        else if (!hasSearch && hasDate && hasExecutive) {
            const ret = (item.createdDate >= filterCreatedDateStart && item.createdDate <= filterCreatedDateEnd)
                && filterOptions.executiveList.some(executive => executive.id === item.assignedTo)
            return ret;
        }
        else if (hasSearch && !hasDate && !hasExecutive) {
            const ret = itemData.indexOf(searchData) >= 0
            return ret;
        }
        else if (!hasSearch && hasDate && !hasExecutive) {
            const ret = (item.createdDate >= filterCreatedDateStart && item.createdDate <= filterCreatedDateEnd)
            return ret;
        }
        else if (!hasSearch && !hasDate && hasExecutive) {
            const ret = filterOptions.executiveList.some(executive => executive.id === item.assignedTo)
            return ret;
        }
        return true;
    }
    function sortByDate(a, b) {
        if (a.createDate < b.createDate) {
            return 1;
        }
        if (a.createDate > b.createDate) {
            return -1;
        }
        return 0;
    }
    const searchItems = (searchValue, fromFilter) => {
        if (fromFilter) {
            searchValue = search
        }
        const hasDate = filterOptions.createDate ? true : false;
        const hasExecutive = (filterOptions.executiveList && filterOptions.executiveList.length > 0) ? true : false;
        const hasSearch = searchValue ? true : false;
        let newDataAllTaskList = (!hasSearch && !hasDate && !hasExecutive) ? taskListItems : taskListItems.filter(item => {
            return applyFilterOnItem(item, searchValue, { hasDate: hasDate, hasExecutive: hasExecutive, hasSearch: hasSearch })

        });

        let newDataMyTaskList = (!hasSearch && !hasDate && !hasExecutive) ? myTaskListItems : myTaskListItems.filter(item => {
            return applyFilterOnItem(item, searchValue, { hasDate: hasDate, hasExecutive: hasExecutive, hasSearch: hasSearch })

        });
        let sortedAllTask = []
        let sortedMyTask = []
        if (filterOptions.sortOption) {
            if (filterOptions.sortOption === 1) {
                sortedAllTask = [...newDataAllTaskList].sort(sortObjectArray('createDate', true))
                sortedMyTask = [...newDataMyTaskList].sort(sortObjectArray('createDate', true))
            }
            else if (filterOptions.sortOption === 2) {
                sortedAllTask = [...newDataAllTaskList].sort(sortObjectArray('title', false, (a) => a.toUpperCase()))
                sortedMyTask = [...newDataMyTaskList].sort(sortObjectArray('title', false, (a) => a.toUpperCase()))
            }
            else if (filterOptions.sortOption === 3) {
                sortedAllTask = [...newDataAllTaskList].sort(sortObjectArray('title', true, (a) => a.toUpperCase()))
                sortedMyTask = [...newDataMyTaskList].sort(sortObjectArray('title', true, (a) => a.toUpperCase()))
            }
        }
        else {
            sortedAllTask = [...newDataAllTaskList].sort(sortByDate);
            sortedMyTask = [...newDataMyTaskList].sort(sortByDate);

        }

        setAllTaskList(sortedAllTask);
        setMyTaskList(sortedMyTask);
        setSearch(searchValue);
        // flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
    };
    const resetTaskSetUpDTO = () => {
        dispatch(resetTaskSetUp());
    }
    const handleFilterOptions = (show) => {
        handleActionClose();
    }
    const filterAction = (filterOptions) => {
        setFilterOptions(filterOptions)
        handleActionClose()
    }
    const meetingBgColor = isMyTask ? {} : { bgColor: '$white' }
    const taskBgColor = !isMyTask ? {} : { bgColor: '$white' }
    const taskList = isMyTask ? myTaskList : allTaskList;
    return (
        <View bgColor="$white" >
            <TaskFilterSort show={showActionsheet}
                handleFilterOptions={handleFilterOptions}
                taskLanguageDTO={taskLanguageDTO}
                commonLanguageDTO={commonLanguageDTO}
                filterAction={filterAction}
                token={token} />
            <VStack style={styles.tabPageContent} >
                <Text style={styles.pageTitle} >Tasks</Text>
                <Input size="lg" borderRadius="$2xl" >
                    <InputField
                        placeholder={taskLanguageDTO.taskSearchPlaceholder}
                        value={search}
                        onChangeText={value => searchItems(value)}
                    />
                    <InputSlot pr='$3' onPress={() =>{ 
                        Keyboard.dismiss()
                        handleFilterOptions(true)}}>
                        <InputIcon as={SlidersHorizontal} size="lg" />
                    </InputSlot>
                </Input>
                <Center>
                    <HStack pt="$4" pb="$4">
                        <Button ml='auto' size="md" variant="solid" action="primary" {...meetingBgColor} style={styles.tabItemButton} onPress={onMeetingPress}>
                            <ButtonText color={isMyTask ? '$white' : '$black'} style={styles.tabTitleText} >
                                {taskLanguageDTO.myTasks}
                            </ButtonText >
                        </Button>
                        <Button ml='auto' size="md" variant="solid" action="primary" style={styles.tabItemButton} {...taskBgColor} onPress={onTasksPress}>
                            <ButtonText color={!isMyTask ? '$white' : '$black'} style={styles.tabTitleText} >
                                {taskLanguageDTO.tasks}
                            </ButtonText >
                        </Button>
                    </HStack>
                </Center>
                <View>
                    <TaskList showAdd={true} source={"taskListLayout"} resetTaskSetUp={resetTaskSetUpDTO} taskLanguageDTO={taskLanguageDTO} taskListItems={taskList} statusList={taskStatusList} />

                </View>
            </VStack>
        </View>
    )
}
export default TaskListLayout;