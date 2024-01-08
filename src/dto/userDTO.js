export const userDTO={
    id:0,
    username:'',
    profileImage:'',
    fullName:'',
    designation:''
}
export const buildUserDTO=(user)=>{
let userProfileDTO={... userDTO}
userProfileDTO.id=user.id;
userProfileDTO.username=user.username;
userProfileDTO.profileImage=user.avatar;
userProfileDTO.fullName=user.name;
userProfileDTO.designation=user.type;
return userProfileDTO
}