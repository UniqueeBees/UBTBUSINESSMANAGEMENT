
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Button, ButtonText, Center, HStack, VStack, Heading } from '@gluestack-ui/themed';
import TaskList from './taskList';
import { styles } from '../../assets/styles/theme';
import { useSelector, useDispatch } from 'react-redux';
import { setPage } from '../../slices/initialPageSlice';
import { navigationRoutes } from '../../common/navigation';
import { selectMyTasks, getTaskStatusList, getTaskListByUser } from '../../slices/taskSlice';

function TaskListLayout(props) {
    const [isMyTask, setIsMyTask] = useState(true);
    const hasUser = useSelector((state) => state.user.hasUser)
    const taskLanguageDTO = useSelector((state) => state.language.taskLanguageDTO)

    const taskStatusList = useSelector((state) => state.task.taskStatusList);
    const token = useSelector((state) => state.login.token)
    const id = useSelector((state) => state.login.id)
    const myTaskListItems = useSelector(state => selectMyTasks(state, id));
    const taskListItems = useSelector(state => state.task.listItems);
    useEffect(() => {
        dispatch(getTaskStatusList(token))
        dispatch(getTaskListByUser({ token, id }))
    }, [token])

    const dispatch = useDispatch();
    const onMeetingPress = () => {
        setIsMyTask(true);
    }
    const onTasksPress = () => {
        setIsMyTask(false);
    }
    useEffect(() => {
        if (!hasUser) {
            dispatch(setPage(navigationRoutes.login))
        }
    })
    const meetingBgColor = isMyTask ? {} : { bgColor: '$white' }
    const taskBgColor = !isMyTask ? {} : { bgColor: '$white' }
    return (
        <View   bgColor="$white" >
            <VStack  >
                <Text style={styles.pageTitle} >Tasks</Text>

                <Center>
                    <HStack pt="$4" pb="$4">
                        <Button ml='auto' size="md" variant="solid" action="primary" {...meetingBgColor}  style={styles.tabItemButton} onPress={onMeetingPress}>
                            <ButtonText color={isMyTask ? '$white' : '$black'}  style={styles.tabTitleText} >
                                {taskLanguageDTO.myTasks}
                            </ButtonText >
                        </Button>
                        <Button ml='auto' size="md" variant="solid" action="primary"  style={styles.tabItemButton} {...taskBgColor} onPress={onTasksPress}>
                            <ButtonText color={!isMyTask ? '$white' : '$black'}  style={styles.tabTitleText} >
                                {taskLanguageDTO.tasks}
                            </ButtonText >
                        </Button>
                    </HStack>
                </Center>
                {isMyTask ? <TaskList taskLanguageDTO={taskLanguageDTO} taskListItems={myTaskListItems} statusList={taskStatusList} />
                    : <TaskList taskLanguageDTO={taskLanguageDTO} taskListItems={taskListItems} statusList={taskStatusList} />}
            </VStack>
        </View>
    )
}
export default TaskListLayout;