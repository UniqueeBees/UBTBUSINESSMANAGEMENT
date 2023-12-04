import React from "react";
import axios from "axios";
const baseUrl = 'https://api.taswiq.app';//'localapi.taswiqapp.com';

export const getToken = (_domain, _username, _password) => {
    console.log("get Token")
    const formData = new FormData(); 
  formData.append('domain', _domain);
    formData.append('username', _username);
    formData.append('password', _password);
    /* formData.append('domain', "credozone");
    formData.append('username', "fasil");
    formData.append('password', "abcd1234"); */
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
        console.log("get Token error :",error)
        return error;
    })

}
export const getCompany = (_domain) => {
    console.log("get company")
    const formData = new FormData(); 
  formData.append('domain', _domain);
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
        console.log("get company error :",error)
        return error;
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

