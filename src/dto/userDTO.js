export const userDTO = {
    id: 0,
    username: '',
    type: '',
    profileImage: '',
    fullName: '',
    designation: ''
}
export const userListItemDTO = {
    id: 0,
    name: '',
    designation: '',
    type: '',
    username: '',
    email: '',
    mobile1: '',
    mobile2: '',
}
export const buildUserDTO = (user) => {
    let userProfileDTO = { ...userDTO }
    userProfileDTO.id = user.id;
    userProfileDTO.username = user.username;
    userProfileDTO.profileImage = user.avatar;
    userProfileDTO.fullName = user.name;
    userProfileDTO.designation = user.type;
    return userProfileDTO
}
export const buildUserListItemDTO = (userList) => {
    const userListDTO = userList.map((item) => {
        let userProfileDTO = { ...userListItemDTO }
        userProfileDTO.id = item.id;
        userProfileDTO.name = item.name;
        userProfileDTO.designation = item.designation;
        userProfileDTO.type = item.type;
        userProfileDTO.username = item.username;
        userProfileDTO.email = item.email;
        userProfileDTO.mobile1 = item.mobile;
        userProfileDTO.mobile2 = item.mobile;
        return userProfileDTO
    })
    return userListDTO;

}
export const buildContactListItemDTO = (contactList) => {
    const contactItemListDTO = contactList.map((item) => {
        return buildContactItemDTO(item)
    })
    return contactItemListDTO;

}
export const buildContactItemDTO = (contact) => {
    return {
        id: contact.id,
        businessId:contact.business_id,
        name: contact.name,
        designation: contact.designation,
        email: contact.email,
        mobile1: contact.mobile,
        mobile2: contact.mobile,
    };

}
