export const meetingListItemDTO={
    id:0,
    title:'',
    description:'',
    createdBy:'',
    meetingStartDate:'',
    meetingStartTime:'',
    meetingPurpose:'',

}
export const buildMeetingListItems=(meetingList)=>{
    const meetingListItemsDTO=meetingList.map((item)=>{
        return {
            id:item.id,
            title:item.title,
            description:item.description,
            createdBy:'',
            meetingStartDate:'',
            meetingStartTime:'',
            meetingPurpose:'',
        
        };
    });
    return meetingListItemsDTO;
}