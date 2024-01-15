
export const taskListItemDTO={
    id:0,
    title:'',
    description:'',
    createdBy:'',
    status:1,
}
export const taskSetupDTO={
    id:0,
    title:'',
    description:'',
    assignTo:0,
    userId:0,
    status:0,
    duedate:'',
}
export const buildTaskListItem=(taskListItem)=>{
    return {
        id:taskListItem.id,
        title:taskListItem.title,
        description:taskListItem.notes,
        createdBy:'',
        status:taskListItem.status,
        assignedTo:taskListItem.assigned_to,
        userId:taskListItem.user_id,
        dueDate:taskListItem.due_date,
    
    };
}
export const buildTaskListItems=(taskList)=>{
    const taskListItemsDTO=taskList.map((item)=>{
        return buildTaskListItem(item);
    });
    return taskListItemsDTO;
}
export const buildTaskStatusList=(statusList)=>{
    const taskStatusList=statusList.map((item)=>{
        return {
            id:item.id,
            name:item.name,
            color:item.color,
        
        };
    });
    return taskStatusList;
}
