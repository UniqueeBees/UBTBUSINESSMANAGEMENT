import React, { useState, useEffect } from 'react';
import { Box, Input, InputField, View, FormControl, FormControlLabel, FormControlLabelText } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { styles } from '../assets/styles/theme';
import moment from 'moment';

export const DateDisplayFormat = {
    shortDate: "l",
    meetingFormat:'MMM DD, hh:mm a',
}
export const getCurrentDateFormated=(dataSourceFormat)=>{
   return moment().format(dataSourceFormat);
}
function DateTimePicker(props) {
    const [isVisible, setVisible] = useState(false);
    const propsDate = props.value ? props.value : '';
    const [date, setDate] = useState(propsDate);
    const displayFormat = props.displayFormat ? props.displayFormat : DateDisplayFormat.shortDate;
    const placeHolder=props.placeholder ? props.placeholder :'Select date'
    useEffect(() => {
        const formatedDate = date ? moment(date).format(props.dataSourceFormat).toString() : '';
        if (propsDate !== formatedDate) {
            props.setValue(formatedDate, props.fieldName);
        }
    }, [date])
    return (
        <View>
            <FormControl >
                <FormControlLabel mb="$1">
                    <FormControlLabelText style={styles.fieldLabel}>{props.label}</FormControlLabelText>
                </FormControlLabel>

            </FormControl>
            <TouchableOpacity
                activeOpaticy={1}
                onPress={() => setVisible(true)}>
                <Input
                    variant={props.variant ? props.variant : 'underlined'}
                    size="md"
                    placeholder={placeHolder} 
                >
                    <InputField 
                    placeholder={placeHolder} 
                    value={propsDate ? moment(propsDate).format(displayFormat) : ''}
                        editable={false}
                    >
                    </InputField>
                </Input>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isVisible}
                date={propsDate ? new Date(propsDate) : new Date()}
                mode={props.mode ? props.mode : 'date'}
                onConfirm={(date) => {
                    setVisible(false); // <- first thing
                    setDate(date);
                }}
                onCancel={() => setVisible(false)}

            />
        </View>
    );
}
export default DateTimePicker;
