
import React,{useEffect, useState} from 'react';  
import {Text, View} from 'react-native';
import { Button,ButtonText,Center,HStack,VStack,Heading } from '@gluestack-ui/themed';
import TaskList from './taskList';
import { styles } from '../../assets/styles/theme';
import { useSelector,useDispatch } from 'react-redux';
import { setPage } from '../../slices/initialPageSlice';
import { navigationRoutes } from '../../common/navigation';
import { selectMyTasks,getTaskStatusList ,getTaskListByUser} from '../../slices/taskSlice';

function TaskListLayout (props){
    const [isMyTask,setIsMyTask]=useState(true);
    const hasUser = useSelector((state) => state.user.hasUser)
    const taskLanguageDTO=useSelector((state)=>state.language.taskLanguageDTO)

    const taskStatusList=useSelector((state)=>state.task.taskStatusList);
    const token = useSelector((state) => state.login.token)
    const id = useSelector((state) => state.login.id)
    const myTaskListItems=useSelector(state => selectMyTasks(state, id));
    const taskListItems=useSelector(state => state.task.listItems);
    useEffect( ()=>{
        dispatch(getTaskStatusList(token))
        dispatch(getTaskListByUser({token,id}))
    },[token])

    const dispatch=useDispatch();
    const onMeetingPress=()=>{
        setIsMyTask(true);
    }
    const onTasksPress=()=>{
        setIsMyTask(false);
    }
   useEffect(()=>{
    if(!hasUser){
        dispatch(setPage(navigationRoutes.login))
    }
   })
    const meetingBgColor=isMyTask ? {}:{bgColor:'$whitesmoke'}
    const taskBgColor=!isMyTask ? {}:{bgColor:'$whitesmoke'}
    return (
     <View  style={styles.fieldSetContainer}>
        <VStack>
        <Heading style={styles.pageTitle} >{'Tasks'}</Heading>
          
            <Center>
            <HStack pt="$4" pb="$4">
                <Button ml='auto' size="md" variant="solid" action="primary" {...meetingBgColor} style={styles.buttonGeneral} onPress={onMeetingPress}>
                    <ButtonText color={isMyTask?'$white':'$black'}  >
                        {taskLanguageDTO.MyTasks}
                    </ButtonText >
                </Button>
                <Button ml='auto' size="md" variant="solid" action="primary" style={styles.buttonGeneral} {...taskBgColor} onPress={onTasksPress}>
                    <ButtonText color={!isMyTask?'$white':'$black'}  >
                        {taskLanguageDTO.Tasks}
                    </ButtonText >
            </Button>
            </HStack>
            </Center>
                {isMyTask ?<TaskList  taskLanguageDTO={taskLanguageDTO} taskListItems={myTaskListItems} statusList={taskStatusList}/> 
                : <TaskList taskLanguageDTO={taskLanguageDTO} taskListItems={taskListItems} statusList={taskStatusList}/>} 
            </VStack>
     </View>
    )
}
export default TaskListLayout;