import axios from "axios";
const baseUrl = 'https://api.taswiq.app';//'localapi.taswiqapp.com';
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
    console.log("getMeetingsByUser",token)
   
   return await axios({
        method: "GET",
        data: formData,
        url: `${baseUrl}/user/meeting`,
        headers: { "Content-Type": "multipart/form-data","APITOKEN":token },
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

