import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
    FormControl, FormControlLabel, FormControlLabelText, FormControlError, FormControlErrorText,
    Input, InputField, InputSlot, InputIcon
} from '@gluestack-ui/themed';
import { resetBusinessName } from '../../slices/businessSlice';
import { ChevronRight } from 'lucide-react-native';
import { styles } from '../../assets/styles/theme';
function BusinessSelect(props) {
    const navigation = useNavigation();
    const businessSelectLanguageDTO = useSelector((state) => state.language.businessSelectLanguageDTO)
    const selectedBusinessItem = useSelector((state) => state.business.businessSelectedFromForm)
    const controlSettings = props.controlSettings;
    const[businessName,setBusinessName]=useState(props.businessName);
    const dispatch=useDispatch();
    useEffect(() => {
        if (selectedBusinessItem.id) {
            setBusinessName(selectedBusinessItem.name)
            props.setDatasource(controlSettings.fieldName,selectedBusinessItem)
            dispatch(resetBusinessName());
        }
    }, [selectedBusinessItem])
   
    return (
        <FormControl isRequired={controlSettings.isRequired} isInvalid={controlSettings.isInvalid}>
            <FormControlLabel mb="$1">
                <FormControlLabelText style={styles.fieldLabel}>{businessSelectLanguageDTO.label}</FormControlLabelText>
            </FormControlLabel>
            <Input variant="underlined" size="md"    >
                <InputField placeholder={businessSelectLanguageDTO.placeholder} value={businessName}
                    editable={false}>
                </InputField>
                <InputSlot pr='$3' onPress={() => navigation.navigate('businessSelectList')}>
                    <InputIcon as={ChevronRight} size="lg" />
                </InputSlot>
            </Input>
            <FormControlError>
                <FormControlErrorText>
                    {businessSelectLanguageDTO.requiredValidationMessage}
                </FormControlErrorText>
            </FormControlError>
        </FormControl>
    )
}
export default BusinessSelect;