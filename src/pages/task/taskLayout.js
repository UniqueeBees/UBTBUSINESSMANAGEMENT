
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Box } from '@gluestack-ui/themed';
import TaskList from './taskList';
import CreateTask from './createTask';
import { selectNotCompletedTasks } from '../../slices/taskSlice';
import { useSelector, useDispatch } from 'react-redux';
import { getTaskListByUser, getTaskStatusList } from '../../slices/taskSlice';
import { styles } from '../../assets/styles/theme';
function TaskLayout() {


    const taskStatusList = useSelector((state) => state.task.taskStatusList);
    const token = useSelector((state) => state.login.token)
    const id = useSelector((state) => state.login.id)
    const isTaskListRequestLoading = useSelector((state) => state.task.loading);
    const taskListItems = useSelector(state => selectNotCompletedTasks(state, id));
    const taskLanguageDTO = useSelector((state) => state.language.taskLanguageDTO)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTaskStatusList(token))
        dispatch(getTaskListByUser({ token, id }))
    }, [token])
    return (

        <View  >
            {(isTaskListRequestLoading && taskListItems.length === 0) ? <Box /> : taskListItems.length === 0 ?
                <CreateTask taskLanguageDTO={taskLanguageDTO} /> :
                <TaskList showAdd={false} taskLanguageDTO={taskLanguageDTO} taskListItems={taskListItems} statusList={taskStatusList} />}
        </View>
    )
}
export default TaskLayout;