export const travelDTO = {
    purpose:"",
    vehicle:"",
    meterReading:"",
    title:"",
    description:"" ,
    photo:"",
} 
export const vehicleDTO ={
    id:0,
    type:"",
    name:"",
    number:"",
}

export const buildPurposeListItems = (purposeList) => {
    const purposeListDTO = purposeList.map((item) => {
        return {
            id: item.id,
            name: item.name,
            identifier: item.identifier,
            status: item.status,
        };
    })
    return purposeListDTO;
}
export const buildVehicleListItems=(vehicleList)=>{
    const vehicleListDTO=vehicleList.map((item)=>{
        return {
            id:item.id,
            type:item.type,
            name:item.name,
            number:item.number,
        }
    })
    return vehicleListDTO;
}