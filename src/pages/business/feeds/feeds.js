import React, { useEffect, useState, useRef } from "react";
import {
    Text,
    View

} from "@gluestack-ui/themed"
import FeedAttacher from "./feedAttacher";
import AudioRecorder from "./audioRecordercl";
import Travel from "../../travel/travelRecord"
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
    function selectAction(objectName) {
        alert(objectName);
        setActionObject(objectName);
    }

    function getActionObject() {
        if (actionObject === objectEnum.recording) {
            return <AudioRecorder></AudioRecorder>
        } else  if (actionObject === objectEnum.travel) {
            return <Travel></Travel>
        }
    }
    return (
        <View>
            <Text> Feeds </Text>
            {getActionObject()}
            <FeedAttacher onSelect={selectAction} objEnum={objectEnum} />
        </View>
    )

}
export default Feeds;