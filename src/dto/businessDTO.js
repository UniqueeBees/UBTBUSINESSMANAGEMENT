export const businessDTO={
    type:0,
    name:"",
    email:"",
    phone:0,
    website:"",
    tags:"",
    landmark:"",
    area:"",
    street:"",
    city:"",
    country:"",
    location:"",
}

 export function  buildDTO (business){ 
    const cDTO={...businessDTO}
    cDTO.type=business.type;
    cDTO.name=business.name;
    cDTO.email=business.email;
    cDTO.phone=business.phone; 
    return cDTO; 
}
export const buildBusinessListItems=(businessList)=>{
    const businessDTO=businessList.map((item)=>{
        return buildDTO(item)
    });
    return businessDTO;
}

export const buildBusinessTypes=(businessType)=>{
    const Type=[];

    for (const key in businessType) {
        if (businessType.hasOwnProperty(key)) { 
          Type.push({key: key ,value:businessType[key]})
        }
      }
     return Type;
}
