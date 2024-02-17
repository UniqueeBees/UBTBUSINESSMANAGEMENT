export const attachmentDTO = {
    id:0,
    business_id: 0,
    identifier: "",
    name: "",
    file: "", 
}

export function buildDTO(attachment) {
    const cDTO = { ...attachmentDTO }
    cDTO.id=attachment.id,
    cDTO.business_id = attchment.business_id;
    cDTO.identifier = attchment.identifier;
    cDTO.name = attchment.name;
    cDTO.file = attchment.file; 
    return cDTO;
}