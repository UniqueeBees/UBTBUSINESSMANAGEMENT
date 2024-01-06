import React from "react";
import { useToast, Toast } from "@gluestack-ui/themed"
const Alert = () => {

    return (

        <Toast>
            <ToastTitle />
            <ToastDescription />
        </Toast>
    )
}
export default Alert;