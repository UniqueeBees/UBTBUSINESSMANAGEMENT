export const meetingListItemDTO = {
    id: 0,
    title: '',
    description: '',
    createdBy: '',
    meetingStartDate: '',
    meetingStartTime: '',
    meetingPurpose: '',
    scheduledAt: '',
}
export const meetingSetupDTO={
    id:0,
    title:'',
    description:'',
    businessId:1,
    purposeId:0,
    contactId:0,
    scheduledAt:'',
}
export const buildMeetingListItem = (meetingItem) => {
    return {
        id: meetingItem.id,
        title: meetingItem.title,
        description: meetingItem.notes,
        createdBy: '',
        scheduledAt: meetingItem.scheduled_at,
        meetingStartDate: '',
        meetingStartTime: '',
        meetingPurpose: 'purpose',

    };
}
export const buildMeetingListItems = (meetingList) => {
    const meetingListItemsDTO = meetingList.map((item) => {
        return buildMeetingListItem(item)
    });
    return meetingListItemsDTO;
}
export const buildPurposeListItems = (purposeList) => {
    const purposeListDTO = purposeList.map((item) => {
        return {
            id: item.id,
            name: item.name,
            identifier: item.identifier,
            status: item.status,
        };
    })
    return purposeListDTO;
}