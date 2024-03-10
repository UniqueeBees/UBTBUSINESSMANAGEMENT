import React, { useEffect, useState, useRef } from "react";
import {
    Text,
    View,Box

} from "@gluestack-ui/themed"
import FeedAttacher from "./feedAttacher"; 
import { useNavigation } from "@react-navigation/native";

export const objectEnum = {
    createmeeting: "createmeeting",
    recording: "recording",
    contacts: "contacts",
    attachments: "attachments",
    createtasks: 'createtasks',
    travel:'travel',
}
function Feeds() {
    const [actionObject, setActionObject] = useState()
    const navigation = useNavigation();
    function selectAction(objectName) {
        alert(objectName);
        setActionObject(objectName);
    }

    function getActionObject() {
        if (actionObject === objectEnum.recording) {
            navigation.navigate("startRecording");
           // return <AudioRecorder></AudioRecorder>
        } else  if (actionObject === objectEnum.travel) {
            navigation.navigate("startTravel");
           // return <StartTravel></StartTravel>
        }
    }
    return (
        <View style={{height:"100%"}}> 
            <Box h="82%" >
            <Text> Feeds </Text>
            {getActionObject()}
            </Box>
            <Box h="$50"  >
            <FeedAttacher onSelect={selectAction} objEnum={objectEnum} />
            </Box>
           
        </View>
    )

}
export default Feeds;