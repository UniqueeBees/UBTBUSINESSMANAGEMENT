import React from "react";
import axios from "axios"; 
const baseUrl='https://api.taswiq.app';

export const  getToken=(domain)=>{ 
    const formData=new FormData();
    domain='credozone'
    formData.append('domain',domain);
   // formData.append('username','fasil');
    //formData.append('password','abcd1234');
    axios({
        method:"POST",
        formData:formData,
        url:`${baseUrl}/company`
    }).then(res=>console.log(res)).catch(error=>console.log(error))
   
    
}

//Test Call
const baseUrl1="https://jsonplaceholder.typicode.com"
export const getApi=()=>{
    axios({
        method:"GET",
        url:`${baseUrl1}/posts`
    }).then(res=>console.log(res)).catch(error=>console.log(error))
}

 