export const meetingListItemDTO={
    id:0,
    title:'',
    description:'',
    createdBy:'',
    meetingStartDate:'',
    meetingStartTime:'',
    meetingPurpose:'',
    scheduledAt:'',
}
export const buildMeetingListItems=(meetingList)=>{
    const meetingListItemsDTO=meetingList.map((item)=>{
        return {
            id:item.id,
            title:item.title,
            description:item.notes,
            createdBy:'',
            scheduledAt:item.scheduled_at,
            meetingStartDate:'',
            meetingStartTime:'',
            meetingPurpose:'purpose',
        
        };
    });
    return meetingListItemsDTO;
}