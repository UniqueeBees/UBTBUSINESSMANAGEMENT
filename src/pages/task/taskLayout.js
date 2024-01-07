
import React,{useEffect} from 'react';  
import {Text, View} from 'react-native';
import TaskList from './taskList';
import CreateTask from './createTask';
import { useSelector,useDispatch } from 'react-redux';
import {getTaskListByUser} from '../../slices/taskSlice';

function TaskLayout (){
   
    const taskListItems=useSelector((state)=>state.task.listItems);
    const token = useSelector((state) => state.login.token)
    const dispatch = useDispatch()
    useEffect( ()=>{
        dispatch(getTaskListByUser(token))
    },[token])

   
    return (
     
          <View>
          {taskListItems.length === 0 ? <CreateTask /> :<TaskList taskListItems={taskListItems}/>}    
         </View> 
    )
}
export default TaskLayout;