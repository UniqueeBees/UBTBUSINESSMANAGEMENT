import RNFetchBlob from "rn-fetch-blob";

export const attachmentDTO = {
    id:0,
    business_id: 0,
    identifier: "",
    name: "",
    uri:"",
    file: null,
    fileType:"" ,
    active:true,
    newAttachment:true,
}
export function buildDTO(attachment) {
    const cDTO = { ...attachmentDTO }
    cDTO.id=attachment.id,
    cDTO.business_id = attachment.business_id;
    cDTO.identifier = attachment.identifier;
    cDTO.name = attachment.name;
    cDTO.file = attachment.file; 
    cDTO.fileType=attachment.fileType;
    cDTO.active=true;
    return cDTO;
}