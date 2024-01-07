export const taskListItemDTO={
    id:0,
    title:'',
    description:'',
    createdBy:'',
}
export const buildTaskListItems=(taskList)=>{
    const taskListItemsDTO=taskList.map((item)=>{
        return {
            id:item.id,
            title:item.title,
            description:item.notes,
            createdBy:'',
        
        };
    });
    return taskListItemsDTO;
}