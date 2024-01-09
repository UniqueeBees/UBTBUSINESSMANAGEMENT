export const taskListItemDTO={
    id:0,
    title:'',
    description:'',
    createdBy:'',
    status:1,
}
export const buildTaskListItems=(taskList)=>{
    const taskListItemsDTO=taskList.map((item)=>{
        return {
            id:item.id,
            title:item.title,
            description:item.notes,
            createdBy:'',
            status:item.status,
            assignedTo:item.assigned_to,
            userId:item.user_id,
            dueDate:item.due_date,
        
        };
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