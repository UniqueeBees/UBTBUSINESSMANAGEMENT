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
export  const  getTasksByUser = async (token) => {
   return await axios({
        method: "GET",
        url: `${baseUrl}/tasks`,
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
//Test Call
const baseUrl1 = "https://jsonplaceholder.typicode.com"
export const getApi = () => {
    axios({
        method: "GET",
        url: `${baseUrl1}/posts`
    }).then(res => console.log(res)).catch(error => console.log(error))
}

