import axios from "axios";
export const baseUrl = 'https://api.taswiq.app';//'localapi.taswiqapp.com';

export const apiCallStatus={
    pending:'pending',
    fullfilled:'fullfilled',
    rejected:'rejected'

}
export  const  accountLoginAPI = async (login) => {
    console.log("get Token",login)
    const formData = new FormData();
    formData.append('domain', login.domain);
    formData.append('username', login.username);
    formData.append('password', login.password);
   return await axios({
        method: "POST",
        data: formData,
        url: `${baseUrl}/token`,
        headers: { "Content-Type": "multipart/form-data" },
    })

}
export const getToken = (_domain, _username, _password) => {
    console.log("get Token")
    const formData = new FormData();
    formData.append('domain', _domain);
    formData.append('username', _username);
    formData.append('password', _password);
    axios({
        method: "POST",
        data: formData,
        url: `${baseUrl}/token`,
        headers: { "Content-Type": "multipart/form-data" },
    }).then(res => {
        console.log(res.data)
        return res.data;
    })
        .catch(error => {
            console.log("get Token error :", error)
            return error;
        })

}
export const getCompanyAPI = async(_domain) => {
    console.log("get company api" ,_domain)
    const formData = new FormData();
    formData.append('domain', _domain);
   return  await axios({
        method: "POST",
        data: formData,
        url: `${baseUrl}/company`,
        headers: { "Content-Type": "multipart/form-data" },
    })
    
    /*.then(res => {
      console.log("response API Call",res.data)
        return res.data;
    })
        .catch(error => {
            console.log("get company error :", error)
            return error;
        })
*/
}

export const getLanguage = () => {
    console.log("get language")
    
    return axios({
        method: "GET",
        url: `${baseUrl}/account/languages`,
        
    }).then(res => {
       // console.log(res.data)
        return res.data;
    })
        .catch(error => {
            console.log("get language error :", error)
            return error;
        })

}
export const getLanguageLabel = (code) => {
    
    console.log("get language")
    return axios({
        method: "GET",
        url: `${baseUrl}/account/translation?language=${code}`,
        
    }).then(res => {
       // console.log(res.data)
        return res.data;
    })
        .catch(error => {
            console.log("get language error :", error)
            return error;
        })

}
export  const  getMeetingsByUser = async (token) => {
   return await axios({
        method: "GET",
        url: `${baseUrl}/user/meeting`,
        headers: { "APITOKEN":token },
    })

}
export const getMeetingPurposeList=async(token)=>{
    return await axios({
        method: "GET",
        url: `${baseUrl}/purposes`,
        headers: { "APITOKEN":token },
    })
}
export const getMeetingById=async(token,id)=>{
    return await axios({
        method: "GET",
        url: `${baseUrl}/purposes`,
        headers: { "APITOKEN":token },
    })
}
export  const  getTasksByUser = async (token,id) => {
    
   return await axios({
        method: "GET",
        url: `${baseUrl}/tasks?user_id=${id}&assigned_to=${id}`,
        headers: { "APITOKEN":token },
    })

}
export  const  getTaskStatusListAPI = async (token) => {
    return await axios({
         method: "GET",
         url: `${baseUrl}/tasks/status`,
         headers: { "APITOKEN":token },
     })
 
 }
 export  const  getTaskById = async (token,id) => {
    return await axios({
         method: "GET",
         url: `${baseUrl}/task/${id}`,
         headers: { "APITOKEN":token },
     })
 
 }
export  const  getUser = async (token) => {
   return await axios({
        method: "POST",
        url: `${baseUrl}/user`,
        headers: { "APITOKEN":token },
    })

}
export  const  getUsers = async (token) => {
    return await axios({
         method: "POST",
         url: `${baseUrl}/users`,
         headers: { "APITOKEN":token },
     })
 
 }

 export const getContacts=async(token)=>{
    return await axios({
        method: "GET",
        url: `${baseUrl}/contacts`,
        headers: { "APITOKEN":token },
    })
 }

export const getBusinessList=async (token)=>{
    return await axios({
        method: "GET",
        url: `${baseUrl}/business`,
        headers: { "APITOKEN":token },
    })

}
 export const createBusiness=async(_token,_business)=>{
    return await axios({
        method: "POST",
        data: _business,
        url: `${baseUrl}/business`,
        headers: { "APITOKEN":token },
    })
 }
 export const getBusinessTypes=async (token)=>{
    return await axios({
        method: "GET",
        url: `${baseUrl}/business/types`,
        headers: { "APITOKEN":token },
    })

}

export const addTask=async(token,task)=>{
    return await axios({
        method: "POST",
        data: task,
        url: `${baseUrl}/tasks`,
        headers: {"Content-Type": "multipart/form-data", "APITOKEN":token },
    })
 }
 export const updateTask=async(token,task,id)=>{
    task.append('_method', 'PATCH');
    return await axios({
        method: "POST",
        data: task,
        url: `${baseUrl}/tasks/${id}`,
        headers: {"Content-Type": "multipart/form-data", "APITOKEN":token },
    })
 }
 export const addMeeting=async(token,meeting)=>{
    console.log('addMeetingAPI',meeting)
    return await axios({
        method: "POST",
        data: meeting,
        url: `${baseUrl}/meeting`,
        headers: {"Content-Type": "multipart/form-data", "APITOKEN":token },
    })
 }
 export const updateMeeting=async(token,meeting,id)=>{
    console.log('updateMeetingAPI',meeting)
    meeting.append('_method', 'PATCH');
    return await axios({
        method: "POST",
        data: meeting,
        url: `${baseUrl}/meeting/${id}`,
        headers: {"Content-Type": "multipart/form-data", "APITOKEN":token },
    })
 }
//Test Call
const baseUrl1 = "https://jsonplaceholder.typicode.com"
export const getApi = () => {
    axios({
        method: "GET",
        url: `${baseUrl1}/posts`
    }).then(res => console.log(res)).catch(error => console.log(error))
}

export const saveContact = (contactData,token) => {
    const formData = new FormData();
    if(contactData.businessId){
        formData.append('business_id', contactData.businessId);
    }
    
    formData.append('name', contactData.Name);
    formData.append('designation', contactData.Designation);
    formData.append('email', contactData.Email);
    formData.append('mobile', contactData.MobileNo);
   return  axios({
        method: "POST",
        data: formData,
        url: `${baseUrl}/contacts`,
        headers: { "Content-Type": "multipart/form-data","APITOKEN":token },
    })
}



