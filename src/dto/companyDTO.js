export const  companyDTO = {
    id:-1,
    name: "",
    domain: "",
    logo: "",
    theme_primary_color: null,
    theme_secondary_color: null,
    status: 0,
    expiry: "",
    email: "",
    phone: "",
    mobile: "",
    address: "",
    city: "",
    country: "",
    postal: "",
    zip:""
}

export  function  buildDTO (company){ 
     const cDTO={...companyDTO}
     cDTO.id=company.id;
     cDTO.name=company.name;
     cDTO.domain=company.domain;
     
     return cDTO;
    
}