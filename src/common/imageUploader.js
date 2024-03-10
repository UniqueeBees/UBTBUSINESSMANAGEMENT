import React, { useEffect } from "react"

import {
  VStack,
  FormControl,
  Input,
  InputField,
  Center,
  Button,
  ButtonText,
  ButtonIcon,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Heading,
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
  SelectIcon,
  SelectContent,
  Icon,
  ChevronDownIcon,
  HStack,
  ArrowLeftIcon,
  ScrollView,
  Text, Box, Image,
  FlatList

} from "@gluestack-ui/themed"
import { ArrowRight } from 'lucide-react-native';

import { attachmentDTO } from "../dto/attachmentDTO"
import { styles } from '../assets/styles/theme'  
import {handleChoosePhoto,requestCameraPermission} from '../common/utility'
import { ArrowBigRightDash, CheckCircle2, Camera, XCircle, FolderUp } from 'lucide-react-native';
const ImageUploader =(props)=>{
const [uploadImages, setUplodimages] = React.useState([]);
const uploadImgRender = (img) => {
    return (
      <Box style={{marginLeft:"5%"}}>
        <Icon fill="#E5E7E9" onPress={()=>removeImage(img.item.id)} style={{ alignSelf: "flex-end", position: "relative",top:12,marginRight:-12,zIndex:3000 }} as={XCircle} size="xl"></Icon>
        <Image borderRadius="$md" size="xl" source={{ uri: img.item.file }}></Image>
      </Box>
    )
  }
  const getMaxIdForImages=()=>{
    var maxId =0
    var arrObjIds = uploadImages.map(elements => {
      return elements.id;
      });
      if(arrObjIds.length>0){
       maxId = Math.max(...arrObjIds)+1;;
      }
      return maxId ;
   }
  const handleUploadPhoto =async (camera)=>{ 
    
    const uri=await handleChoosePhoto(camera);
    console.log("after call",uri)
    if (uri) { 
        let atchDTO = { ...attachmentDTO };
        if(props.multiple){ 
        atchDTO.id =getMaxIdForImages()
        atchDTO.business_id = -1;
        atchDTO.identifier = "landmark";
        atchDTO.file = uri; 
        var upImgs = [...uploadImages, atchDTO];
        setUplodimages(upImgs)
        }else{
            atchDTO.id =0;
            atchDTO.business_id = -1;
            atchDTO.identifier = "landmark";
            atchDTO.file = uri; 
            var upImgs = [atchDTO];
            setUplodimages(upImgs)
        } 
      props.setBackData(uploadImages);
    } else {
      console.log('no Uri invalid1');
    }

 }
 const removeImage=(id)=>{ 
    var uImages=uploadImages.filter(img=>img.id!==id)
    setUplodimages(uImages);
    props.setBackData(uploadImages);
  }

 return(
  <Box style={styles.boxWithRadius}>
           
  <FlatList
        data={uploadImages}
        numColumns={2}
        renderItem={uploadImgRender}
        keyExtractor={(item) => item.id}
        scrollEnabled={true} 
        maxHeight={"$96"}
      /> 
  
  <Center>
    <HStack>
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}

        style={[styles.shortButtonRounded, { width: 60, marginTop: 20, marginBottom: 20 }]}
        onPress={() => handleUploadPhoto(true)}

      >
        <ButtonIcon size={20} as={Camera} />
      </Button>
      <Button
        size="md"
        variant="solid"
        action="primary"
        isDisabled={false}
        isFocusVisible={false}
        style={[styles.longButtonRounded, { width: 200, marginTop: 20, marginBottom: 20, marginLeft: 30 }]}
        onPress={() => handleUploadPhoto(false)}              >
        <ButtonIcon mr={10} size={20} as={FolderUp} />
        <ButtonText style={styles.buttonText}>Upload Photo</ButtonText>

      </Button>
    </HStack>

  </Center>
</Box>)
}
export default ImageUploader;