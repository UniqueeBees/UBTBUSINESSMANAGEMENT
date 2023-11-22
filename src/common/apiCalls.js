import React from "react";
import axios from "axios";
const baseUrl = 'https://api.taswiq.app';

export const getToken = (_domain, _username, _password) => {
    const formData = new FormData(); 
    formData.append('domain', _domain);
    formData.append('username', _username);
    formData.append('password', _password);
    axios({
        method: "POST",
        formData: formData,
        url: `${baseUrl}/token`
    }).then(res => {
        console.log(res.data)
        return res.data;
    })
    .catch(error => {return error;})

}


//Test Call
const baseUrl1 = "https://jsonplaceholder.typicode.com"
export const getApi = () => {
    axios({
        method: "GET",
        url: `${baseUrl1}/posts`
    }).then(res => console.log(res)).catch(error => console.log(error))
}

