export const userDTO={
    id:0,
    username:'',
    profileImage:'',
    fullName:''
}
export const buildUserDTO=(user)=>{
let userProfileDTO={... userDTO}
userProfileDTO.id=user.id;
userProfileDTO.username=user.username;

}